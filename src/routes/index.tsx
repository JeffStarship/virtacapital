import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import everton from "@/assets/everton.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virta Capital — Alavancagem Patrimonial" },
      {
        name: "description",
        content:
          "Estratégias com cartas de crédito contempladas. Transforme ativos parados em capital produtivo.",
      },
      { property: "og:title", content: "Virta Capital — Alavancagem Patrimonial" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="px-6 lg:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="gold-line mb-8" />
          <p className="eyebrow mb-8">Alavancagem Patrimonial</p>
          <h1 className="font-display font-light leading-[1.05] text-[50px] md:text-[76px] max-w-4xl">
            Patrimônio imobilizado é capital{" "}
            <em className="italic" style={{ color: "var(--gold)" }}>
              desperdiçado
            </em>
          </h1>
          <p className="mt-10 text-[14px] text-foreground/40 max-w-[380px] leading-relaxed">
            Estruturamos estratégias com cartas de crédito contempladas para transformar ativos
            parados em capital produtivo — sem banco, sem venda.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5">
            <Link
              to="/como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 text-[13px] tracking-[0.2em] uppercase"
              style={{ background: "var(--gold)", color: "#111110" }}
            >
              Entender a estratégia
            </Link>
            <Link
              to="/estrategias"
              className="inline-flex items-center text-[13px] tracking-[0.2em] uppercase text-foreground/70 hover:text-[color:var(--gold)]"
            >
              Ver estratégias →
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 lg:px-10 py-20" style={{ borderTop: "0.5px solid var(--border-gold)", borderBottom: "0.5px solid var(--border-gold)" }}>
        <div className="mx-auto max-w-6xl grid grid-cols-2">
          {[
            { n: "55+", l: "Anos Canopus" },
            { n: "100%", l: "Regulamentado BC" },
          ].map((s, i) => (
            <div
              key={s.l}
              className="px-4 md:px-10 py-6 text-center"
              style={{
                borderLeft: i === 0 ? "none" : "0.5px solid var(--border-gold)",
              }}
            >
              <div className="font-display text-3xl md:text-4xl font-light" style={{ color: "var(--gold)" }}>
                {s.n}
              </div>
              <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-foreground/30">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STRATEGIES PREVIEW */}
      <section className="px-6 lg:px-10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="gold-line mb-8" />
          <p className="eyebrow mb-6">Três caminhos</p>
          <h2 className="font-display text-3xl md:text-5xl font-light max-w-2xl leading-tight">
            Como sua carta contemplada gera resultado
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
            {[
              { n: "01", t: "Alavancagem empresarial", d: "Capital em caixa para sua empresa expandir, sem vender o imóvel." },
              { n: "02", t: "Aquisição com renda passiva", d: "Utilize a carta contemplada para adquirir um imóvel estratégico e gere fluxo de renda recorrente com capital que estava parado — sem comprometer sua liquidez." },
              { n: "03", t: "Rendimento do CDI", d: "Rentabilidade em cima de capital de terceiros enquanto você define o próximo movimento." },
            ].map((c, i) => (
              <div
                key={c.n}
                className="p-8 md:p-10"
                style={{
                  borderRight: i < 2 ? "0.5px solid var(--border-gold)" : "none",
                  borderBottom: "0.5px solid var(--border-gold)",
                }}
              >
                <div className="text-[12px] tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                  {c.n}
                </div>
                <h3 className="mt-6 font-display text-2xl font-light leading-tight">{c.t}</h3>
                <p className="mt-5 text-[15px] text-foreground/45 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/estrategias"
              className="text-[13px] tracking-[0.2em] uppercase text-foreground/70 hover:text-[color:var(--gold)]"
            >
              Ver todas as estratégias →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section
        className="px-6 lg:px-10 py-24 md:py-32"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <img
              src={everton}
              alt="Everton Rossi"
              className="w-full max-w-md"
              style={{ filter: "grayscale(1) contrast(1.05)" }}
            />
          </div>
          <div>
            <p className="eyebrow mb-6">Quem conduz</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
              Everton Rossi
            </h2>
            <p className="mt-3 text-[12px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
              Alavancagem Patrimonial
            </p>
            <p className="mt-8 text-[15px] text-foreground/55 leading-relaxed max-w-md">
              Anos de atuação no mercado financeiro e patrimonial, ajudando investidores e
              empresários a acessarem estratégias de alavancagem real — sem depender de banco.
            </p>
            <Link
              to="/sobre"
              className="mt-8 inline-flex text-[13px] tracking-[0.2em] uppercase text-foreground/70 hover:text-[color:var(--gold)]"
            >
              Conhecer a equipe →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-24 md:py-32" style={{ background: "#0E0E0D" }}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="gold-line mb-8 mx-auto" />
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
            Pronto para colocar seu patrimônio em movimento?
          </h2>
          <Link
            to="/contato"
            className="mt-12 inline-flex items-center px-8 py-4 text-[13px] tracking-[0.2em] uppercase"
            style={{ background: "var(--gold)", color: "#111110" }}
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </Layout>
  );
}
