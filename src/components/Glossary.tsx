import { useState } from "react";
import { glossaryTerms, categories } from "../data/glossary";

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = glossaryTerms.filter((term) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      term.term.toLowerCase().includes(searchLower) ||
      term.shortDefinition.toLowerCase().includes(searchLower) ||
      term.definition.toLowerCase().includes(searchLower) ||
      term.example.toLowerCase().includes(searchLower);
    const matchesCategory =
      selectedCategory === "all" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">📖 Глоссарий</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Все профессиональные термины, которые встречаются при разработке.
          Нажимайте на термин, чтобы увидеть пример использования.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск термина..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <CategoryButton
          active={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
          label="Все"
          count={glossaryTerms.length}
        />
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            label={cat}
            count={glossaryTerms.filter((t) => t.category === cat).length}
          />
        ))}
      </div>

      {/* Terms count */}
      <p className="text-center text-sm text-slate-400 mb-6">
        Найдено терминов: {filteredTerms.length}
      </p>

      {/* Terms list */}
      <div className="grid gap-3">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className={`rounded-xl border transition-all cursor-pointer ${
              expandedTerm === term.id
                ? "bg-white/5 border-indigo-500/30"
                : "bg-white/[0.02] border-white/10 hover:border-white/20"
            }`}
            onClick={() =>
              setExpandedTerm(expandedTerm === term.id ? null : term.id)
            }
          >
            <div className="p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-white">{term.term}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/30">
                    {term.category}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1 line-clamp-1">
                  {term.shortDefinition}
                </p>
              </div>
              <div
                className={`text-slate-400 transition-transform text-xs ${
                  expandedTerm === term.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </div>
            </div>

            {expandedTerm === term.id && (
              <div className="px-4 pb-4 pt-0 border-t border-white/5 mt-0">
                <div className="pl-5 space-y-3 pt-3">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-1">
                      Кратко:
                    </h4>
                    <p className="text-sm text-slate-300">{term.shortDefinition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-300 mb-1">
                      Подробное определение:
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{term.definition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-300 mb-1">
                      💡 Пример:
                    </h4>
                    <p className="text-sm text-slate-300 bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10">
                      {term.example}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-slate-400">Термины не найдены. Попробуйте другой запрос.</p>
        </div>
      )}
    </div>
  );
}

function CategoryButton({ active, onClick, label, count }: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
      }`}
    >
      {label} ({count})
    </button>
  );
}
