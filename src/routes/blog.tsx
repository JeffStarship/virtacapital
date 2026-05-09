import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/Layout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Virta Capital" },
      {
        name: "description",
        content:
          "O médico que dedicou a vida à medicina — e ainda assim pode não conseguir se aposentar bem.",
      },
      { property: "og:title", content: "Blog — Virta Capital" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <Layout>
      <PageHero
        eyebrow="Blog"
        title="Conteúdo sobre patrimônio e alavancagem"
      />

      <article
        className="px-6 lg:px-10 py-20 md:py-28"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
            Patrimônio · Profissionais liberais
          </p>
          <h2 className="mt-6 font-display text-3xl md:text-5xl font-light leading-[1.15]">
            O médico que dedicou a vida à medicina — e ainda assim pode não conseguir se aposentar bem
          </h2>
          <p className="mt-6 text-[11px] tracking-wider text-foreground/35 uppercase">
            Tempo de leitura · 6 min
          </p>

          <div className="mt-14 flex flex-col gap-7 text-[15px] leading-[1.85] text-foreground/75">
            <p>
              Existe uma imagem cristalizada no imaginário brasileiro: a do médico bem-sucedido,
              estável, financeiramente tranquilo. Uma imagem que parece justa diante do esforço
              envolvido. Mas ela esconde uma realidade que muitos profissionais da medicina só
              percebem tarde demais — quando o tempo de carreira já passou e o patrimônio
              construído não corresponde ao tamanho do trabalho que foi entregue.
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-light mt-6">
              Uma década estudando antes de gerar renda
            </h3>
            <p>
              A jornada começa cedo, mas a renda chega tarde. São seis anos de graduação, dois a
              três de residência, mais especializações, fellowships, cursos no exterior. Antes de
              completar trinta anos, muitos médicos somam mais de uma década de dedicação integral
              — e, em grande parte desse período, com renda baixa ou inexistente.
            </p>
            <p>
              Enquanto colegas de outras áreas começam a investir aos 23, 24 anos, o médico
              brasileiro frequentemente só consegue pensar em patrimônio depois dos 32, 33. É uma
              década inteira de juros compostos perdida — e essa diferença, no longo prazo, é
              brutal.
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-light mt-6">
              Construir carreira é empreender — sem nunca ter aprendido como
            </h3>
            <p>
              Depois vem a fase de montar a carreira de verdade. Abrir clínica, virar sócio,
              estruturar consultório próprio. E aqui surge um paradoxo silencioso: o médico foi
              treinado para salvar vidas, não para gerir um negócio. Mas, da noite para o dia,
              precisa lidar com contratos de planos de saúde, folha de pagamento, custos fixos
              altíssimos, marketing, impostos, conformidade.
            </p>
            <p>
              É um aprendizado feito na marra, no susto, geralmente caro. Muitos profissionais
              passam anos remando contra a corrente até começar a gerar lucro de verdade — e
              quando isso acontece, a relação com o dinheiro já foi marcada por escolhas
              defensivas, conservadoras demais ou simplesmente equivocadas.
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-light mt-6">
              Renda alta não é o mesmo que patrimônio
            </h3>
            <p>
              Existe uma confusão comum entre renda e patrimônio. Renda é o quanto entra por mês.
              Patrimônio é o que sobra trabalhando para você no longo prazo. E o Brasil é um país
              onde transformar renda em patrimônio é especialmente difícil — pelos juros reais
              altos, pela carga tributária, pela inflação que corrói rendimentos conservadores e
              pela cultura do imóvel parado como sinônimo de segurança.
            </p>
            <p>
              O resultado é um padrão que se repete: profissionais que faturam muito, mas cujo
              patrimônio não trabalha. Imóveis que ficam vazios meses por ano. Dinheiro em
              poupança rendendo abaixo da inflação real. Investimentos conservadores demais para o
              horizonte de tempo que ainda existe pela frente.
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-light mt-6">
              A formação médica não inclui educação financeira
            </h3>
            <p>
              Em nenhum momento da formação acadêmica do médico há disciplinas de finanças
              pessoais, gestão patrimonial ou planejamento de aposentadoria. O profissional que
              dedicou anos a entender o corpo humano em profundidade chega ao mercado sem nenhuma
              base sobre como o seu próprio dinheiro deveria funcionar.
            </p>
            <p>
              Isso explica por que tantas decisões patrimoniais são tomadas no impulso, no
              conselho do amigo, na dica do gerente do banco. E explica também por que tantos
              acabam dependentes de produtos que rendem para a instituição financeira, não para
              eles.
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-light mt-6">
              As armadilhas mais comuns
            </h3>
            <p>
              Imóveis comprados como reserva de valor que nunca chegam a gerar fluxo de caixa.
              Aplicações conservadoras demais para o tempo que ainda há até a aposentadoria.
              Dinheiro parado em conta corrente porque "ainda não decidi o que fazer". Vendas de
              ativos no momento errado, por necessidade de liquidez. São padrões silenciosos que,
              somados ao longo de duas décadas, transformam uma carreira de altíssima performance
              em uma aposentadoria apertada.
            </p>

            <h3 className="font-display text-2xl md:text-3xl font-light mt-6">
              Existe outro caminho
            </h3>
            <p>
              A boa notícia é que o patrimônio já construído pode trabalhar de forma muito mais
              inteligente — sem especulação, sem produtos exóticos, sem abrir mão da segurança que
              o perfil médico naturalmente exige. Não se trata de assumir mais risco, e sim de
              fazer o capital que está parado deixar de estar parado.
            </p>
            <p>
              Estruturas patrimoniais que utilizam ativos já existentes como base de alavancagem
              real — operadas dentro de instituições regulamentadas, com previsibilidade — abrem
              uma porta que poucos profissionais conhecem. É menos sobre rentabilidade agressiva e
              mais sobre eficiência: extrair de cada peça do patrimônio o que ela realmente pode
              entregar.
            </p>
            <p>
              Para quem dedicou a vida a cuidar dos outros, faz sentido que o próprio patrimônio
              receba o mesmo nível de atenção. Não como urgência, mas como uma decisão consciente
              — antes que o tempo deixe de ser um aliado.
            </p>

            <div
              className="mt-16 pt-10"
              style={{ borderTop: "0.5px solid var(--border-gold)" }}
            >
              <p className="text-[13px] text-foreground/50 leading-relaxed">
                Se este texto fez sentido para o seu momento, vale uma conversa.{" "}
                <Link
                  to="/contato"
                  className="text-[color:var(--gold)] hover:text-[color:var(--gold-light)]"
                >
                  Falar com um especialista →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
