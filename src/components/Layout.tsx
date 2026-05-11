import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  italicWord,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  italicWord?: string;
}) {
  let rendered: ReactNode = title;
  if (italicWord && title.includes(italicWord)) {
    const parts = title.split(italicWord);
    rendered = (
      <>
        {parts[0]}
        <em className="italic" style={{ color: "var(--gold)" }}>
          {italicWord}
        </em>
        {parts[1]}
      </>
    );
  }
  return (
    <section className="px-6 lg:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="gold-line mb-8" />
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] max-w-3xl">
          {rendered}
        </h1>
        {subtitle && (
          <p className="mt-8 text-sm text-foreground/45 max-w-xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
