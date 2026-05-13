import { Link } from "react-router-dom";
import { Layout, PageHero } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";
import everton from "@/assets/everton.webp";
import canopusLogo from "@/assets/canopus-logo.png";

export default function Sobre() {
  usePageMeta("Sobre — Virta Capital", "Quem está por trás da Virta Capital.");
  return (
    <Layout>
      <PageHero eyebrow="Sobre" title="Quem está por trás da Virta Capital" />

      <section
        className="px-6 lg:px-10 py-24 md:py-32"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <img
            src={everton}
            alt="Everton Rossi"
            className="w-full max-w-md"
            style={{ filter: "grayscale(1) contrast(1.08)" }}
          />
          <div>
            <p
              className="mb-6 text-[11px] tracking-[0.35em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Alavancagem Patrimonial
            </p>
            <h2 className="font-display text-3xl md:text-[48px] font-light leading-tight">
              Everton Rossi
            </h2>
            <p className="mt-10 text-[16px] text-foreground/65 leading-relaxed max-w-lg">
              Com anos de atuação no mercado financeiro e patrimonial, Everton Rossi ajuda
              investidores e empresários a acessarem estratégias de alavancagem real — sem
              depender de banco ou soluções enlatadas.
            </p>
          </div>
        </div>
      </section>

      <section
        className="px-6 lg:px-10 py-24 md:py-32"
        style={{ borderTop: "0.5px solid var(--border-gold)", background: "#0E0E0D" }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow mb-6">Nossa parceria</p>
          <h2 className="font-display text-3xl md:text-5xl font-light max-w-2xl mx-auto leading-tight">
            Nossa parceria com a Canopus
          </h2>
          <img src={canopusLogo} alt="Consórcio Canopus" className="h-14 w-auto mx-auto mt-12 opacity-90" />
          <p className="mt-10 text-[16px] text-foreground/55 max-w-2xl mx-auto leading-relaxed">
            O Consórcio Canopus é regulamentado pelo Banco Central do Brasil, com presença em todo o território nacional. Toda operação Virta Capital passa por essa estrutura — segurança jurídica e regulatória do início ao fim.
          </p>
        </div>
      </section>

      <section
        className="px-6 lg:px-10 py-24"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
          {[
            { t: "Transparência", d: "Cada etapa explicada. Nenhuma letra miúda." },
            { t: "Estratégia", d: "Cada cliente, um plano sob medida." },
            { t: "Resultado", d: "Capital trabalhando, patrimônio em movimento." },
          ].map((v, i) => (
            <div
              key={v.t}
              className="p-10 text-center"
              style={{
                borderRight: i < 2 ? "0.5px solid var(--border-gold)" : "none",
                borderBottom: "0.5px solid var(--border-gold)",
              }}
            >
              <h3 className="font-display text-2xl font-light" style={{ color: "var(--gold)" }}>
                {v.t}
              </h3>
              <p className="mt-4 text-[14px] text-foreground/45 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 md:py-32" style={{ background: "#0E0E0D", borderTop: "0.5px solid var(--border-gold)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="gold-line mb-8 mx-auto" />
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
            Pronto para dar o próximo passo?
          </h2>
          <Link
            to="/contato"
            className="mt-12 inline-flex items-center px-8 py-4 text-[13px] tracking-[0.2em] uppercase"
            style={{ background: "var(--gold)", color: "#111110", border: "0.5px solid var(--gold)" }}
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </Layout>
  );
}
