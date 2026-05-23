import { Link, useSearchParams } from "react-router-dom";
import { Layout, PageHero } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";

const articles = [
  {
    slug: "/blog/patrimonio-parado",
    tag: "Patrimônio · Estratégia",
    title: "O custo invisível de deixar o patrimônio parado",
    excerpt: "Por que ativos quitados e dinheiro "seguro" podem estar custando mais do que parecem.",
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "/blog/medico",
    tag: "Patrimônio · Profissionais liberais",
    title: "O médico que dedicou a vida à medicina — e ainda assim pode não conseguir se aposentar bem",
    excerpt: "Uma análise honesta sobre a jornada financeira do médico brasileiro e o que é possível fazer diferente.",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "/blog/empresario",
    tag: "Patrimônio · Empresários",
    title: "O empresário que tem tudo na empresa — e pouco fora dela",
    excerpt: "Por que crescimento de negócio nem sempre vira patrimônio pessoal — e o que fazer a respeito.",
    readTime: "4 min",
    featured: false,
  },
];

export default function Blog() {
  usePageMeta("Matérias — Virta Capital", "Conteúdo sobre patrimônio e alavancagem.");
  const [searchParams] = useSearchParams();
  const obrigado = searchParams.get("obrigado") === "1";

  const featured = articles.find((a) => a.featured)!;
  const grid = articles.filter((a) => !a.featured);

  return (
    <Layout>
      {obrigado && (
        <div
          className="px-6 lg:px-10 py-6 text-center"
          style={{ background: "rgba(155,126,78,0.08)", borderBottom: "0.5px solid var(--border-gold)" }}
        >
          <p className="text-[13px] tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
            Mensagem recebida
          </p>
          <p className="mt-2 text-[15px] text-foreground/70">
            Recebemos seus dados. Everton entrará em contato em até 1 dia útil.
          </p>
        </div>
      )}

      <PageHero eyebrow="Matérias" title="Conteúdo sobre patrimônio e alavancagem" />

      <section
        className="px-6 lg:px-10 py-16 md:py-24"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-6xl flex flex-col gap-12">

          {/* Destaque */}
          <Link
            to={featured.slug}
            className="group block"
            style={{ border: "0.5px solid var(--border-gold)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Painel visual */}
              <div
                className="h-48 md:h-auto min-h-[220px] relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a1a18 0%, #0d0d0c 100%)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
                    <path d="M10 50C25 50 30 15 45 15C60 15 65 50 80 50C95 50 100 32 115 32H170" stroke="#E8E0D0" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="170" cy="32" r="5" fill="#B87333"/>
                  </svg>
                </div>
                <div
                  className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase px-2 py-1"
                  style={{ color: "var(--gold)", border: "0.5px solid var(--border-gold)" }}
                >
                  Destaque
                </div>
              </div>
              {/* Conteúdo */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
                    {featured.tag}
                  </p>
                  <h2 className="mt-4 font-display text-2xl md:text-3xl font-light leading-snug group-hover:text-[color:var(--gold-light)] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[14px] text-foreground/50 leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span
                    className="text-[12px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--gold)" }}
                  >
                    Ler matéria →
                  </span>
                  <span className="text-[11px] text-foreground/30">{featured.readTime} de leitura</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid 2 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grid.map((art) => (
              <Link
                key={art.slug}
                to={art.slug}
                className="group flex flex-col"
                style={{ border: "0.5px solid var(--border-gold)" }}
              >
                {/* Painel visual */}
                <div
                  className="h-36 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1a1a18 0%, #0d0d0c 100%)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-8">
                    <svg width="120" height="55" viewBox="0 0 120 55" fill="none">
                      <path d="M8 35C18 35 22 10 30 10C38 10 42 35 52 35C62 35 66 22 74 22H112" stroke="#E8E0D0" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="112" cy="22" r="3.5" fill="#B87333"/>
                    </svg>
                  </div>
                </div>
                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
                    {art.tag}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-light leading-snug group-hover:text-[color:var(--gold-light)] transition-colors flex-1">
                    {art.title}
                  </h3>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[12px] tracking-[0.2em] uppercase" style={{ color: "var(--gold)" }}>
                      Ler matéria →
                    </span>
                    <span className="text-[11px] text-foreground/30">{art.readTime} de leitura</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </Layout>
  );
}
