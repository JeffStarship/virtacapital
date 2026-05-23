import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/seo";
import logo from "@/assets/virta-logo.svg";
import everton from "@/assets/everton.webp";
import canopusStar from "@/assets/canopus-star.png";

const WEBHOOK_URL = "https://n8n.virtacapital.com.br/webhook/virta-lead";

const formSchema = z.object({
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

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rawWhatsapp = whatsapp.replace(/\D/g, "");
    const data = { email: String(fd.get("email") || ""), whatsapp: rawWhatsapp };
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
        body: JSON.stringify({ nome: "", email: data.email, whatsapp: rawWhatsapp, origem: "Landing Page", origem_id: 34, origem_secundaria: "" }),
      });
    } catch (_) {}
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "#111110", color: "#E8E0D0", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Nav mínimo */}
      <header className="px-6 lg:px-10 py-6 flex items-center justify-between" style={{ borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <Link to="/"><img src={logo} alt="Virta Capital" className="h-12 w-auto" /></Link>
        <Link to="/contato" className="text-[12px] tracking-[0.2em] uppercase px-5 py-2" style={{ border: "0.5px solid var(--gold)", color: "var(--gold)" }}>
          Conversar
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 lg:px-10 py-20 md:py-32 max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.35em] uppercase mb-6" style={{ color: "var(--gold)" }}>
          Alavancagem Patrimonial · Consórcio Canopus
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.1]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Você construiu patrimônio.<br />
          <em>Agora faça ele trabalhar por você.</em>
        </h1>
        <p className="mt-8 text-[17px] text-foreground/55 leading-relaxed max-w-2xl">
          A estratégia usada por investidores e empresários para transformar imóveis e capital parado em liquidez inteligente — sem vender patrimônio, sem depender da bolsa.
        </p>

        {/* Checkmarks */}
        <div className="mt-10 flex flex-col gap-3">
          {[
            "Tem imóveis quitados ou capital parado",
            "Quer crescer sem aumentar risco",
            "Não gosta de bolsa, cripto ou alta volatilidade",
            "Quer continuar no mercado imobiliário com mais inteligência",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ color: "var(--gold)" }}>✓</div>
              <span className="text-[15px] text-foreground/70">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* O que você vai entender */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderTop: "0.5px solid rgba(180,150,90,0.12)", borderBottom: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: "var(--gold)" }}>O que você vai entender</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Liquidez sem vender imóveis", d: "Como acessar capital usando seus próprios ativos como base, sem precisar se desfazer deles." },
              { t: "Expansão de patrimônio", d: "Como transformar capital parado em capacidade real de expansão patrimonial." },
              { t: "Crescer sem depender de valorização", d: "Como avançar no mercado imobiliário independente de ciclos de alta ou baixa." },
            ].map((item) => (
              <div key={item.t} className="flex flex-col gap-4 p-6" style={{ border: "0.5px solid rgba(180,150,90,0.12)" }}>
                <h3 className="font-display text-xl font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.t}</h3>
                <p className="text-[14px] text-foreground/50 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          {sent ? (
            <div className="p-10" style={{ border: "0.5px solid rgba(180,150,90,0.2)" }}>
              <p className="text-[12px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>Recebemos seus dados</p>
              <p className="font-display text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Everton entrará em contato em breve para apresentar a estratégia.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[11px] tracking-[0.35em] uppercase mb-6" style={{ color: "var(--gold)" }}>Quero entender a estratégia</p>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Informe seus dados e entraremos em contato
              </h2>
              <form onSubmit={onSubmit} className="flex flex-col gap-5 text-left">
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">Email</span>
                  <input name="email" type="email" required
                    className="bg-transparent px-4 py-3 text-[16px] outline-none text-foreground"
                    style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                  {errors.email && <span className="text-[12px] text-red-400/70">{errors.email}</span>}
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">WhatsApp</span>
                  <input type="tel" inputMode="numeric" required value={whatsapp}
                    onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                    placeholder="(48) 99999-9999"
                    className="bg-transparent px-4 py-3 text-[16px] outline-none text-foreground placeholder:text-foreground/20"
                    style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                  {errors.whatsapp && <span className="text-[12px] text-red-400/70">{errors.whatsapp}</span>}
                </label>
                <button type="submit" disabled={loading}
                  className="mt-2 py-4 text-[13px] tracking-[0.2em] uppercase disabled:opacity-50"
                  style={{ background: "var(--gold)", color: "#111110" }}>
                  {loading ? "Aguarde…" : "Quero ver a estratégia →"}
                </button>
              </form>
              <p className="mt-4 text-[11px] text-foreground/25">Seus dados são utilizados apenas para envio do material.</p>
            </>
          )}
        </div>
      </section>

      {/* Everton */}
      <section className="px-6 lg:px-10 py-16" style={{ borderTop: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <img src={everton} alt="Everton Rossi" className="w-28 h-28 object-cover rounded-full opacity-90 flex-shrink-0" />
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold)" }}>Everton Rossi</p>
            <p className="text-[15px] text-foreground/60 leading-relaxed max-w-2xl">
              Há mais de 11 anos ajudando investidores e empresários a estruturarem crescimento patrimonial com segurança, liquidez e inteligência. Especialista em alavancagem patrimonial para quem quer expandir sem depender da bolsa ou da venda dos próprios ativos.
            </p>
          </div>
        </div>
      </section>

      {/* Footer mínimo */}
      <footer className="px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "0.5px solid rgba(180,150,90,0.12)" }}>
        <div className="flex items-center gap-3">
          <img src={canopusStar} alt="Canopus" className="h-6 w-6 opacity-60" />
          <span className="text-[11px] text-foreground/30 tracking-[0.15em] uppercase">Parceiro Canopus · Regulamentado pelo Banco Central</span>
        </div>
        <Link to="/" className="text-[11px] text-foreground/30 hover:text-foreground/60 transition-colors">virtacapital.com.br</Link>
      </footer>
    </div>
  );
}
