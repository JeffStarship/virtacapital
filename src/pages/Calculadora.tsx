import { useState } from "react";
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

function fmt(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function CalcWidget() {
  const SELIC = 9.2;
  const IPCA = 5.8;
  const realRate = ((1 + SELIC / 100) / (1 + IPCA / 100) - 1) * 100;

  const [renda, setRenda] = useState("");
  const [prazo, setPrazo] = useState("");
  const [rentMensal, setRentMensal] = useState("0.75");
  const [result, setResult] = useState<null | {
    nominalRenda: number;
    patrimonioAlvo: number;
    aportesMensal: number;
    fatorInflacao: number;
    poderPerdido: number;
    retiradaMensal: number;
  }>(null);

  const calcular = () => {
    const rendaNum = parseFloat(renda.replace(/\D/g, "")) || 0;
    const prazoNum = parseInt(prazo) || 0;
    const rentNum = parseFloat(rentMensal) / 100;
    if (!rendaNum || !prazoNum || !rentNum) return;

    const meses = prazoNum * 12;
    const taxaAnualReal = realRate / 100;
    const fatorInflacao = Math.pow(1 + IPCA / 100, prazoNum);
    const nominalRenda = rendaNum * fatorInflacao;
    const taxaRetirada = taxaAnualReal / 12;
    const patrimonioAlvo = taxaRetirada > 0 ? nominalRenda / taxaRetirada : nominalRenda * 300;
    const aportesMensal = (patrimonioAlvo * rentNum) / (Math.pow(1 + rentNum, meses) - 1);
    const poderPerdido = (1 - 1 / fatorInflacao) * 100;
    const retiradaMensal = nominalRenda;

    setResult({ nominalRenda, patrimonioAlvo, aportesMensal, fatorInflacao, poderPerdido, retiradaMensal });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Entradas */}
      <div className="p-8 md:p-10" style={{ border: "0.5px solid var(--border-gold)" }}>
        <p className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--gold)" }}>
          01 — Defina seu objetivo
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">Renda mensal desejada na aposentadoria (R$)</span>
            <input
              type="text"
              inputMode="numeric"
              value={renda}
              onChange={(e) => setRenda(e.target.value.replace(/\D/g, ""))}
              placeholder="10.000"
              className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none placeholder:text-foreground/20"
              style={{ border: "0.5px solid var(--gold)" }}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">Quantos anos até se aposentar?</span>
            <input
              type="number"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              placeholder="20"
              min="1" max="50"
              className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none placeholder:text-foreground/20"
              style={{ border: "0.5px solid var(--gold)" }}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[12px] tracking-[0.25em] uppercase text-foreground/45">Rentabilidade mensal estimada (%)</span>
            <input
              type="number"
              value={rentMensal}
              onChange={(e) => setRentMensal(e.target.value)}
              step="0.01" min="0.1" max="5"
              className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none"
              style={{ border: "0.5px solid var(--gold)" }}
            />
          </label>
          <div className="flex flex-col gap-2 justify-end">
            <div className="px-4 py-3 text-[13px] text-foreground/45" style={{ border: "0.5px solid var(--border-gold)" }}>
              Selic {SELIC}% a.a. ÷ IPCA {IPCA}% a.a. = <span style={{ color: "var(--gold)" }}>{realRate.toFixed(2)}% real</span>
              <div className="text-[11px] mt-1 text-foreground/30">Médias dos últimos 15 anos (2010–2024)</div>
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
        <div className="p-8 md:p-10 flex flex-col gap-8" style={{ border: "0.5px solid var(--border-gold)" }}>
          <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
            02 — Seu número real
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Metric label="Renda necessária na aposentadoria (nominal)" value={fmt(result.nominalRenda)} sub="corrigida pela inflação" />
            <Metric label="Patrimônio alvo" value={fmt(result.patrimonioAlvo)} sub="necessário para gerar sua renda com segurança" highlight />
            <Metric label="Aporte mensal necessário" value={fmt(result.aportesMensal)} sub="partindo do zero, para atingir o patrimônio alvo" />
            <Metric label="Fator de correção inflacionária" value={`${result.fatorInflacao.toFixed(2)}×`} sub={`os preços serão ${result.fatorInflacao.toFixed(2)}× mais altos no futuro`} />
            <Metric label="Poder de compra perdido" value={`${result.poderPerdido.toFixed(1)}%`} sub="do seu dinheiro some em valor real se não corrigir pela inflação" />
            <Metric label="Retirada mensal equivalente" value={fmt(result.retiradaMensal)} sub="renda corrigida pela inflação no futuro" />
          </div>
          <div className="pt-6" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
            <p className="text-[13px] text-foreground/40 leading-relaxed">
              Cálculos baseados em projeções históricas. Selic {SELIC}% a.a. e IPCA {IPCA}% a.a. são médias de 2010–2024. Não constituem garantia de rendimento futuro.
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

function Metric({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] tracking-[0.25em] uppercase text-foreground/35">{label}</span>
      <span className={`font-display text-2xl md:text-3xl font-light ${highlight ? "" : ""}`} style={highlight ? { color: "var(--gold)" } : undefined}>
        {value}
      </span>
      <span className="text-[12px] text-foreground/35">{sub}</span>
    </div>
  );
}

export default function Calculadora() {
  usePageMeta("Calculadora de Independência Financeira — Virta Capital", "Descubra o número real que separa você da liberdade financeira.");

  const [unlocked, setUnlocked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");

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
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Calculadora"
        title="Quanto você vai realmente precisar para se aposentar?"
        subtitle="A inflação corrói silenciosamente seu poder de compra. Descubra o número real que separa você da independência financeira."
      />

      <section className="px-6 lg:px-10 py-16 md:py-24" style={{ borderTop: "0.5px solid var(--border-gold)" }}>
        <div className="mx-auto max-w-4xl">
          {!unlocked ? (
            <div className="flex flex-col gap-8">
              {/* Descrição */}
              <div className="flex flex-col gap-6 text-[16px] leading-[1.85] text-foreground/70 max-w-2xl">
                <p>
                  A maioria das pessoas subestima quanto vai precisar para se aposentar com conforto. O motivo é simples: os cálculos comuns ignoram a inflação — e ela corrói silenciosamente o poder de compra ao longo dos anos.
                </p>
                <p>
                  Esta calculadora usa as médias históricas reais da Selic e do IPCA dos últimos 15 anos para mostrar seu <span style={{ color: "var(--gold)" }}>número real</span>: o patrimônio que você precisa acumular, o aporte mensal necessário e o quanto a inflação vai impactar sua renda no futuro.
                </p>
                <p>
                  Diferente de outras calculadoras, aqui você vê o custo de oportunidade de não agir — e o ponto de partida para uma estratégia patrimonial de verdade.
                </p>
              </div>

              <div className="py-4 px-6 text-[13px] text-foreground/40" style={{ border: "0.5px solid var(--border-gold)" }}>
                Para acessar a calculadora, preencha seus dados abaixo. Gratuito, sem compromisso.
              </div>
              {/* Instruções */}
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
            <CalcWidget />
          )}
        </div>
      </section>
    </Layout>
  );
}
