import { Link } from "@tanstack/react-router";
import logo from "@/assets/virta-logo.svg";
import canopusLogo from "@/assets/canopus-logo.png";

const links = [
  { to: "/como-funciona", label: "Como Funciona" },
  { to: "/estrategias", label: "Estratégias" },
  { to: "/para-quem-e", label: "Para Quem É" },
  { to: "/sobre", label: "Sobre" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
] as const;

export function Footer() {
  return (
    <footer>
      {/* Canopus partner bar */}
      <div style={{ background: "#0E0E0D", borderTop: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <img src={canopusLogo} alt="Consórcio Canopus" className="h-10 w-auto opacity-80" />
          <div
            className="hidden md:block"
            style={{ width: "0.5px", height: "40px", background: "rgba(180,150,90,0.4)" }}
          />
          <p className="text-[13px] leading-relaxed text-foreground/55 max-w-2xl text-center md:text-left tracking-wide">
            Parceiro autorizado · Consórcio Canopus · Mais de 40 anos de mercado, regulamentado pelo Banco Central do Brasil.
          </p>
        </div>
      </div>

      <div style={{ background: "#0A0A09", borderTop: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col gap-3">
            <img src={logo} alt="Virta Capital" className="h-12 w-auto" />
            <p className="text-[12px] text-foreground/40 tracking-wide">
              © 2025 Virta Capital · Todos os direitos reservados
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[12px] tracking-[0.2em] uppercase text-foreground/50 hover:text-[color:var(--gold)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p
            className="text-[11px] tracking-[0.4em] uppercase md:text-right"
            style={{ color: "rgba(155,126,78,0.3)" }}
          >
            Alavancagem Patrimonial
          </p>
        </div>
      </div>
    </footer>
  );
}
