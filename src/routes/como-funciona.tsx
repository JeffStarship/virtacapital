import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHero } from "@/components/Layout";
import canopusStar from "@/assets/canopus-star.png";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como Funciona — Virta Capital" },
      { name: "description", content: "Entenda como transformamos cartas contempladas em capital produtivo." },
      { property: "og:title", content: "Como Funciona — Virta Capital" },
    ],
  }),
  component: Page,
});

const steps = [
  { n: "01", t: "Diagnóstico de Ativos", d: "Identificamos o potencial oculto no seu patrimônio atual. O ponto de partida é o que você já construiu." },
  { n: "02", t: "Engenharia Financeira", d: "Desenhamos a estratégia sob medida para o seu perfil. Analisamos objetivos e horizontes para definir o melhor caminho de alavancagem." },
  { n: "03", t: "Estruturação Institucional", d: "Conduzimos toda a operação com suporte de administradoras regulamentadas pelo Banco Central, garantindo máxima segurança jurídica ao seu movimento.", canopus: true },
  { n: "04", t: "Capital Produtivo", d: "Recursos liberados e prontos para o destino estratégico: expansão de negócios, novos ativos ou maximização de rentabilidade." },
];

const faq = [
  { q: "O que é uma carta contemplada?", a: "É a comprovação de que um cotista de consórcio tem direito ao crédito previsto. Esse crédito pode ser direcionado a múltiplas estratégias patrimoniais." },
  { q: "Preciso vender meu imóvel?", a: "Não. A estratégia foi desenhada justamente para preservar o ativo enquanto libera capital." },
  { q: "Quem pode usar essa estratégia?", a: "Investidores, empresários e profissionais liberais com patrimônio que desejam mais rentabilidade com segurança." },
  { q: "É regulamentado?", a: "Sim. Toda a operação acontece via Canopus, administradora regulamentada pelo Banco Central do Brasil." },
];

function Page() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Layout>
      <PageHero
        eyebrow="Como Funciona"
        title="Da inteligência estratégica ao capital em movimento"
        subtitle="Um fluxo desenhado para quem busca eficiência patrimonial e segurança institucional."
      />

      <section className="px-6 lg:px-10 py-20 md:py-28" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.n} className="relative pl-16 md:pl-24 pb-16 last:pb-0">
                <div
                  className="absolute left-4 md:left-8 top-2 bottom-0"
                  style={{
                    width: "0.5px",
                    background: i === steps.length - 1 ? "transparent" : "var(--border-gold)",
                  }}
                />
                <div
                  className="absolute left-0 top-0 font-display text-xl md:text-2xl"
                  style={{ color: "var(--gold)" }}
                >
                  {s.n}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight flex items-center gap-3 flex-wrap">
                  {s.t}
                  {s.canopus && (
                    <img src={canopusStar} alt="Canopus" className="h-6 w-6 opacity-80 inline-block" />
                  )}
                </h3>
                <p className="mt-4 text-[15px] text-foreground/50 leading-relaxed max-w-xl">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-20 md:py-28" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-6">Perguntas frequentes</p>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-12">Dúvidas comuns</h2>
          <div style={{ borderTop: "0.5px solid var(--border-gold)" }}>
            {faq.map((f, i) => (
              <div key={f.q} style={{ borderBottom: "0.5px solid var(--border-gold)" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <span className="font-display text-lg md:text-xl font-light pr-6">{f.q}</span>
                  {open === i ? (
                    <Minus size={16} style={{ color: "var(--gold)" }} />
                  ) : (
                    <Plus size={16} style={{ color: "var(--gold)" }} />
                  )}
                </button>
                {open === i && (
                  <p className="pb-6 text-[15px] text-foreground/55 leading-relaxed max-w-2xl">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24" style={{ background: "#0E0E0D" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light">Vamos conversar?</h2>
          <Link
            to="/contato"
            className="mt-10 inline-flex items-center px-8 py-4 text-[13px] tracking-[0.2em] uppercase"
            style={{ background: "var(--gold)", color: "#111110" }}
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </Layout>
  );
}
