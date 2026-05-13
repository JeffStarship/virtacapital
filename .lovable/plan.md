## Objetivo

Converter o projeto de TanStack Start (SSR + Cloudflare Workers) para uma React SPA pura com saída estática em `dist/`, compatível com Cloudflare Pages. Todo o conteúdo, design e páginas permanecem idênticos.

## ⚠️ Avisos importantes antes de começar

1. **Lovable já hospeda este projeto** em `virtacapital.lovable.app` com roteamento funcionando. Esta conversão é necessária apenas se você quer publicar fora do Lovable (Cloudflare Pages). Após a conversão, edições futuras dentro do Lovable podem ficar mais frágeis, porque o template oficial assume TanStack Start.
2. O `vite.config.ts` atual usa `@lovable.dev/vite-tanstack-config`, que injeta automaticamente o plugin do TanStack Start, plugin do Cloudflare, e outros. Vamos substituir por uma config Vite + React padrão.
3. Confirme que aceita esses trade-offs antes de executar.

## Etapas

### 1. Remover infraestrutura SSR / Workers
- Remover pacotes: `@tanstack/react-start`, `@tanstack/react-router` (substituído por `react-router-dom`), `@tanstack/router-plugin`, `@cloudflare/vite-plugin`, `wrangler`, `@lovable.dev/vite-tanstack-config`.
- Adicionar: `react-router-dom`, `@vitejs/plugin-react`.
- Apagar: `wrangler.jsonc`, `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routeTree.gen.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`.

### 2. Reescrever `vite.config.ts`
Config mínima:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "dist" },
});
```

### 3. Novo entry point SPA
- Criar `index.html` na raiz com `<div id="root">` e `<script type="module" src="/src/main.tsx">`.
- Criar `src/main.tsx` que monta `<BrowserRouter>` + `<QueryClientProvider>` + `<App />`.
- Criar `src/App.tsx` com `<Routes>` mapeando cada página:
  - `/` → `Index`
  - `/como-funciona` → `ComoFunciona`
  - `/estrategias` → `Estrategias`
  - `/para-quem-e` → `ParaQuemE`
  - `/sobre` → `Sobre`
  - `/blog` → `Blog` (rota mantida; nav já mostra "Matérias")
  - `/contato` → `Contato`
  - `*` → NotFound

### 4. Migrar páginas e componentes
Para cada arquivo em `src/routes/*.tsx` e em `src/components/{Nav,Footer,Layout}.tsx`:
- Substituir `import { Link, createFileRoute, useSearch } from "@tanstack/react-router"` por `import { Link, useSearchParams } from "react-router-dom"`.
- Remover o bloco `export const Route = createFileRoute(...)({...})`. Mover qualquer `head()` (title/meta) para um `useEffect` que seta `document.title` (ou usar `react-helmet-async` — proposta: solução simples com `useEffect` por página).
- Trocar `<Link to="/x">` (TanStack) por `<Link to="/x">` (React Router) — API é compatível, mas remover props específicas (`activeProps`, `search={{...}}`, `params={{...}}`).
  - Para `/contato?assunto=xxx`, usar `to={`/contato?assunto=${slug}`}`.
- Mover cada página de `src/routes/` para `src/pages/` e renomear componentes para export default.

### 5. Cloudflare Pages
- Criar `public/_redirects`:
  ```
  /*    /index.html   200
  ```

### 6. Limpeza
- Remover scripts/configs específicas do Workers em `package.json` (`wrangler`, `deploy` etc.) e ajustar `build` para `vite build`.
- Remover dependências TanStack não usadas (`@tanstack/react-router-devtools` se houver).
- Manter `@tanstack/react-query` (continua útil).

### 7. Validação
- `npm run build` deve gerar somente `dist/` com `index.html` + assets.
- Testar localmente com `npx vite preview`, navegar entre todas as rotas, recarregar em rotas internas.
- Conferir que SEO básico (title por página) continua funcionando via `useEffect`.

## Trade-offs vs estado atual
- **Perde**: SSR, metadados por rota no HTML inicial (apenas via JS após hydration), tipagem de rotas do TanStack Router, integração nativa com Lovable hosting.
- **Ganha**: Build estático puro, deploy direto em Cloudflare Pages / qualquer CDN.

## Pergunta antes de implementar
Quer que eu siga com a abordagem simples (title via `useEffect`) ou prefere instalar `react-helmet-async` para gerenciar `<title>` e `<meta>` por página de forma mais declarativa?
