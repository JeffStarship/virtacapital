import { Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import ComoFunciona from "./pages/ComoFunciona";
import Estrategias from "./pages/Estrategias";
import ParaQuemE from "./pages/ParaQuemE";
import Sobre from "./pages/Sobre";
import Blog from "./pages/Blog";
import Contato from "./pages/Contato";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">Página não encontrada.</p>
        <Link to="/" className="mt-6 inline-block underline text-foreground">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/estrategias" element={<Estrategias />} />
      <Route path="/para-quem-e" element={<ParaQuemE />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
