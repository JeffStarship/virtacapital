import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Layout, PageHero } from "@/components/Layout";
import { usePageMeta } from "@/lib/seo";
import canopusStar from "@/assets/canopus-star.png";

const WEBHOOK_URL = "https://n8n.virtacapital.com.br/webhook/virta-lead";

const ORIGENS: Record<string, string> = {
  "alavancagem-empresarial": "Alavancagem Empresarial",
  "aquisicao-renda-passiva": "Aquisição com Renda Passiva",
  "rendimento-cdi": "Rendimento do CDI",
  "calculadora": "Calculadora",
};

const ORIGEM_IDS: Record<string, number> = {
  contato: 33,
  calculadora: 32,
};

const formSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(120).refine((v) => v.trim().split(/\s+/).length >= 2, "Informe nome e sobrenome"),
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

export default function Contato() {
  usePageMeta("Contato — Virta Capital", "Vamos estruturar sua estratégia patrimonial.");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const assunto = searchParams.get("assunto") || "";
  const origemSecundaria = ORIGENS[assunto] || "";
  const origemId = assunto === "calculadora" ? ORIGEM_IDS["calculadora"] : ORIGEM_IDS["contato"];

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const whatsappRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rawWhatsapp = whatsapp.replace(/\D/g, "");
    const data = {
      nome: String(fd.get("nome") || ""),
      email: String(fd.get("email") || ""),
      whatsapp: rawWhatsapp,
    };
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
          whatsapp: rawWhatsapp,
          origem: "Conversar",
          origem_id: origemId,
          origem_secundaria: origemSecundaria,
        }),
      });
    } catch (_) {}
    setLoading(false);
    navigate("/blog?obrigado=1");
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Contato"
        title="Vamos estruturar sua estratégia"
        subtitle="Preencha o formulário e entraremos em contato em até 1 dia útil."
      />

      <section
        className="px-6 lg:px-10 py-20 md:py-28"
        style={{ borderTop: "0.5px solid var(--border-gold)" }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20">
          <div className="md:col-span-3">
            {origemSecundaria && (
              <div className="mb-8 px-4 py-3" style={{ border: "0.5px solid var(--border-gold)" }}>
                <p className="text-[12px] tracking-[0.25em] uppercase" style={{ color: "var(--gold)" }}>
                  Estratégia selecionada: {origemSecundaria}
                </p>
              </div>
            )}
            <form onSubmit={onSubmit} className="flex flex-col gap-7" noValidate>
              <Field label="Nome completo" name="nome" required error={errors.nome} />
              <Field label="Email" name="email" type="email" required error={errors.email} />
              <label className="flex flex-col gap-2">
                <span className="text-[12px] tracking-[0.3em] uppercase text-foreground/45">WhatsApp</span>
                <input
                  ref={whatsappRef}
                  name="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                  placeholder="(48) 99999-9999"
                  className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none focus:border-[color:var(--gold-light)] placeholder:text-foreground/20"
                  style={{ border: "0.5px solid var(--gold)" }}
                />
                {errors.whatsapp && <span className="text-[13px] text-red-400/70">{errors.whatsapp}</span>}
              </label>
              <button
                type="submit"
                disabled={loading}
                className="self-start mt-4 px-10 py-4 text-[13px] tracking-[0.2em] uppercase disabled:opacity-50"
                style={{ background: "var(--gold)", color: "#111110" }}
              >
                {loading ? "Enviando…" : "Quero entender melhor!"}
              </button>
            </form>
          </div>

          <aside className="md:col-span-2 flex flex-col gap-8">
            <div className="border-thin p-8">
              <p className="eyebrow mb-6">Contato direto</p>
              <div className="flex flex-col gap-5 text-[15px]">
                <div>
                  <div className="text-[12px] tracking-[0.3em] uppercase text-foreground/35">WhatsApp</div>
                  <a
                    href="https://wa.me/5548888283393"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-foreground/80 hover:text-[color:var(--gold)]"
                  >
                    +55 48 8828-3393
                  </a>
                </div>
                <div>
                  <div className="text-[12px] tracking-[0.3em] uppercase text-foreground/35">Email</div>
                  <a href="mailto:contato@virtacapital.com.br" className="mt-2 block text-foreground/80 break-all">
                    contato@virtacapital.com.br
                  </a>
                </div>
              </div>
            </div>
            <div className="border-thin p-6 flex items-center gap-4">
              <img src={canopusStar} alt="Canopus" className="h-9 w-9 opacity-90" />
              <div>
                <div className="text-[12px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
                  Parceiro Canopus
                </div>
                <p className="mt-1 text-[13px] text-foreground/45">
                  Operações conduzidas via administradora regulamentada pelo BC.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label, name, type = "text", required, error,
}: {
  label: string; name: string; type?: string; required?: boolean; error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] tracking-[0.3em] uppercase text-foreground/45">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="bg-transparent px-4 py-3 text-[16px] text-foreground outline-none focus:border-[color:var(--gold-light)]"
        style={{ border: "0.5px solid var(--gold)" }}
      />
      {error && <span className="text-[13px] text-red-400/70">{error}</span>}
    </label>
  );
}
