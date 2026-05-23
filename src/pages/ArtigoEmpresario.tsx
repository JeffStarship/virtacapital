import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";

const sections = [
  { h: "A empresa cresceu. O patrimônio pessoal, nem tanto.", p: "Quem empreende com seriedade desenvolve um reflexo: todo lucro volta para o negócio. Máquina, estoque, contratação, nova unidade. Por anos, isso é o certo — é assim que uma empresa cresce. O problema aparece quando esse reflexo nunca é interrompido. O dono olha o faturamento, vê números expressivos e conclui que está construindo patrimônio. Mas faturamento não é patrimônio, e empresa capitalizada não é o mesmo que pessoa física protegida. Depois de quinze ou vinte anos, é comum descobrir uma empresa valiosa ao lado de uma vida financeira pessoal surpreendentemente exposta." },
  { h: "Liquidez é diferente de patrimônio", p: "Ter patrimônio não significa ter liquidez. O empresário pode ter uma empresa avaliada em milhões e não conseguir acessar uma reserva pessoal relevante sem descapitalizar o negócio. O capital de giro engole as sobras, o lucro é reinvestido, e o caixa pessoal vive mais apertado do que o porte da empresa sugere. No papel, é rico. Na prática, tem pouca margem de manobra." },
  { h: "O risco de ter tudo em um só lugar", p: "Concentração é o risco que o empresário bem-sucedido subestima justamente porque deu certo até aqui. Quando quase todo o patrimônio está dentro de uma única empresa, num único setor, a exposição é alta. Uma mudança regulatória, a perda de um cliente grande, uma crise setorial, um problema de saúde do próprio dono — qualquer um atinge ao mesmo tempo a fonte de renda e a reserva de valor. Diversificar não é desconfiar do próprio negócio. É reconhecer que nenhum ativo deveria carregar 100% do peso." },
  { h: "Ativos parados que poderiam trabalhar", p: "Ao longo do tempo o empresário acumula ativos que simplesmente param: o galpão quitado, a sala comercial, o imóvel pessoal, o terreno comprado \"para garantir\", recursos retidos em conta. Cada um é capital imobilizado — valor real que existe, mas não gera retorno proporcional ao que poderia. Conquistas legítimas, estacionadas." },
  { h: "As armadilhas mais comuns", p: "Misturar pessoa física e jurídica até não saber o que é de quem. Deixar lucro parado rendendo abaixo da inflação. Nunca estruturar uma reserva pessoal independente do negócio. Não pensar em proteção nem em sucessão. Tratar o imóvel quitado como ponto final, quando poderia ser ponto de partida. Isoladas, são decisões compreensíveis. Somadas, deixam o empresário muito mais vulnerável do que o sucesso aparente indica." },
  { h: "Existe outro caminho", p: "O patrimônio que o empresário já construiu — inclusive o imobilizado — pode trabalhar de forma mais inteligente sem vender ativos nem descapitalizar a empresa. Existem estratégias regulamentadas e conservadoras que transformam patrimônio parado em capital produtivo, respeitando o perfil de quem não quer especular. Se algum ponto soou familiar, vale uma conversa. Sem custo, sem compromisso." },
];

export default function ArtigoEmpresario() {
  usePageMeta("O empresário que tem tudo na empresa — Virta Capital", "Por que crescimento de negócio nem sempre vira patrimônio pessoal.");
  return (
    <Layout>
      <article className="px-6 lg:px-10 pt-36 pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-[11px] tracking-[0.25em] uppercase text-foreground/35 hover:text-[color:var(--gold)] transition-colors">← Matérias</Link>
          <p className="mt-8 text-[12px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>Patrimônio · Empresários</p>
          <h1 className="mt-6 font-display text-3xl md:text-5xl font-light leading-[1.15]">O empresário que tem tudo na empresa — e pouco fora dela</h1>
          <p className="mt-6 text-[17px] text-foreground/55 leading-relaxed">Por que crescimento de negócio nem sempre vira patrimônio pessoal — e o que fazer a respeito.</p>
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
