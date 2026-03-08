import { useEffect, useState, useRef } from 'react';
import socket from '../socket/socket';
import type { ConnectionStatus, FileMetadata, TransferProgress } from '../utils/types';

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
}

const CHUNK_SIZE = 16 * 1024 // 16KB


export function useWebRTC() {
    const [status, setStatus] = useState<ConnectionStatus>('idle');
    const [roomId, setRoomId] = useState<string>('');
    const [progress, setProgress] = useState<TransferProgress | null>(null);

    const pcRef = useRef<RTCPeerConnection | null>(null)
    const dcRef = useRef<RTCDataChannel | null>(null)
    const iceCandidateQueue = useRef<RTCIceCandidateInit[]>([])
    const isInitiator = useRef<boolean>(false)


    function generateRoomId(): string {
        return Math.random().toString(36).substring(2, 8)
    }

    function createRoom() {
        const id = generateRoomId();
        console.log('room id ------------', id);
        isInitiator.current = true;

        if(!socket.connected) socket.connect();

        socket.emit('join-room', id);
        setRoomId(id);
        setStatus('waiting');
    };

    function joinRoom(id: string) {
        if(!id.trim()) return;
        isInitiator.current = false;

        if(!socket.connected) socket.connect();

        socket.emit('join-room', id);
        setRoomId(id);
        setStatus("waiting");

    }

    useEffect(() => {
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
        // The other person just walked in
        // We are the initiator — we start the handshake
        console.log('peer joined, starting handshake...')
        setStatus('connecting')
        // Task 9 — initPeerConnection() goes here
        })

        socket.on('offer', async (sdp: RTCSessionDescriptionInit) => {
        // We are the joiner — we received the offer
        console.log('received offer')
        setStatus('connecting')
        // Task 9 — handleOffer(sdp) goes here
        })

        socket.on('answer', async (sdp: RTCSessionDescriptionInit) => {
        console.log('received answer')
        // Task 9 — handleAnswer(sdp) goes here
        })

        socket.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
        // Task 9 — handleIceCandidate(candidate) goes here
        console.log('received ice candidate')
        })

        socket.on('peer-disconnected', () => {
        console.log('peer disconnected')
        setStatus('disconnected')
        pcRef.current?.close()
        })

        // Cleanup — remove all listeners when component unmounts
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

    async function sendFile(file: File) {}

    return {
        status,
        roomId,
        progress,
        createRoom,
        joinRoom,
        sendFile,
    }
}