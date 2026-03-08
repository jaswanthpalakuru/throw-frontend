import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useWebRTC } from "../customHooks/useWebRTC";
import { createContext, useContext } from "react";
import type { ConnectionStatus, TransferProgress } from "../utils/types";

interface WebRTCContextType {
  status: ConnectionStatus;
  roomId: string;
  progress: TransferProgress | null;
  createRoom: () => void;
  joinRoom: (id: string) => void;
  sendFile: (file: File) => Promise<void>;
}

export const WebRTCContext = createContext<WebRTCContextType | null>(null);

export default function RootLayout() {
  const webrtc = useWebRTC();

  console.log("web rtc --------", webrtc);

  return (
    <WebRTCContext.Provider value={webrtc}>
      <div style={{ minHeight: "100vh", backgroundColor: "#0C0C10", color: "#F4F4F8" }}>
        <Navbar />
        <main style={{ paddingTop: "var(--nav-height)" }}>
          <Outlet />
        </main>
      </div>
    </WebRTCContext.Provider>
  );
}
