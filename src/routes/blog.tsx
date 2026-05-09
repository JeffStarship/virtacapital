import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/Layout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Virta Capital" },
      { name: "description", content: "Conteúdo sobre patrimônio e alavancagem." },
      { property: "og:title", content: "Blog — Virta Capital" },
    ],
  }),
  component: Page,
});

const posts = [
  {
    cat: "Estratégia",
    t: "Por que vender o imóvel quase nunca é a melhor saída",
    d: "20 Mar 2025",
  },
  {
    cat: "Patrimônio",
    t: "Carta contemplada: o ativo financeiro pouco explorado",
    d: "12 Mar 2025",
  },
  {
    cat: "Mercado",
    t: "CDI em alta: como manter capital rendendo sem travá-lo",
    d: "04 Mar 2025",
  },
];

function Page() {
  return (
    <Layout>
      <PageHero eyebrow="Blog" title="Conteúdo sobre patrimônio e alavancagem" />

      <section
        className="px-6 lg:px-10 py-20 md:py-28"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
          {posts.map((p, i) => (
            <article
              key={p.t}
              className="p-8 md:p-10"
              style={{
                borderRight: i < posts.length - 1 ? "0.5px solid var(--border-gold)" : "none",
                borderBottom: "0.5px solid var(--border-gold)",
              }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
                {p.cat}
              </p>
              <h3 className="mt-6 font-display text-2xl font-light leading-tight min-h-[5rem]">
                {p.t}
              </h3>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-[10px] text-foreground/35 tracking-wider">{p.d}</span>
                <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--gold)]">
                  Ler →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-6xl mt-16 flex justify-center gap-8 text-[11px] tracking-[0.2em] uppercase text-foreground/40">
          <button>← Anterior</button>
          <span style={{ color: "var(--gold)" }}>1</span>
          <span>2</span>
          <button>Próximo →</button>
        </div>
      </section>
    </Layout>
  );
}
