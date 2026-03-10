import { useState, useRef, useEffect } from "react";
import { useWebRTCContext } from "../context/useWebRTCContext";
import type { ConnectionStatus } from "../utils/types";

function ThrowReceive() {
  const [collapsed, setCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const joinInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { status, roomId, progress, sendFile, joinRoom, createRoom } =
    useWebRTCContext();

  const statusColor: Record<ConnectionStatus, string> = {
    idle: "#888",
    waiting: "#ffcc66",
    connecting: "#00E5FF",
    connected: "#2ECC71",
    failed: "#ff6b6b",
    disconnected: "#ff6b6b",
  };

  const statusLabel: Record<ConnectionStatus, string> = {
    idle: "Not connected",
    waiting: "Waiting for peer to join...",
    connecting: "Connecting...",
    connected: "Connected ✓",
    failed: "Connection failed",
    disconnected: "Peer disconnected",
  };

  // Auto-create a room when page mounts
  // Skip if roomId already exists (came from landing page)
  useEffect(() => {
    if (!roomId) {
      createRoom();
    }
  }, []);

  function handleJoin() {
    const id = joinInputRef.current?.value.trim();
    if (!id) return;
    joinRoom(id);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log("file ------------------------", file);
    if (!file) return;
    setSelectedFile(file);
    // await sendFile(file);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: collapsed ? "60px 1fr" : "260px 1fr",
        height: "calc(100vh - 57px)",
        overflow: "hidden",
        transition: "grid-template-columns 0.2s ease",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "#16161D",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            alignSelf: collapsed ? "center" : "flex-end",
            marginRight: collapsed ? 0 : 12,
            marginBottom: 16,
            width: 28,
            height: 28,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(244,244,248,0.55)",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {collapsed ? "→" : "←"}
        </button>

        {/* Main section */}
        <div
          style={{ padding: collapsed ? "0 8px" : "0 16px", marginBottom: 24 }}
        >
          {!collapsed && (
            <div
              style={{
                fontSize: 10,
                fontFamily: "var(--font-mono)",
                color: "rgba(244,244,248,0.28)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "0 8px",
                marginBottom: 8,
              }}
            >
              Main
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 10,
              fontSize: 13,
              color: "#C8FF00",
              background: "rgba(200,255,0,0.08)",
              cursor: "pointer",
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>⬆</span>
            {!collapsed && <>Send Files</>}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 10,
              fontSize: 13,
              color: "rgba(244,244,248,0.55)",
              cursor: "pointer",
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>⬇</span>
            {!collapsed && <span style={{ flex: 1 }}>Received</span>}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 10,
              fontSize: 13,
              color: "rgba(244,244,248,0.55)",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>⏱</span>
            {!collapsed && <>History</>}
          </div>
        </div>

        {/* Room ID */}
        {!collapsed && (
          <div
            style={{
              margin: "auto 16px 0",
              padding: "14px 16px",
              background: "#1F1F2A",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "rgba(244,244,248,0.28)",
                fontFamily: "var(--font-mono)",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Your Room ID
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                color: "#C8FF00",
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              {roomId || "—"}
            </div>
            <button
              onClick={() => roomId && navigator.clipboard.writeText(roomId)}
              style={{
                width: "100%",
                padding: "6px",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "rgba(244,244,248,0.28)",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "none",
                cursor: "pointer",
              }}
            >
              copy
            </button>
          </div>
        )}
      </aside>

      {/* Main area */}
      <main
        style={{
          padding: "20px 28px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -1,
              }}
            >
              Send Files
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(244,244,248,0.55)",
                marginTop: 2,
              }}
            >
              Share your Room ID or enter someone else's to connect
            </div>
          </div>
          {/* Live status indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                color: statusColor[status],
              }}
            >
              {statusLabel[status]}
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: statusColor[status],
              }}
            />
          </div>
        </div>

        {/* Status banner */}
        {status !== "connected" && (
          <div
            style={{
              padding: "14px 20px",
              borderRadius: 16,
              border: `1px solid ${statusColor[status]}55`,
              background: `${statusColor[status]}11`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: statusColor[status],
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: statusColor[status],
                }}
              >
                {statusLabel[status]}
              </div>
              {status === "waiting" && roomId && (
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(244,244,248,0.28)",
                    fontFamily: "var(--font-mono)",
                    marginTop: 2,
                  }}
                >
                  Your room code is {roomId} — share it with your peer so they
                  can connect
                </div>
              )}
              {status === "failed" && (
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(244,244,248,0.28)",
                    marginTop: 2,
                  }}
                >
                  Room may be full or code is incorrect
                </div>
              )}
            </div>
          </div>
        )}

        {/* Connect panel */}
        <div
          style={{
            background: "#16161D",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 32,
            padding: "16px 20px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 24,
            alignItems: "center",
          }}
        >
          {/* Connect by Room Code */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "rgba(244,244,248,0.28)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              Connect by Room Code
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                ref={joinInputRef}
                type="text"
                placeholder="enter peer's room code"
                style={{
                  flex: 1,
                  background: "#1F1F2A",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "#C8FF00",
                  outline: "none",
                }}
              />
              <button
                onClick={handleJoin}
                style={{
                  padding: "12px 20px",
                  background: "#C8FF00",
                  color: "#0C0C10",
                  borderRadius: 10,
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: 13,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Connect
              </button>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "rgba(244,244,248,0.28)",
            }}
          >
            <div
              style={{
                width: 1,
                height: 40,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
              }}
            />
            <span style={{ fontSize: 20, color: "#C8FF00", opacity: 0.5 }}>
              ⇄
            </span>
            <div
              style={{
                width: 1,
                height: 40,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
              }}
            />
          </div>

          {/* Your Room ID */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "rgba(244,244,248,0.28)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              Your Room ID (share this)
            </div>
            <div
              style={{
                background: "#1F1F2A",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "#C8FF00",
                }}
              >
                {roomId || "—"}
              </span>
              <button
                onClick={() => roomId && navigator.clipboard.writeText(roomId)}
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(244,244,248,0.28)",
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                copy
              </button>
            </div>
          </div>
        </div>

        {/* Upload zone */}
        <div
          onClick={() =>
            status === "connected" && fileInputRef.current?.click()
          }
          style={{
            background: "#16161D",
            border: `2px dashed ${
              status === "connected"
                ? "rgba(200,255,0,0.3)"
                : "rgba(255,255,255,0.1)"
            }`,
            borderRadius: 32,
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: status === "connected" ? "pointer" : "not-allowed",
            minHeight: 160,
            opacity: status === "connected" ? 1 : 0.5,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile ? (
            // Show selected file
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "rgba(200,255,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                📄
              </div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {selectedFile.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(244,244,248,0.28)",
                }}
              >
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendFile(selectedFile);
                  }}
                  style={{
                    padding: "10px 24px",
                    background: "#C8FF00",
                    color: "#0C0C10",
                    borderRadius: 10,
                    fontFamily: "var(--font-head)",
                    fontWeight: 700,
                    fontSize: 13,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Throw it →
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  style={{
                    padding: "10px 16px",
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 10,
                    fontSize: 13,
                    color: "rgba(244,244,248,0.55)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Show drop zone prompt
            <>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  marginBottom: 20,
                  background: "#1F1F2A",
                }}
              >
                📁
              </div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 8,
                  letterSpacing: -0.3,
                }}
              >
                {status === "connected"
                  ? "Drop files to throw"
                  : "Connect to a peer first"}
              </div>
              <div style={{ fontSize: 13, color: "rgba(244,244,248,0.55)" }}>
                {status === "connected"
                  ? "or click to browse from your device"
                  : "Enter a peer's room code above and click Connect"}
              </div>
            </>
          )}

          {/* Progress bar */}
          {progress && (
            <div style={{ width: "100%", maxWidth: 400, marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    color: "rgba(244,244,248,0.55)",
                  }}
                >
                  {progress.filename}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    color: "#C8FF00",
                  }}
                >
                  {progress.percent}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 4,
                  background: "#2A2A38",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress.percent}%`,
                    height: "100%",
                    background: "#C8FF00",
                    borderRadius: 2,
                    transition: "width 0.1s",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    color: "rgba(244,244,248,0.28)",
                  }}
                >
                  {(progress.speed / (1024 * 1024)).toFixed(1)} MB/s
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    color: "rgba(244,244,248,0.28)",
                  }}
                >
                  {progress.eta}s remaining
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ThrowReceive;
