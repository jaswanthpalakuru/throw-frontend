export interface CardData {
  icon: string
  color: string
  title: string
  desc: string
}

export interface Props {
  data: CardData[]
}

export interface IceCandidate {
  candidate: string
  sdpMid: string | null
  sdpMLineIndex: number | null
}

export type ConnectionStatus =
  | 'idle'
  | 'waiting'
  | 'connecting'
  | 'connected'
  | 'failed'
  | 'disconnected'

export interface FileMetadata {
  name: string
  size: number
  type: string
}

export interface TransferProgress {
  filename: string
  size: number
  transferred: number
  percent: number
  speed: number       // bytes per second
  eta: number         // seconds remaining
}