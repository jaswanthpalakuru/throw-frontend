import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      style={{ backgroundColor: "rgba(12,12,16,0.9)", height: "var(--nav-height)" }}
      className="
        fixed top-0 left-0 right-0 z-50
        grid grid-cols-3 items-center
        px-8 py-3
        backdrop-blur-xl
        border-b border-white/7
      "
    >
      {/* Col 1 — Brand left */}
      <span
        className="font-head font-extrabold text-xl text-lime"
        style={{ fontSize: 40 }}
      >
        throw
      </span>

      {/* Col 2 — Links center */}
      <div className="flex items-center justify-center gap-6">
        <Link
          to="/"
          className={`
            text-sm font-medium transition-colors duration-150
            ${isActive("/") ? "text-lime" : "text-text-2 hover:text-text"}
          `}
          style={{ fontSize: 25 }}
        >
          Landing
        </Link>

        <Link
          to="/throw"
          className={`
            text-sm font-medium transition-colors duration-150
            ${
              location.pathname.startsWith("/throw")
                ? "text-lime"
                : "text-text-2 hover:text-text"
            }
          `}
          style={{ fontSize: 25 }}
        >
          Throw
        </Link>
      </div>

      {/* Col 3 — Empty right (balances the layout) */}
      <div />
    </nav>
  );
}
