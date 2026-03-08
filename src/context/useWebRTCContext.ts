import { useContext } from "react"
import { WebRTCContext } from "../layouts/RootLayout"

export function useWebRTCContext() {
  const ctx = useContext(WebRTCContext)
  if (!ctx) throw new Error('useWebRTCContext must be used inside RootLayout')
  return ctx
}