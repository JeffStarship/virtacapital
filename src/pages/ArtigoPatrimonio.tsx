import { Link } from "react-router-dom";
import { Layout, PageHero } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";

const sections = [
  {
    h: "A ilusão da segurança",
    p: "Existe uma crença enraizada na cultura financeira brasileira: o que está quitado e parado está seguro. O imóvel sem dívida, o dinheiro na conta, o terreno guardado. A sensação é de tranquilidade. Mas segurança e ausência de movimento não são a mesma coisa. Patrimônio parado não é neutro — ele tem um custo, invisível justamente porque não aparece em nenhum extrato. Ninguém recebe uma fatura pelo dinheiro que deixou de render.",
  },
  {
    h: "Custo de oportunidade, sem economês",
    p: "A ideia é simples: tudo que seu patrimônio deixa de fazer tem um preço. Um imóvel quitado que poderia estar viabilizando um novo negócio, uma expansão ou um ativo que se valoriza — mas está apenas parado — está custando todo esse retorno não realizado. Não é uma perda visível. É uma ausência de ganho. E ao longo de dez, vinte anos, essa ausência acumulada costuma ser muito maior do que se imagina.",
  },
  {
    h: "A inflação corrói o que parece estável",
    p: "Dinheiro parado não fica do mesmo tamanho — encolhe. A inflação reduz silenciosamente o poder de compra de qualquer valor que não renda acima dela. O que parecia uma reserva sólida há cinco anos compra menos hoje. O patrimônio 'seguro' que não trabalha não está só deixando de crescer: em termos reais, está diminuindo.",
  },
  {
    h: "O imóvel quitado: conquista real, âncora silenciosa",
    p: "Quitar o imóvel é, para muitos, o símbolo máximo de estabilidade — uma conquista legítima. Mas vale separar o valor emocional do financeiro. Um imóvel quitado que não gera renda é capital concentrado e imóvel: um único ativo, num único lugar, sem liquidez e sem retorno. Protege contra uma coisa e expõe a outra. Reconhecer isso não diminui a conquista — abre a possibilidade de fazê-la render mais.",
  },
  {
    h: "Alavancagem não é dívida imprudente",
    p: "Aqui está a distinção que separa quem multiplica patrimônio de quem apenas o preserva. No imaginário comum, alavancar é se endividar — arriscado, a se evitar. Mas há uma diferença enorme entre dívida especulativa e alavancagem estruturada sobre ativos que já existem. A primeira aposta no que não se tem. A segunda coloca para trabalhar o que já foi construído, de forma planejada e conservadora. É exatamente a ferramenta que famílias e empresários patrimonializados usam há gerações — e que raramente é explicada a quem está fora desse círculo.",
  },
  {
    h: "Existe outro caminho",
    p: "Patrimônio parado pode virar capital produtivo sem especulação, sem venda de ativos e sem abrir mão da segurança. Existem instrumentos regulamentados que fazem exatamente isso, respeitando perfis conservadores. O primeiro passo não é decidir — é entender o que é possível. Se este artigo fez você olhar para o próprio patrimônio de outra forma, vale uma conversa. Sem custo, sem compromisso.",
  },
];

export default function ArtigoPatrimonio() {
  usePageMeta(
    "O custo invisível de deixar o patrimônio parado — Virta Capital",
    "Por que ativos quitados e dinheiro 'seguro' podem estar custando mais do que parecem.",
  );
  return (
    <Layout>
      <article className="px-6 lg:px-10 pt-36 pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-[11px] tracking-[0.25em] uppercase text-foreground/35 hover:text-[color:var(--gold)] transition-colors">
            ← Matérias
          </Link>
          <p className="mt-8 text-[12px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
            Patrimônio · Estratégia
          </p>
          <h1 className="mt-6 font-display text-3xl md:text-5xl font-light leading-[1.15]">
            O custo invisível de deixar o patrimônio parado
          </h1>
          <p className="mt-6 text-[17px] text-foreground/55 leading-relaxed">
            Por que ativos quitados e dinheiro 'seguro' podem estar custando mais do que parecem.
          </p>
          <div className="mt-14 flex flex-col gap-8 text-[17px] leading-[1.85] text-foreground/75">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl md:text-3xl font-light mt-4 mb-4">{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
            <div className="mt-16 pt-10" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
              <Link to="/contato" className="inline-flex items-center text-[13px] tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
                Conversar com um especialista →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
