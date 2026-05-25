import { useState, useRef } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { usePageMeta } from "@/lib/seo";
import logo from "@/assets/virta-logo.svg";
import canopusStar from "@/assets/canopus-star.png";

const WEBHOOK_URL = "https://n8n.virtacapital.com.br/webhook/virta-lead";

const formSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").refine((v) => v.trim().split(/\s+/).length >= 2, "Informe nome e sobrenome"),
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

export default function LpCalculadora() {
  usePageMeta(
    "Calculadora de Renda Passiva — Virta Capital",
    "Descubra o número real que separa o seu patrimônio atual da renda que vai sustentar o seu padrão de vida."
  );

  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rawWhatsapp = whatsapp.replace(/\D/g, "");
    const whatsappComZero = rawWhatsapp.startsWith("0") ? rawWhatsapp : "0" + rawWhatsapp;
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
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          whatsapp: whatsappComZero,
          origem: "Landing Page",
          origem_id: 34,
          origem_secundaria: "Calculadora",
        }),
      });
    } catch (_) {}
    setLoading(false);
    // Redireciona para a calculadora já desbloqueada, levando o email
    navigate("/calculadora", { state: { unlocked: true, email: data.email } });
  };

  const gold = "var(--gold)";
  const border = "0.5px solid rgba(180,150,90,0.12)";
  const serif = { fontFamily: "Cormorant Garamond, serif" };

  return (
    <div className="min-h-screen" style={{ background: "#111110", color: "#E8E0D0", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* Nav */}
      <header className="px-6 lg:px-10 py-4 flex items-center justify-between" style={{ borderBottom: border }}>
        <Link to="/"><img src={logo} alt="Virta Capital" className="h-20 md:h-24 w-auto" /></Link>
        <Link to="/contato" className="text-[11px] tracking-[0.2em] uppercase px-5 py-2" style={{ border: "0.5px solid var(--gold)", color: gold }}>
          Conversar
        </Link>
      </header>

      {/* HERO + FORMULÁRIO */}
      <section ref={formRef} className="px-6 lg:px-10 py-14 md:py-20" style={{ borderBottom: border }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-5" style={{ color: gold }}>
              Calculadora de Renda Passiva · Virta Capital
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.1] mb-6" style={serif}>
              Você sabe quanto realmente precisa para parar de trabalhar — e manter o seu padrão de vida?<br />
              <em>Quase ninguém sabe. E é por isso que quase ninguém chega lá.</em>
            </h1>
            <p className="text-[15px] text-foreground/55 leading-relaxed">
              A maioria dos profissionais bem-sucedidos calcula a aposentadoria com o número errado — esquecem que a inflação vai corroer o poder de compra do dinheiro ao longo das próximas décadas. Em 2 minutos, você vai ver o número real: quanto de patrimônio e quanto de aporte mensal te separam da independência financeira.
            </p>
          </div>

          {/* Formulário */}
          <div className="p-8 md:p-10" style={{ border: "0.5px solid rgba(155,126,78,0.4)", background: "rgba(155,126,78,0.04)" }}>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: gold }}>
              Acessar a calculadora
            </p>
            <p className="text-[13px] text-foreground/40 mb-6 leading-relaxed">
              Informe seus dados para liberar o cálculo. Leva menos de 2 minutos.
            </p>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">Nome completo</span>
                <input name="nome" type="text" required
                  className="bg-transparent px-4 py-3 text-[15px] outline-none text-foreground"
                  style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                {errors.nome && <span className="text-[12px]" style={{ color: "rgba(155,126,78,0.8)" }}>{errors.nome}</span>}
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">Email</span>
                <input name="email" type="email" required
                  className="bg-transparent px-4 py-3 text-[15px] outline-none text-foreground"
                  style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                {errors.email && <span className="text-[12px]" style={{ color: "rgba(155,126,78,0.8)" }}>{errors.email}</span>}
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">WhatsApp</span>
                <input type="tel" inputMode="numeric" required value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                  placeholder="(48) 99999-9999"
                  className="bg-transparent px-4 py-3 text-[15px] outline-none text-foreground placeholder:text-foreground/20"
                  style={{ border: "0.5px solid rgba(155,126,78,0.6)" }} />
                {errors.whatsapp && <span className="text-[12px]" style={{ color: "rgba(155,126,78,0.8)" }}>{errors.whatsapp}</span>}
              </label>
              <button type="submit" disabled={loading}
                className="mt-2 py-4 text-[12px] tracking-[0.2em] uppercase disabled:opacity-50"
                style={{ background: gold, color: "#111110" }}>
                {loading ? "Liberando…" : "Calcular meu número real →"}
              </button>
            </form>
            <p className="mt-3 text-[11px] text-foreground/25">Seus dados são tratados com confidencialidade.</p>
          </div>
        </div>
      </section>

      {/* O ERRO QUE CUSTA CARO */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: border }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-8" style={{ color: gold }}>
            O erro silencioso
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light leading-tight mb-8" style={serif}>
            "R$ 5 milhões parecem suficientes. Até você descobrir o que a inflação faz com esse número em 20 anos."
          </h2>
          <p className="text-[15px] text-foreground/55 leading-relaxed mb-5">
            A conta que a maioria faz é simples e errada: pega o patrimônio atual, aplica a uma taxa e imagina a renda mensal. O problema é que ela ignora a variável que destrói mais riqueza no Brasil — a inflação ao longo do tempo. O que hoje compra um padrão de vida confortável, daqui a duas décadas compra menos da metade.
          </p>
          <p className="text-[15px] text-foreground/55 leading-relaxed">
            A calculadora corrige isso. Ela projeta o seu número real considerando o IPCA histórico, mostra o patrimônio-alvo que você precisa acumular e o aporte mensal necessário para chegar lá com segurança — sem ilusão, sem otimismo de planilha.
          </p>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: border }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: gold }}>
            Para quem essa conta importa de verdade
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "O empresário",
                d: "Construiu valor dentro da empresa, mas tem pouco fora dela. Sabe que o negócio não é aposentadoria — e que precisa de um patrimônio que trabalhe independente da operação.",
              },
              {
                t: "O médico",
                d: "Dedicou a vida à profissão e fatura bem. Mas a renda para no dia em que o atendimento para. Precisa transformar o alto rendimento de hoje em renda passiva de amanhã.",
              },
              {
                t: "O profissional liberal",
                d: "Tem ótimos anos de faturamento, mas a renda depende inteiramente do próprio trabalho. Quer saber exatamente quanto acumular para um dia escolher trabalhar — não precisar.",
              },
            ].map((p) => (
              <div key={p.t} className="p-7 flex flex-col gap-4" style={{ border: border }}>
                <h3 className="font-display text-2xl font-light" style={serif}>{p.t}</h3>
                <p className="text-[14px] text-foreground/50 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE A CALCULADORA REVELA */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: border }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-10" style={{ color: gold }}>
            Em 2 minutos você descobre
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Seu número real", d: "A renda mensal que você precisará receber no futuro para manter, em poder de compra, o padrão que tem hoje." },
              { n: "02", t: "Patrimônio-alvo", d: "Quanto de patrimônio você precisa acumular para que ele gere essa renda sem você precisar consumi-lo." },
              { n: "03", t: "Aporte mensal", d: "Quanto investir por mês, a partir de hoje, para chegar lá dentro do seu prazo — com consistência, não com sorte." },
            ].map((item) => (
              <div key={item.n} className="p-7 flex flex-col gap-3" style={{ border: border }}>
                <span className="font-display text-3xl" style={{ ...serif, color: gold }}>{item.n}</span>
                <h3 className="font-display text-xl font-light" style={serif}>{item.t}</h3>
                <p className="text-[14px] text-foreground/50 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={scrollToForm} className="px-10 py-4 text-[12px] tracking-[0.2em] uppercase" style={{ background: gold, color: "#111110" }}>
              Calcular meu número real →
            </button>
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="px-6 lg:px-10 py-16 md:py-20" style={{ borderBottom: border }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-5" style={{ color: gold }}>Virta Capital</p>
          <p className="font-display text-2xl md:text-3xl font-light leading-snug" style={serif}>
            Estruturamos crescimento patrimonial para quem leva o próprio futuro a sério — com método, e não com promessas.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={canopusStar} alt="Virta Capital" className="h-6 w-6 opacity-60" />
          <span className="text-[11px] text-foreground/30 tracking-[0.15em] uppercase">Regulamentado pelo Banco Central · Virta Capital</span>
        </div>
        <Link to="/" className="text-[11px] text-foreground/30 hover:text-foreground/60 transition-colors">virtacapital.com.br</Link>
      </footer>
    </div>
  );
}
