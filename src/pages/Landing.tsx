// import { Link } from "react-router-dom";
// import LandingPageCards from "../components/LandingPageCards";
// import { landingPageCardsData } from "../utils/constants";

// export default function Landing() {
//   return (
//     <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
//       {/* Background blobs — isolated in their own overflow-hidden layer */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           overflow: "hidden",
//           pointerEvents: "none",
//           zIndex: 0,
//         }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             width: 600,
//             height: 600,
//             borderRadius: "50%",
//             background: "rgba(200,255,0,0.07)",
//             filter: "blur(120px)",
//             top: -200,
//             left: -150,
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             width: 400,
//             height: 400,
//             borderRadius: "50%",
//             background: "rgba(0,229,255,0.06)",
//             filter: "blur(120px)",
//             top: 100,
//             right: -100,
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             width: 300,
//             height: 300,
//             borderRadius: "50%",
//             background: "rgba(139,92,246,0.08)",
//             filter: "blur(120px)",
//             bottom: 200,
//             left: "40%",
//           }}
//         />
//       </div>

//       {/* Hero */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           maxWidth: 1100,
//           margin: "0 auto",
//           padding: "60px 48px 40px",
//           display: "grid",
//           gridTemplateColumns: "1fr 420px",
//           gap: 64,
//           alignItems: "center",
//         }}
//       >
//         {/* Left */}
//         <div>
//           {/* Badge */}
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               padding: "6px 12px",
//               borderRadius: 100,
//               border: "1px solid rgba(200,255,0,0.25)",
//               background: "rgba(200,255,0,0.06)",
//               fontSize: 12,
//               fontFamily: "var(--font-mono)",
//               color: "#C8FF00",
//               marginBottom: 24,
//             }}
//           >
//             <span
//               style={{
//                 width: 6,
//                 height: 6,
//                 borderRadius: "50%",
//                 background: "#C8FF00",
//                 flexShrink: 0,
//               }}
//             />
//             No account needed — just share
//           </div>

//           {/* Title */}
//           <h1
//             style={{
//               fontFamily: "var(--font-head)",
//               fontSize: 72,
//               fontWeight: 800,
//               lineHeight: 0.95,
//               letterSpacing: -3,
//               marginBottom: 24,
//             }}
//           >
//             Send files.
//             <br />
//             <em style={{ fontStyle: "normal", color: "#C8FF00" }}>
//               Instantly.
//             </em>
//             <br />
//             To anyone.
//           </h1>

//           {/* Subtitle */}
//           <p
//             style={{
//               fontSize: 17,
//               color: "rgba(244,244,248,0.55)",
//               lineHeight: 1.6,
//               maxWidth: 440,
//             }}
//           >
//             Throw files directly to any device on the network. No uploads, no
//             cloud, no waiting. Pure peer-to-peer speed with WebRTC.
//           </p>
//         </div>

//         {/* Right — Session card */}
//         <div
//           style={{
//             position: "relative",
//             background: "#16161D",
//             border: "1px solid rgba(255,255,255,0.07)",
//             borderRadius: 32,
//             padding: 32,
//             overflow: "hidden",
//           }}
//         >
//           {/* Top gradient line */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               height: 2,
//               background:
//                 "linear-gradient(90deg, #C8FF00, #00E5FF, transparent)",
//             }}
//           />

//           {/* Session label */}
//           <div
//             style={{
//               fontSize: 11,
//               fontFamily: "var(--font-mono)",
//               color: "rgba(244,244,248,0.28)",
//               textTransform: "uppercase" as const,
//               letterSpacing: 1,
//               marginBottom: 16,
//             }}
//           >
//             Your Session
//           </div>

