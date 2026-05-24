import { useState, useRef } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/seo";
import logo from "@/assets/virta-logo.svg";
import everton from "@/assets/everton.webp";
import canopusStar from "@/assets/canopus-star.png";

const WEBHOOK_URL = "https://n8n.virtacapital.com.br/webhook/virta-lead";

const formSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome"),
  email: z.string().trim().email("Email inválido"),
  whatsapp: z.string().trim().min(10, "WhatsApp inválido").max(20),
});

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Landing() {
  usePageMeta("Alavancagem Patrimonial — Virta Capital", "Transforme patrimônio parado em capital produtivo sem vender seus ativos.");

  const formRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rawWhatsapp = whatsapp.replace(/\D/g, "");
    const data = { nome: String(fd.get("nome") || ""), email: String(fd.get("email") || ""), whatsapp: rawWhatsapp };
    const result = formSchema.safeParse({ ...data, whatsapp: rawWhatsapp });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: data.nome, email: data.email, whatsapp: rawWhatsapp, origem: "Landing Page", origem_id: 34, origem_secundaria: "" }),
      });
    } catch (_) {}
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "#111110", color: "#E8E0D0", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Nav */}
      <header className="px-6 lg:px-10 py-4 flex items-center justify-between" style={{ borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <Link to="/"><img src={logo} alt="Virta Capital" className="h-20 md:h-24 w-auto" /></Link>
        <Link to="/contato" className="text-[11px] tracking-[0.2em] uppercase px-5 py-2" style={{ border: "0.5px solid var(--gold)", color: "var(--gold)" }}>
          Conversar
        </Link>
      </header>

      {/* HERO + FORMULÁRIO — acima da dobra */}
      <section ref={formRef} className="px-6 lg:px-10 py-14 md:py-20" style={{ borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Headline */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-5" style={{ color: "var(--gold)" }}>
              Estratégia Patrimonial · Virta Capital
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.1] mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Existe uma estratégia que investidores imobiliários usam para crescer patrimônio sem vender nada.<br />
              <em>A maioria nunca ouviu falar.</em>
            </h1>
            <p className="text-[15px] text-foreground/55 leading-relaxed">
              Não é bolsa. Não é crypto. Não é vender imóvel. É uma estrutura regulamentada pelo Banco Central que transforma patrimônio parado em capacidade real de expansão — com custo abaixo da inflação e sem sair do mercado imobiliário.
            </p>
          </div>

          {/* Formulário em destaque */}
          <div className="p-8 md:p-10" style={{ border: "0.5px solid rgba(155,126,78,0.4)", background: "rgba(155,126,78,0.04)" }}>
            {sent ? (
              <div className="text-center py-6">
                <p className="text-[12px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>Recebemos seus dados</p>
                <p className="font-display text-xl font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  Entraremos em contato em breve para apresentar a estratégia.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold)" }}>
                  Quero entender como funciona
                </p>
                <p className="text-[13px] text-foreground/40 mb-6 leading-relaxed">
                  Deixa seu contato e te explicamos a estratégia completa — sem enrolação.
                </p>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">Nome</span>
                    <input name="nome" type="text" required
                      className="bg-transparent px-4 py-3 text-[15px] outline-none text-foreground"
                      style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                    {errors.nome && <span className="text-[12px] text-red-400/70">{errors.nome}</span>}
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">Email</span>
                    <input name="email" type="email" required
                      className="bg-transparent px-4 py-3 text-[15px] outline-none text-foreground"
                      style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                    {errors.email && <span className="text-[12px] text-red-400/70">{errors.email}</span>}
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">WhatsApp</span>
                    <input type="tel" inputMode="numeric" required value={whatsapp}
                      onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                      placeholder="(48) 99999-9999"
                      className="bg-transparent px-4 py-3 text-[15px] outline-none text-foreground placeholder:text-foreground/20"
                      style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                    {errors.whatsapp && <span className="text-[12px] text-red-400/70">{errors.whatsapp}</span>}
                  </label>
                  <button type="submit" disabled={loading}
                    className="mt-2 py-4 text-[12px] tracking-[0.2em] uppercase disabled:opacity-50"
                    style={{ background: "var(--gold)", color: "#111110" }}>
                    {loading ? "Aguarde…" : "Quero ver a estratégia →"}
                  </button>
                </form>
                <p className="mt-3 text-[11px] text-foreground/25">Usamos seu contato apenas para enviar conteúdo relacionado.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ESSA ESTRATÉGIA É PARA QUEM... */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: "var(--gold)" }}>
            Essa estratégia é para quem…
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Tem 3 ou mais imóveis e sente que está pouco diversificado",
              "Compra imóveis abaixo do mercado, mas percebe que o capital fica travado",
              "Não gosta de bolsa, criptomoeda ou investimentos com alta volatilidade",
              "Tem patrimônio, mas sente dificuldade de acelerar sem aumentar risco",
              "Guarda dinheiro parado por segurança, mas sabe que poderia fazer mais",
              "Quer continuar no mercado imobiliário só que com mais inteligência",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 py-4 px-5" style={{ border: "0.5px solid rgba(180,150,90,0.12)" }}>
                <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--gold)" }}>✓</span>
                <span className="text-[15px] text-foreground/70">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={scrollToForm} className="px-10 py-4 text-[12px] tracking-[0.2em] uppercase" style={{ border: "0.5px solid var(--gold)", color: "var(--gold)" }}>
              Quero entender a estratégia ↑
            </button>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI APRENDER */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: "var(--gold)" }}>
            O que você vai entender aqui dentro
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Liquidez sem vender imóveis", d: "Como investidores imobiliários estão acessando liquidez sem precisar se desfazer dos próprios ativos." },
              { t: "Expansão de patrimônio", d: "Como transformar patrimônio parado em capacidade real de expansão — sem especulação e sem apostas." },
              { t: "Crescer no mercado imobiliário", d: "Como crescer continuando no mercado imobiliário sem depender apenas da valorização do imóvel." },
            ].map((item) => (
              <div key={item.t} className="p-6 flex flex-col gap-4" style={{ border: "0.5px solid rgba(180,150,90,0.12)" }}>
                <h3 className="font-display text-xl font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.t}</h3>
                <p className="text-[14px] text-foreground/50 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={scrollToForm} className="px-10 py-4 text-[12px] tracking-[0.2em] uppercase" style={{ background: "var(--gold)", color: "#111110" }}>
              Quero ver a estratégia →
            </button>
          </div>
        </div>
      </section>

      {/* EVERTON */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <img src={everton} alt="Virta Capital" className="w-28 h-28 object-cover rounded-full opacity-90 flex-shrink-0" />
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)" }}>Virta Capital</p>
            <p className="text-[15px] text-foreground/60 leading-relaxed max-w-2xl">
              Há mais de 11 anos ajudando investidores e empresários a estruturarem crescimento patrimonial com segurança, liquidez e inteligência. Especialistas em estratégias de alavancagem patrimonial para quem quer expandir sem depender da bolsa, da volatilidade do mercado financeiro ou da venda dos próprios ativos.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={canopusStar} alt="Canopus" className="h-6 w-6 opacity-60" />
          <span className="text-[11px] text-foreground/30 tracking-[0.15em] uppercase">Regulamentado pelo Banco Central · Virta Capital</span>
        </div>
        <Link to="/" className="text-[11px] text-foreground/30 hover:text-foreground/60 transition-colors">virtacapital.com.br</Link>
      </footer>
    </div>
  );
}
