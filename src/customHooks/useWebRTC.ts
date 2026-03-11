import { useEffect, useState, useRef } from 'react';
import socket from '../socket/socket';
import type { ConnectionStatus, TransferProgress } from '../utils/types';

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
}

export function useWebRTC() {
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [roomId, setRoomId] = useState<string>('');
  const [progress, setProgress] = useState<TransferProgress | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const iceCandidateQueue = useRef<RTCIceCandidateInit[]>([])
  const isInitiator = useRef<boolean>(false)
  const incomingMetadata = useRef<{ name: string; size: number; type: string } | null>(null)
  const incomingChunks = useRef<ArrayBuffer[]>([])

  function generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8)
  }

  function createRoom() {
    const id = generateRoomId();
    console.log('room id ------------', id);
    isInitiator.current = true;
    if (!socket.connected) socket.connect();
    socket.emit('join-room', id);
    setRoomId(id);
    setStatus('waiting');
  }

  function joinRoom(id: string) {
    if (!id.trim()) return;
    isInitiator.current = false;
    if (!socket.connected) socket.connect();
    socket.emit('join-room', id);
    setStatus('waiting');
  }

  useEffect(() => {

    // ── All WebRTC functions live INSIDE useEffect ──
    // This means they always have fresh access to refs
    // and never go stale like regular component functions do

    function setupDataChannel(dc: RTCDataChannel) {
      dc.binaryType = 'arraybuffer'

      dc.onopen = () => {
        console.log('data channel open — tunnel is live!')
        setStatus('connected')
      }

      dc.onclose = () => {
        console.log('data channel closed')
        setStatus('disconnected')
      }

      dc.onerror = (err) => {
        console.error('data channel error', err)
      }

      dc.onmessage = (event) => {
        if (typeof event.data === 'string') {
            // metadata arrives as string
            incomingMetadata.current = JSON.parse(event.data)
            incomingChunks.current = []
            console.log('parsed metadata:', incomingMetadata.current)
        } else if (event.data instanceof ArrayBuffer) {
            // chunks arrive as ArrayBuffer
            incomingChunks.current.push(event.data)
            
            const received = incomingChunks.current.reduce((acc, chunk) => acc + chunk.byteLength, 0)
            console.log(`received ${received} / ${incomingMetadata.current?.size}`)
            
            const meta = incomingMetadata.current
            if (meta !== null && received >= meta.size) {
                // ciombine all chunk into one blob
                const blob = new Blob(incomingChunks.current, {type: meta.type});

                // create a download urm
                const url = URL.createObjectURL(blob);

                // trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = meta.name;
                a.click()

                // clean up
                URL.revokeObjectURL(url);
                incomingChunks.current = [];
                incomingMetadata.current = null;
            }
        }
      }
    }

    function createPeerConnection(): RTCPeerConnection {
      if (pcRef.current) {
        pcRef.current.close()
        pcRef.current = null
      }

      const pc = new RTCPeerConnection(RTC_CONFIG)
      pcRef.current = pc

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('sending ice candidate')
          socket.emit('ice-candidate', event.candidate.toJSON())
        }
      }

      pc.onconnectionstatechange = () => {
        console.log('connection state:', pc.connectionState)
        if (pc.connectionState === 'connected') {
          setStatus('connected')
        } else if (
          pc.connectionState === 'failed' ||
          pc.connectionState === 'disconnected' ||
          pc.connectionState === 'closed'
        ) {
          setStatus('disconnected')
        }
      }

      pc.ondatachannel = (event) => {
        console.log('received data channel')
        const dc = event.channel
        dcRef.current = dc
        setupDataChannel(dc)
      }

      return pc
    }

    async function initPeerConnection() {
      console.log('initPeerConnection called')
      const pc = createPeerConnection()

      const dc = pc.createDataChannel('throw-files')
      dcRef.current = dc
      setupDataChannel(dc)

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      console.log('sending offer')
      socket.emit('offer', offer)
    }

    async function handleOffer(sdp: RTCSessionDescriptionInit) {
      console.log('handleOffer called')
      const pc = createPeerConnection()

      await pc.setRemoteDescription(new RTCSessionDescription(sdp))

      for (const candidate of iceCandidateQueue.current) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate))
      }
      iceCandidateQueue.current = []

      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      console.log('sending answer')
      socket.emit('answer', answer)
    }

    async function handleAnswer(sdp: RTCSessionDescriptionInit) {
      console.log('handleAnswer called')
      const pc = pcRef.current
      if (!pc) {
        console.warn('handleAnswer — no peer connection found')
        return
      }

      await pc.setRemoteDescription(new RTCSessionDescription(sdp))

      for (const candidate of iceCandidateQueue.current) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate))
      }
      iceCandidateQueue.current = []
    }

    async function handleIceCandidate(candidate: RTCIceCandidateInit) {
      const pc = pcRef.current

      if (!pc || !pc.remoteDescription) {
        console.log('queueing ice candidate')
        iceCandidateQueue.current.push(candidate)
        return
      }

      console.log('adding ice candidate')
      await pc.addIceCandidate(new RTCIceCandidate(candidate))
    }

    // ── Socket event listeners ──

    socket.on('room-created', () => {
      console.log('room created, waiting for peer...')
      setStatus('waiting')
    })

    socket.on('room-joined', () => {
      console.log('joined room, waiting for offer...')
      setStatus('waiting')
    })

    socket.on('room-full', () => {
      console.log('room is full')
      setStatus('failed')
    })

    socket.on('peer-joined', () => {
      console.log('peer joined — starting handshake as initiator')
      setStatus('connecting')
      initPeerConnection()
    })

    socket.on('offer', async (sdp: RTCSessionDescriptionInit) => {
      console.log('received offer — responding as joiner')
      setStatus('connecting')
      await handleOffer(sdp)
    })

    socket.on('answer', async (sdp: RTCSessionDescriptionInit) => {
      console.log('received answer')
      await handleAnswer(sdp)
    })

    socket.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      await handleIceCandidate(candidate)
    })

    socket.on('peer-disconnected', () => {
      console.log('peer disconnected')
      setStatus('disconnected')
      pcRef.current?.close()
    })

    return () => {
      socket.off('room-created')
      socket.off('room-joined')
      socket.off('room-full')
      socket.off('peer-joined')
      socket.off('offer')
      socket.off('answer')
      socket.off('ice-candidate')
      socket.off('peer-disconnected')
    }
  }, [])

  async function sendFile(_file: File) {
    const dc = dcRef.current;
    if (dc?.readyState !== "open") {
        console.log('error -------- dc not found');
        return;
    }

    const CHUNK_SIZE = 16 * 1024;   // 16KB — safe for WebRTC
    const MAX_BUFFER = 256 * 1024;  // pause sending if buffered > 256KB

    // Send metadata first
    dc.send(JSON.stringify({ name: _file.name, size: _file.size, type: _file.type }));

    const reader = (_file.stream() as ReadableStream<Uint8Array>).getReader();
    let transferred = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Slice stream chunk into 16KB WebRTC-safe pieces
        let offset = 0;
        while (offset < value.byteLength) {

            // Wait if buffer is too full
            if (dc.bufferedAmount > MAX_BUFFER) {
                await new Promise<void>(resolve => {
                    dc.bufferedAmountLowThreshold = 64 * 1024;
                    dc.onbufferedamountlow = () => resolve();
                });
            }

            const slice = value.buffer.slice(
                value.byteOffset + offset,
                value.byteOffset + offset + CHUNK_SIZE
            ) as ArrayBuffer;

            dc.send(slice);

            const sentBytes = Math.min(CHUNK_SIZE, value.byteLength - offset);
            transferred += sentBytes;
            offset += CHUNK_SIZE;

            setProgress({
                filename: _file.name,
                size: _file.size,
                transferred,
                percent: Math.round((transferred / _file.size) * 100),
                speed: 0,
                eta: 0,
            });
        }
    }

    console.log('file send complete:', _file.name);
}

  return {
    status,
    roomId,
    progress,
    createRoom,
    joinRoom,
    sendFile,
  }
}