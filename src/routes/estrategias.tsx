import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/Layout";

export const Route = createFileRoute("/estrategias")({
  head: () => ({
    meta: [
      { title: "Estratégias — Virta Capital" },
      { name: "description", content: "Três formas de transformar seu patrimônio em capital produtivo." },
      { property: "og:title", content: "Estratégias — Virta Capital" },
    ],
  }),
  component: Page,
});

const items = [
  {
    n: "01",
    t: "Alavancagem empresarial",
    d: "Use o imóvel como garantia junto à administradora e libere capital em caixa para sua empresa expandir, investir ou atravessar um momento estratégico. Sem vender o ativo. Sem financiamento bancário.",
    assunto: "alavancagem-empresarial",
  },
  {
    n: "02",
    t: "Aquisição com renda passiva",
    d: "Utilize a carta contemplada para adquirir um imóvel estratégico e gere fluxo de renda recorrente com capital que estava parado.",
    assunto: "aquisicao-renda-passiva",
  },
  {
    n: "03",
    t: "Rendimento atrelado ao CDI",
    d: "Para perfis conservadores: a carta de crédito rendendo CDI enquanto você analisa o próximo movimento patrimonial.",
    assunto: "rendimento-cdi",
  },
];

function Page() {
  return (
    <Layout>
      <PageHero eyebrow="Estratégias" title="Três formas de transformar seu patrimônio" />

      <div style={{ borderTop: "0.5px solid var(--border-gold)" }}>
        {items.map((it) => (
          <section
            key={it.n}
            className="px-6 lg:px-10 py-24 md:py-32"
            style={{ borderBottom: "0.5px solid var(--border-gold)" }}
          >
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-3">
                <div
                  className="font-display text-6xl md:text-7xl font-light"
                  style={{ color: "var(--gold)" }}
                >
                  {it.n}
                </div>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
                  {it.t}
                </h2>
                <p className="mt-8 text-[14px] text-foreground/55 leading-relaxed max-w-2xl">
                  {it.d}
                </p>
                <Link
                  to="/contato"
                  search={{ assunto: it.assunto }}
                  className="mt-10 inline-flex text-[11px] tracking-[0.2em] uppercase text-[color:var(--gold)] hover:text-[color:var(--gold-light)]"
                >
                  Quero entender essa estratégia →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