//           {/* Room ID row */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "20px 24px",
//               marginBottom: 20,
//               background: "#1F1F2A",
//               border: "1px solid rgba(255,255,255,0.07)",
//               borderRadius: 16,
//             }}
//           >
//             <span
//               style={{
//                 fontFamily: "var(--font-mono)",
//                 fontSize: 22,
//                 fontWeight: 500,
//                 color: "#C8FF00",
//                 letterSpacing: 1,
//               }}
//             >
//               swift-fox-8492
//             </span>
//             <button
//               style={{
//                 padding: "8px 14px",
//                 borderRadius: 8,
//                 background: "rgba(200,255,0,0.08)",
//                 border: "1px solid rgba(200,255,0,0.2)",
//                 fontSize: 11,
//                 fontFamily: "var(--font-mono)",
//                 color: "#C8FF00",
//                 cursor: "pointer",
//               }}
//             >
//               Copy ID
//             </button>
//           </div>

//           {/* Peers section */}
//           <div style={{ marginBottom: 24 }}>
//             <div
//               style={{
//                 fontSize: 11,
//                 fontFamily: "var(--font-mono)",
//                 color: "rgba(244,244,248,0.28)",
//                 textTransform: "uppercase" as const,
//                 letterSpacing: 1,
//                 marginBottom: 10,
//               }}
//             >
//               Nearby (2)
//             </div>

//             {/* Arjun's Laptop */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 padding: "10px 12px",
//                 background: "#1F1F2A",
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 borderRadius: 10,
//                 marginBottom: 8,
//               }}
//             >
//               <div
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: 8,
//                   background: "rgba(200,255,0,0.12)",
//                   color: "#C8FF00",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: 700,
//                   fontSize: 13,
//                   flexShrink: 0,
//                 }}
//               >
//                 A
//               </div>
//               <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
//                 Arjun's Laptop
//               </span>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   fontSize: 11,
//                   fontFamily: "var(--font-mono)",
//                   color: "#2ECC71",
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#2ECC71",
//                     flexShrink: 0,
//                   }}
//                 />
//                 Local
//               </div>
//             </div>

//             {/* Priya's Phone */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 12,
//                 padding: "10px 12px",
//                 background: "#1F1F2A",
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 borderRadius: 10,
//               }}
//             >
//               <div
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: 8,
//                   background: "rgba(0,229,255,0.12)",
//                   color: "#00E5FF",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontWeight: 700,
//                   fontSize: 13,
//                   flexShrink: 0,
//                 }}
//               >
//                 P
//               </div>
//               <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
//                 Priya's Phone
//               </span>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   fontSize: 11,
//                   fontFamily: "var(--font-mono)",
//                   color: "#00E5FF",
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#00E5FF",
//                     flexShrink: 0,
//                   }}
//                 />
//                 Online
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 20 }} />

//           {/* Stats */}
//           <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
//             {[
//               { val: "0ms", label: "Latency overhead" },
//               { val: "∞", label: "File size limit" },
//               { val: "E2E", label: "Encrypted" },
//             ].map((s, i) => (
//               <div
//                 key={s.val}
//                 style={{
//                   flex: 1,
//                   paddingLeft: i === 0 ? 0 : 16,
//                   borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
//                 }}
//               >
//                 <div style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800, letterSpacing: -1 }}>
//                   {s.val}
//                 </div>
//                 <div style={{ fontSize: 11, color: "rgba(244,244,248,0.28)", marginTop: 2 }}>
//                   {s.label}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div style={{ display: "flex", gap: 8 }}>
//             <Link to="/throw" style={{ flex: 1 }}>
//               <button style={{ width: "100%", padding: "13px", background: "#C8FF00", color: "#0C0C10", borderRadius: 10, fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
//                 Start Throwing →
//               </button>
//             </Link>
//             <button
//               disabled
//               style={{ flex: 1, padding: "13px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, color: "rgba(244,244,248,0.55)", background: "none", cursor: "not-allowed" }}
//             >
//               How it works ↗
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Feature Cards */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           width: "100%",
//           maxWidth: 1100,
//           margin: "0 auto",
//           padding: "0 48px 40px",
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: 16,
//           boxSizing: "border-box",
//         }}
//       >
//         <LandingPageCards data={landingPageCardsData} />
//       </div>
//     </div>
//   );
// }

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageCards from "../components/LandingPageCards";
import { landingPageCardsData } from "../utils/constants";
import { useWebRTCContext } from "../context/useWebRTCContext";

