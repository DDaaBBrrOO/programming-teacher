import { useState } from "react";
import { stages, type Stage } from "../data/stages";

export default function Stages() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "required" | "optional">("all");

  const filteredStages = stages.filter((s) => {
    if (filter === "required") return s.required;
    if (filter === "optional") return !s.required;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">📋 Этапы разработки</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Полный путь создания приложения — от идеи до развития продукта.
          Нажмите на этап, чтобы узнать подробности.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-8">
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="Все этапы"
          count={stages.length}
        />
        <FilterButton
          active={filter === "required"}
          onClick={() => setFilter("required")}
          label="Обязательные"
          count={stages.filter((s) => s.required).length}
        />
        <FilterButton
          active={filter === "optional"}
          onClick={() => setFilter("optional")}
          label="Опциональные"
          count={stages.filter((s) => !s.required).length}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300">Обязательный этап</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-slate-300">Опциональный этап</span>
        </div>
      </div>

      {/* Stages */}
      <div className="space-y-4">
        {filteredStages.map((stage) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isExpanded={expandedStage === stage.id}
            onToggle={() =>
              setExpandedStage(expandedStage === stage.id ? null : stage.id)
            }
          />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h3 className="text-xl font-bold mb-3">💡 Итого</h3>
        <p className="text-slate-300">
          Из {stages.length} этапов <strong className="text-emerald-400">{stages.filter(s => s.required).length} обязательных</strong> и{" "}
          <strong className="text-amber-400">{stages.filter(s => !s.required).length} опциональных</strong>.
          Для первого проекта рекомендуется пройти все обязательные этапы. Опциональные этапы (документация, сбор обратной связи, итерации) 
          важны для долгосрочных проектов и продуктов.
        </p>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label, count }: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
          : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
      }`}
    >
      {label} ({count})
    </button>
  );
}

function StageCard({ stage, isExpanded, onToggle }: {
  stage: Stage;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all ${
        isExpanded
          ? "bg-white/5 border-indigo-500/30 shadow-xl shadow-indigo-500/5"
          : "bg-white/[0.02] border-white/10 hover:border-white/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            stage.required
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}
        >
          {stage.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold">{stage.title}</h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                stage.required
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {stage.required ? "Обязательно" : "Опционально"}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 line-clamp-1">
            {stage.description}
          </p>
        </div>
        <div
          className={`text-slate-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-5">
          <p className="text-slate-300">{stage.description}</p>

          <div>
            <h4 className="font-semibold text-indigo-300 mb-2">📝 Что нужно сделать:</h4>
            <ul className="space-y-1.5">
              {stage.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-emerald-300 mb-2">💡 Советы:</h4>
            <ul className="space-y-1.5">
              {stage.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-purple-300 mb-2">🛠 Рекомендуемые инструменты:</h4>
            <div className="flex flex-wrap gap-2">
              {stage.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-red-300 mb-2">⚠️ Частые ошибки:</h4>
            <ul className="space-y-1.5">
              {stage.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400 mt-0.5">✗</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
