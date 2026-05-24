import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Layout, PageHero } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";

const WEBHOOK_URL = "https://n8n.virtacapital.com.br/webhook/virta-lead";

const formSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  whatsapp: z.string().trim().min(10, "WhatsApp inválido").max(20),
});

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatRenda(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10);
  return num.toLocaleString("pt-BR");
}

function fmt(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function CalcWidget() {
  const SELIC = 9.2;
  const IPCA = 5.8;
  const realRate = ((1 + SELIC / 100) / (1 + IPCA / 100) - 1) * 100;

  const [renda, setRenda] = useState("");
  const [prazo, setPrazo] = useState(20);
  const [rentMensal, setRentMensal] = useState(0.75);
  const [rentMensalStr, setRentMensalStr] = useState("0.75");
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<null | {
    nominalRenda: number;
    patrimonioAlvo: number;
    aportesMensal: number;
    fatorInflacao: number;
    poderPerdido: number;
  }>(null);

  const calcular = () => {
    const rendaNum = parseInt(renda.replace(/\D/g, ""), 10) || 0;
    if (!rendaNum || !prazo || !rentMensal) return;
    const meses = prazo * 12;
    const fatorInflacao = Math.pow(1 + IPCA / 100, prazo);
    const nominalRenda = rendaNum * fatorInflacao;
    const taxaRetirada = (realRate / 100) / 12;
    const patrimonioAlvo = taxaRetirada > 0 ? nominalRenda / taxaRetirada : nominalRenda * 300;
    const rentNum = rentMensal / 100;
    const aportesMensal = (patrimonioAlvo * rentNum) / (Math.pow(1 + rentNum, meses) - 1);
    const poderPerdido = (1 - 1 / fatorInflacao) * 100;
    setResult({ nominalRenda, patrimonioAlvo, aportesMensal, fatorInflacao, poderPerdido });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Entradas */}
      <div className="p-8 md:p-10" style={{ border: "0.5px solid var(--border-gold)" }}>
        <p className="text-[11px] tracking-[0.3em] uppercase mb-8" style={{ color: "var(--gold)" }}>
          01 — Defina seu objetivo
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Renda com prefixo R$ */}
          <label className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">
              Renda mensal que quer ter na aposentadoria
            </span>
            <div className="flex items-center" style={{ border: "0.5px solid var(--gold)" }}>
              <span className="px-4 py-3 text-[15px] text-foreground/40 border-r flex-shrink-0" style={{ borderRight: "0.5px solid var(--gold)" }}>
                R$
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={renda}
                onChange={(e) => setRenda(formatRenda(e.target.value))}
                placeholder="10.000"
                className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none w-full placeholder:text-foreground/20"
              />
            </div>
          </label>

          {/* Prazo com stepper customizado */}
          <label className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">
              Quantos anos até se aposentar?
            </span>
            <div className="flex items-center" style={{ border: "0.5px solid var(--gold)" }}>
              <input
                type="number"
                value={prazo}
                onChange={(e) => setPrazo(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                min="1" max="50"
                className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="flex flex-col border-l flex-shrink-0" style={{ borderLeft: "0.5px solid var(--gold)" }}>
                <button
                  type="button"
                  onClick={() => setPrazo((p) => Math.min(50, p + 1))}
                  className="px-3 py-1 text-foreground/50 hover:text-[color:var(--gold)] transition-colors text-[11px] leading-none border-b"
                  style={{ borderBottom: "0.5px solid var(--gold)" }}
                >▲</button>
                <button
                  type="button"
                  onClick={() => setPrazo((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 text-foreground/50 hover:text-[color:var(--gold)] transition-colors text-[11px] leading-none"
                >▼</button>
              </div>
            </div>
          </label>

          {/* Rentabilidade com explicação */}
          <label className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">
              Rentabilidade mensal dos seus investimentos (%)
            </span>
            <span className="text-[12px] text-foreground/30 -mt-1">
              Ex: 0,75% a.m. ≈ CDI. Poupança ≈ 0,5%. Fundos conservadores ≈ 0,8%–1%.
            </span>
            <div className="flex items-center" style={{ border: "0.5px solid var(--gold)" }}>
              <input
                type="text"
                inputMode="decimal"
                value={rentMensalStr}
                onChange={(e) => {
                  const raw = e.target.value.replace(",", ".");
                  setRentMensalStr(e.target.value);
                  const parsed = parseFloat(raw);
                  if (!isNaN(parsed) && parsed >= 0.1 && parsed <= 5) {
                    setRentMensal(parsed);
                  }
                }}
                onBlur={() => {
                  const parsed = parseFloat(rentMensalStr.replace(",", "."));
                  const safe = isNaN(parsed) ? 0.75 : Math.min(5, Math.max(0.1, parsed));
                  setRentMensal(safe);
                  setRentMensalStr(String(safe));
                }}
                className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none w-full"
              />
              <span className="px-4 py-3 text-[15px] text-foreground/40 flex-shrink-0" style={{ borderLeft: "0.5px solid var(--gold)" }}>
                % a.m.
              </span>
              <div className="flex flex-col" style={{ borderLeft: "0.5px solid var(--gold)" }}>
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.min(5, Math.round((rentMensal + 0.05) * 100) / 100);
                    setRentMensal(next);
                    setRentMensalStr(String(next));
                  }}
                  className="px-3 py-1 text-foreground/50 hover:text-[color:var(--gold)] transition-colors text-[11px] leading-none"
                >▲</button>
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.max(0.1, Math.round((rentMensal - 0.05) * 100) / 100);
                    setRentMensal(next);
                    setRentMensalStr(String(next));
                  }}
                  className="px-3 py-1 text-foreground/50 hover:text-[color:var(--gold)] transition-colors text-[11px] leading-none"
                >▼</button>
              </div>
            </div>
          </label>

          {/* Info inflação */}
          <div className="flex flex-col gap-2 justify-end">
            <div className="px-5 py-4 text-[13px]" style={{ border: "0.5px solid var(--border-gold)", background: "rgba(155,126,78,0.04)" }}>
              <div className="text-foreground/50 mb-1">Inflação usada no cálculo</div>
              <div style={{ color: "var(--gold)" }} className="font-display text-lg">
                {IPCA}% a.a. (IPCA histórico)
              </div>
              <div className="text-[11px] mt-2 text-foreground/30 leading-relaxed">
                Média real dos últimos 15 anos no Brasil. Usada para corrigir o quanto você vai precisar no futuro.
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calcular}
          className="mt-8 px-10 py-4 text-[13px] tracking-[0.2em] uppercase"
          style={{ background: "var(--gold)", color: "#111110" }}
        >
          Calcular meu número real
        </button>
      </div>

      {/* Resultados */}
      {result && (
        <div ref={resultRef} className="flex flex-col gap-0" style={{ border: "0.5px solid var(--border-gold)" }}>

          {/* Destaque principal — impacto da inflação */}
          <div className="p-8 md:p-10" style={{ borderBottom: "0.5px solid var(--border-gold)", background: "rgba(155,126,78,0.04)" }}>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--gold)" }}>
              02 — Seu número real
            </p>
            <p className="text-[13px] text-foreground/40 mb-3 tracking-[0.1em] uppercase">
              Para manter R$ {parseInt(renda.replace(/\D/g, "")).toLocaleString("pt-BR")} de poder de compra, você vai precisar receber
            </p>
            <div className="font-display text-5xl md:text-6xl font-light mb-3" style={{ color: "var(--gold)" }}>
              {fmt(result.nominalRenda)}
            </div>
            <p className="text-[14px] text-foreground/45">
              por mês daqui a {prazo} anos — porque a inflação vai corroer{" "}
              <strong className="text-foreground">{result.poderPerdido.toFixed(0)}%</strong> do seu poder de compra nesse período.
            </p>
          </div>

          {/* Grid de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <MetricBox
              label="Patrimônio que você precisa acumular"
              value={fmt(result.patrimonioAlvo)}
              sub="Para gerar sua renda com segurança, sem depender de trabalho"
              highlight
            />
            <MetricBox
              label="Aporte mensal necessário"
              value={fmt(result.aportesMensal)}
              sub="Partindo do zero hoje, aplicando todo mês com consistência"
            />
            <MetricBox
              label="Poder de compra perdido"
              value={`${result.poderPerdido.toFixed(0)}%`}
              sub={`Seu dinheiro vale ${result.poderPerdido.toFixed(0)}% menos em termos reais daqui a ${prazo} anos`}
            />
          </div>

          <div className="px-8 py-4" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
            <p className="text-[11px] text-foreground/25 leading-relaxed">
              Projeções baseadas em médias históricas. Selic {SELIC}% a.a. e IPCA {IPCA}% a.a. (2010–2024). Não constituem garantia de rendimento futuro.
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="p-8 md:p-10 text-center" style={{ border: "0.5px solid var(--border-gold)" }}>
        <p className="text-[12px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>
          Pronto para construir seu patrimônio com estratégia?
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-light leading-snug mb-6">
          A Virta Capital estrutura alavancagem patrimonial para quem quer chegar lá de verdade.
        </h3>
        <a
          href="/contato?assunto=calculadora"
          className="inline-flex items-center px-10 py-4 text-[13px] tracking-[0.2em] uppercase"
          style={{ background: "var(--gold)", color: "#111110" }}
        >
          Conversar com um especialista
        </a>
      </div>
    </div>
  );
}

function MetricBox({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-2" style={{ borderRight: "0.5px solid var(--border-gold)", borderBottom: "0.5px solid var(--border-gold)" }}>
      <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/35">{label}</span>
      <span className="font-display text-2xl md:text-3xl font-light" style={highlight ? { color: "var(--gold-light)" } : undefined}>
        {value}
      </span>
      <span className="text-[12px] text-foreground/35 leading-relaxed">{sub}</span>
    </div>
  );
}

export default function Calculadora() {
  usePageMeta("Calculadora de Renda Passiva — Virta Capital", "Descubra o número real que separa você da liberdade financeira.");

  const [unlocked, setUnlocked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const calcRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ nome: data.nome, email: data.email, whatsapp: rawWhatsapp, origem: "Calculadora", origem_id: 32, origem_secundaria: "" }),
      });
    } catch (_) {}
    setLoading(false);
    setUnlocked(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Calculadora de Renda Passiva"
        title="Quanto você vai realmente precisar para se aposentar?"
        subtitle="A inflação corrói silenciosamente seu poder de compra. Descubra o número real que separa você da independência financeira."
      />

      <section className="px-6 lg:px-10 py-16 md:py-24" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
        <div className="mx-auto max-w-4xl">
          {!unlocked ? (
            <div className="flex flex-col gap-8">
              {/* Copy de impacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
                <div>
                  <div className="font-display text-6xl md:text-7xl font-light mb-2" style={{ color: "var(--gold)" }}>
                    5,8%
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-foreground/35 mb-6">
                    IPCA médio ao ano · últimos 15 anos
                  </div>
                  <p className="text-[15px] leading-[1.85] text-foreground/65">
                    Em 20 anos, <strong className="text-foreground">R$ 10.000 de hoje</strong> vão precisar de quase{" "}
                    <strong style={{ color: "var(--gold-light)" }}>R$ 31.000</strong> para manter o mesmo poder de compra.
                    A maioria das pessoas planeja a aposentadoria sem considerar isso — e chega lá com metade do que precisava.
                  </p>
                </div>
                <div className="flex flex-col gap-5 text-[15px] leading-[1.85] text-foreground/65">
                  <p>
                    Esta calculadora usa as médias históricas reais da Selic e do IPCA para mostrar seu{" "}
                    <em style={{ color: "var(--fg)" }}>número verdadeiro</em>: o patrimônio que você precisa acumular,
                    o aporte mensal necessário e o impacto real da inflação no seu poder de compra futuro.
                  </p>
                  <p>
                    Não é uma projeção otimista. É uma análise honesta — do tipo que bancos raramente mostram,
                    porque quando você entende o número real, fica impossível continuar deixando patrimônio parado.
                  </p>
                </div>
              </div>

              <div className="py-4 px-6 flex items-center gap-3" style={{ border: "0.5px solid var(--border-gold)" }}>
                <span className="text-[11px] tracking-[0.3em] uppercase flex-shrink-0" style={{ color: "var(--gold)" }}>
                  Acesso gratuito
                </span>
                <span className="text-[13px] text-foreground/40">
                  Preencha seus dados abaixo para liberar a calculadora. Sem spam, sem compromisso.
                </span>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { n: "1", t: "Informe seus dados", d: "Rápido e seguro. Seus dados não serão compartilhados." },
                  { n: "2", t: "Acesse a calculadora", d: "Preencha renda desejada, prazo e rentabilidade." },
                  { n: "3", t: "Veja seu número real", d: "Patrimônio alvo, aporte mensal e impacto da inflação." },
                ].map((s) => (
                  <div key={s.n} className="p-6" style={{ border: "0.5px solid var(--border-gold)" }}>
                    <div className="font-display text-3xl font-light mb-3" style={{ color: "var(--gold)" }}>{s.n}</div>
                    <div className="text-[13px] tracking-[0.15em] uppercase mb-2">{s.t}</div>
                    <div className="text-[13px] text-foreground/45">{s.d}</div>
                  </div>
                ))}
              </div>

              {/* Formulário gate */}
              <div className="p-8 md:p-10" style={{ border: "0.5px solid var(--border-gold)" }}>
                <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--gold)" }}>
                  Informe seus dados para acessar
                </p>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                      <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">Nome</span>
                      <input name="nome" type="text" required
                        className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none"
                        style={{ border: "0.5px solid var(--gold)" }} />
                      {errors.nome && <span className="text-[12px] text-red-400/70">{errors.nome}</span>}
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">Email</span>
                      <input name="email" type="email" required
                        className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none"
                        style={{ border: "0.5px solid var(--gold)" }} />
                      {errors.email && <span className="text-[12px] text-red-400/70">{errors.email}</span>}
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">WhatsApp</span>
                    <input type="tel" inputMode="numeric" required value={whatsapp}
                      onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                      placeholder="(48) 99999-9999"
                      className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none placeholder:text-foreground/20"
                      style={{ border: "0.5px solid var(--gold)" }} />
                    {errors.whatsapp && <span className="text-[12px] text-red-400/70">{errors.whatsapp}</span>}
                  </label>
                  <button type="submit" disabled={loading}
                    className="self-start px-10 py-4 text-[13px] tracking-[0.2em] uppercase disabled:opacity-50"
                    style={{ background: "var(--gold)", color: "#111110" }}>
                    {loading ? "Aguarde…" : "Acessar a calculadora →"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div ref={calcRef}><CalcWidget /></div>
          )}
        </div>
      </section>
    </Layout>
  );
}
