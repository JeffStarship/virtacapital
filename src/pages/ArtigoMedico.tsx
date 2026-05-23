import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";

const sections = [
  { h: "Uma década estudando antes de gerar renda", p: "O médico brasileiro começa sua jornada profissional mais tarde do que qualquer outro profissional de alta renda. São quatro anos de graduação intensa, um ou dois anos de residência básica, e muitas vezes mais dois, três, quatro anos de especialização ou fellowship. Não é raro que um médico especialista comece a gerar renda real apenas aos 32, 33 anos de idade. Nesse período, além de não gerar renda, muitos ainda acumulam dívidas — financiamento de faculdade, custo de vida durante a residência, cursos e congressos. O ponto de partida financeiro é, estruturalmente, negativo." },
  { h: "Construir carreira é empreender — sem nunca ter aprendido como", p: "Depois de anos focados exclusivamente na medicina, a maioria dos médicos se vê diante de um desafio novo: montar e gerir uma clínica ou consultório. Isso significa lidar com alvará, contabilidade, folha de pagamento, fluxo de caixa, inadimplência de planos de saúde, gestão de equipe e precificação de serviços. Nada disso foi ensinado na faculdade. O médico aprende na prática, pagando o preço de erros que qualquer administrador evitaria. O resultado mais comum: renda alta no papel, mas margem real muito menor do que deveria ser." },
  { h: "Renda alta não é o mesmo que patrimônio", p: "Existe uma confusão muito comum: médico com renda alta automaticamente acumula patrimônio. Não é bem assim. Renda alta com gastos proporcionalmente altos — padrão de vida elevado, financiamentos, escola dos filhos, plano de saúde privado, carro, viagens — deixa uma margem de sobra menor do que parece. Somado ao começo tardio, o patrimônio líquido real de muitos médicos aos 45 anos é surpreendentemente baixo para o esforço acumulado." },
  { h: "A formação médica não inclui educação financeira", p: "Não é culpa do médico. A grade curricular dos cursos de medicina no Brasil não contempla nenhuma formação em finanças pessoais, investimentos ou gestão patrimonial. O resultado é que a maioria dos médicos chega à vida adulta financeiramente ativa sem ferramentas para tomar boas decisões de alocação. Os erros mais comuns: deixar dinheiro parado em conta corrente, investir apenas em poupança ou CDB de banco, comprar imóvel como único ativo e nunca rever essa estratégia." },
  { h: "As armadilhas mais comuns", p: "Imóvel parado sem gerar renda. Dinheiro no banco rendendo abaixo da inflação real. Dependência exclusiva de planos de saúde como fonte de receita. Ausência de previdência privada estruturada. Falta de diversificação. Cada um desses erros isolado já é um problema — combinados, criam um cenário onde mesmo um médico com 20 anos de carreira pode chegar à aposentadoria sem patrimônio suficiente para manter o padrão de vida que construiu." },
  { h: "Existe outro caminho", p: "A boa notícia é que patrimônio já construído — mesmo que esteja imobilizado — pode trabalhar de forma mais inteligente. Existem estratégias regulamentadas, seguras e acessíveis que permitem ao médico transformar ativos parados em capital produtivo, sem precisar vender imóvel, sem especulação e sem abrir mão da segurança que o perfil conservador exige. Se você se identificou com algum ponto deste artigo, vale uma conversa. Sem custo, sem compromisso." },
];

export default function ArtigoMedico() {
  usePageMeta("O médico que pode não conseguir se aposentar bem — Virta Capital", "Uma análise honesta sobre a jornada financeira do médico brasileiro.");
  return (
    <Layout>
      <article className="px-6 lg:px-10 pt-36 pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-[11px] tracking-[0.25em] uppercase text-foreground/35 hover:text-[color:var(--gold)] transition-colors">← Matérias</Link>
          <p className="mt-8 text-[12px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>Patrimônio · Profissionais liberais</p>
          <h1 className="mt-6 font-display text-3xl md:text-5xl font-light leading-[1.15]">O médico que dedicou a vida à medicina — e ainda assim pode não conseguir se aposentar bem</h1>
          <p className="mt-6 text-[17px] text-foreground/55 leading-relaxed">Uma análise honesta sobre a jornada financeira do médico brasileiro e o que é possível fazer diferente.</p>
          <div className="mt-14 flex flex-col gap-8 text-[17px] leading-[1.85] text-foreground/75">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl md:text-3xl font-light mt-4 mb-4">{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
            <div className="mt-16 pt-10" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
              <Link to="/contato" className="inline-flex items-center text-[13px] tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>Conversar com um especialista →</Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
