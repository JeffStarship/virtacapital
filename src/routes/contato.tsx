import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Layout, PageHero } from "@/components/Layout";
import canopusStar from "@/assets/canopus-star.png";

const searchSchema = z.object({
  assunto: z.string().optional(),
});

export const Route = createFileRoute("/contato")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contato — Virta Capital" },
      { name: "description", content: "Vamos estruturar sua estratégia patrimonial." },
      { property: "og:title", content: "Contato — Virta Capital" },
    ],
  }),
  component: Page,
});

const formSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(120),
  email: z.string().trim().email("Email inválido").max(255),
  whatsapp: z.string().trim().min(8, "WhatsApp inválido").max(30),
});

function Page() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      nome: String(fd.get("nome") || ""),
      email: String(fd.get("email") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSent(true);
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
            {sent ? (
              <div className="p-10 border-thin">
                <p className="eyebrow mb-4">Mensagem enviada</p>
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight">
                  Recebemos seu contato. Everton entrará em contato em breve.
                </h3>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-7" noValidate>
                <Field label="Nome completo" name="nome" required error={errors.nome} />
                <Field label="Email" name="email" type="email" required error={errors.email} />
                <Field label="WhatsApp" name="whatsapp" required error={errors.whatsapp} />
                <button
                  type="submit"
                  disabled={loading}
                  className="self-start mt-4 px-10 py-4 text-[11px] tracking-[0.2em] uppercase disabled:opacity-50"
                  style={{ background: "var(--gold)", color: "#111110" }}
                >
                  {loading ? "Enviando…" : "Quero entender melhor!"}
                </button>
              </form>
            )}
          </div>

          <aside className="md:col-span-2 flex flex-col gap-8">
            <div className="border-thin p-8">
              <p className="eyebrow mb-6">Contato direto</p>
              <div className="flex flex-col gap-5 text-[13px]">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/35">WhatsApp</div>
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
                  <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/35">Email</div>
                  <a href="mailto:contato@virtacapital.com.br" className="mt-2 block text-foreground/80 break-all">
                    contato@virtacapital.com.br
                  </a>
                </div>
              </div>
            </div>
            <div className="border-thin p-6 flex items-center gap-4">
              <img src={canopusStar} alt="Canopus" className="h-9 w-9 opacity-90" />
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--gold)" }}>
                  Parceiro Canopus
                </div>
                <p className="mt-1 text-[11px] text-foreground/45">
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
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/45">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="bg-transparent px-4 py-3 text-[14px] text-foreground outline-none focus:border-[color:var(--gold-light)]"
        style={{ border: "0.5px solid var(--gold)" }}
      />
      {error && <span className="text-[11px] text-red-400/70">{error}</span>}
    </label>
  );
}
