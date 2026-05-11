import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/Layout";
import everton from "@/assets/everton.webp";
import canopusLogo from "@/assets/canopus-logo.png";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Virta Capital" },
      { name: "description", content: "Quem está por trás da Virta Capital." },
      { property: "og:title", content: "Sobre — Virta Capital" },
    ],
  }),
  component: Page,
});

function Page() {
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
            <p className="eyebrow mb-4">Alavancagem Patrimonial</p>
            <h2 className="font-display text-3xl md:text-[48px] font-light leading-tight">
              Everton Rossi
            </h2>
            <p className="mt-8 text-[16px] text-foreground/55 leading-relaxed max-w-lg">
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
            Operamos junto à administradora com mais de 40 anos de mercado
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
    </Layout>
  );
}