export default function Landing() {
  const navigate = useNavigate();
  const joinInputRef = useRef<HTMLInputElement>(null);
  const { createRoom, joinRoom, roomId } = useWebRTCContext();

  function handleCreateRoom() {
    createRoom();
    navigate("/throw");
  }

  function handleJoinRoom() {
    const id = joinInputRef.current?.value.trim();
    if (!id) return;
    joinRoom(id);
    navigate("/throw");
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(200,255,0,0.07)",
            filter: "blur(120px)",
            top: -200,
            left: -150,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(0,229,255,0.06)",
            filter: "blur(120px)",
            top: 100,
            right: -100,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.08)",
            filter: "blur(120px)",
            bottom: 200,
            left: "40%",
          }}
        />
      </div>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 48px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 100,
              border: "1px solid rgba(200,255,0,0.25)",
              background: "rgba(200,255,0,0.06)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              color: "#C8FF00",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C8FF00",
                flexShrink: 0,
              }}
            />
            No account needed — just share
          </div>

          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
              marginBottom: 24,
            }}
          >
            Send files.
            <br />
            <em style={{ fontStyle: "normal", color: "#C8FF00" }}>
              Instantly.
            </em>
            <br />
            To anyone.
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "rgba(244,244,248,0.55)",
              lineHeight: 1.6,
              maxWidth: 440,
            }}
          >
            Throw files directly to any device on the network. No uploads, no
            cloud, no waiting. Pure peer-to-peer speed with WebRTC.
          </p>
        </div>

        {/* Right — Session card */}
        <div
          style={{
            position: "relative",
            background: "#16161D",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 32,
            padding: 32,
            overflow: "hidden",
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, #C8FF00, #00E5FF, transparent)",
            }}
          />

          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "rgba(244,244,248,0.28)",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 16,
            }}
          >
            Your Session
          </div>

          {/* Room ID — shows after room is created */}
          {roomId && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                marginBottom: 20,
                background: "#1F1F2A",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#C8FF00",
                  letterSpacing: 1,
                }}
              >
                {roomId}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(roomId)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  background: "rgba(200,255,0,0.08)",
                  border: "1px solid rgba(200,255,0,0.2)",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "#C8FF00",
                  cursor: "pointer",
                }}
              >
                Copy ID
              </button>
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
            {[
              { val: "0ms", label: "Latency overhead" },
              { val: "∞", label: "File size limit" },
              { val: "E2E", label: "Encrypted" },
            ].map((s, i) => (
              <div
                key={s.val}
                style={{
                  flex: 1,
                  paddingLeft: i === 0 ? 0 : 16,
                  borderLeft:
                    i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: -1,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(244,244,248,0.28)",
                    marginTop: 2,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.07)",
              marginBottom: 20,
            }}
          />

          {/* Create Room */}
          <button
            onClick={handleCreateRoom}
            style={{
              width: "100%",
              padding: 13,
              background: "#C8FF00",
              color: "#0C0C10",
              borderRadius: 10,
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              marginBottom: 12,
            }}
          >
            Create Room →
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "rgba(244,244,248,0.28)",
              }}
            >
              or join existing
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>

          {/* Join Room */}
          <div style={{ display: "flex", gap: 8 }}>
            <input
              ref={joinInputRef}
              type="text"
              placeholder="enter room code"
              style={{
                flex: 1,
                padding: "12px 16px",
                background: "#1F1F2A",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                color: "rgba(244,244,248,0.55)",
                outline: "none",
              }}
            />
            <button
              onClick={handleJoinRoom}
              style={{
                padding: "12px 20px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                fontSize: 13,
                color: "rgba(244,244,248,0.55)",
                background: "none",
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 48px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        <LandingPageCards data={landingPageCardsData} />
      </div>
    </div>
  );
}
