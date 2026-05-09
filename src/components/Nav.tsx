import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/virta-logo.svg";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/como-funciona", label: "Como Funciona" },
  { to: "/estrategias", label: "Estratégias" },
  { to: "/para-quem-e", label: "Para Quem É" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur"
      style={{ borderBottom: "0.5px solid rgba(180,150,90,0.15)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Virta Capital" className="h-12 md:h-14 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/70 hover:text-[color:var(--gold)] transition-colors"
              activeProps={{ style: { color: "var(--gold)" } }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contato"
          className="hidden lg:inline-flex items-center px-5 py-2 text-[11px] tracking-[0.2em] uppercase text-[color:var(--gold)]"
          style={{ border: "0.5px solid var(--gold)" }}
        >
          Conversar
        </Link>
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div
          className="lg:hidden bg-background"
          style={{ borderTop: "0.5px solid rgba(180,150,90,0.15)" }}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-xs tracking-[0.15em] uppercase text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contato"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center px-5 py-3 text-[11px] tracking-[0.2em] uppercase text-[color:var(--gold)] w-fit"
              style={{ border: "0.5px solid var(--gold)" }}
            >
              Conversar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
