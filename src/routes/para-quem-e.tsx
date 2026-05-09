import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/Layout";

export const Route = createFileRoute("/para-quem-e")({
  head: () => ({
    meta: [
      { title: "Para Quem É — Virta Capital" },
      { name: "description", content: "Para quem já construiu patrimônio e quer fazê-lo trabalhar." },
      { property: "og:title", content: "Para Quem É — Virta Capital" },
    ],
  }),
  component: Page,
});

const profiles = [
  {
    t: "Médico ou profissional liberal",
    d: "Alta renda, patrimônio acumulado em imóveis, perfil conservador. Busca multiplicar sem risco desnecessário.",
  },
  {
    t: "Empresário",
    d: "Precisa de capital para expansão sem comprometer o caixa ou vender ativos.",
  },
  {
    t: "Investidor",
    d: "Já entende de mercado, quer diversificar com uma estratégia pouco explorada.",
  },
];

function Page() {
  return (
    <Layout>
      <PageHero
        eyebrow="Para Quem É"
        title="Para quem já construiu patrimônio e quer fazê-lo trabalhar"
      />

      <section
        className="px-6 lg:px-10 py-20 md:py-28"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
          {profiles.map((p, i) => (
            <div
              key={p.t}
              className="p-10 md:p-12"
              style={{
                borderRight: i < profiles.length - 1 ? "0.5px solid var(--border-gold)" : "none",
                borderBottom: "0.5px solid var(--border-gold)",
              }}
            >
              <div className="text-[10px] tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                0{i + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl md:text-3xl font-light leading-tight">
                {p.t}
              </h3>
              <p className="mt-6 text-[13px] text-foreground/50 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 md:py-32" style={{ background: "#0E0E0D" }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="gold-line mb-8 mx-auto" />
          <h2 className="font-display text-3xl md:text-5xl font-light">Você se identifica?</h2>
          <p className="mt-8 text-[13px] text-foreground/50 max-w-xl mx-auto leading-relaxed">
            Se algum desses perfis se aproxima do seu momento, vale uma conversa.
          </p>
          <Link
            to="/contato"
            className="mt-12 inline-flex items-center px-8 py-4 text-[11px] tracking-[0.2em] uppercase"
            style={{ background: "var(--gold)", color: "#111110" }}
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </Layout>
  );
}
