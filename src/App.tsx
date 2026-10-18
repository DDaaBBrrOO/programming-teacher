import { useState } from "react";
import Header from "./components/Header";
import Stages from "./components/Stages";
import Glossary from "./components/Glossary";
import Quiz from "./components/Quiz";
import Configurator from "./components/Configurator";
import Home from "./components/Home";

export type Page = "home" | "stages" | "glossary" | "quiz" | "configurator";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "stages":
        return <Stages />;
      case "glossary":
        return <Glossary />;
      case "quiz":
        return <Quiz />;
      case "configurator":
        return <Configurator />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderPage()}
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
        <p>DevPath — Путь от идеи к продукту © 2026</p>
        <p className="mt-1">Создано для начинающих разработчиков 💜</p>
      </footer>
    </div>
  );
}

export default App;
