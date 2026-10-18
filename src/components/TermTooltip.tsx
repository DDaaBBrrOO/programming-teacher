import { useState, useRef, useEffect, type ReactNode } from "react";
import { glossaryTerms } from "../data/glossary";

interface TermTooltipProps {
  term: string;
  children: ReactNode;
}

/**
 * Компонент, который при наведении показывает всплывающую подсказку
 * с определением термина из глоссария.
 * 
 * Поиск термина нечувствителен к регистру и учитывает сокращения.
 */
export default function TermTooltip({ term, children }: TermTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Находим термин в глоссарии (нечувствительно к регистру)
  const glossaryEntry = glossaryTerms.find(
    (t) =>
      t.term.toLowerCase() === term.toLowerCase() ||
      t.term.toLowerCase().includes(term.toLowerCase()) ||
      term.toLowerCase().includes(t.term.toLowerCase().split(" ")[0].toLowerCase())
  );

  // Краткое определение для тултипа
  const tooltipDefinition = glossaryEntry?.shortDefinition || glossaryEntry?.definition || "";

  // Определяем позицию тултипа (сверху или снизу)
  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      setPosition(spaceAbove > 200 ? "top" : "bottom");
    }
  }, [isVisible]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
  };

  if (!glossaryEntry) {
    return <span>{children}</span>;
  }

  return (
    <span
      ref={triggerRef}
      className="relative inline cursor-help border-b border-dashed border-indigo-400/50 text-indigo-300 hover:text-indigo-200 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
    >
      {children}
      <span className="ml-0.5 text-[10px] text-indigo-400/60">ⓘ</span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 w-64 sm:w-72 md:w-80 p-4 rounded-xl bg-slate-800/95 backdrop-blur-sm border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 ${
            position === "top"
              ? "bottom-full mb-2"
              : "top-full mt-2"
          }`}
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "calc(100vw - 2rem)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Стрелка */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800/95 border-indigo-500/30 rotate-45 ${
              position === "top"
                ? "bottom-[-6px] border-b border-r"
                : "top-[-6px] border-t border-l"
            }`}
          ></div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {glossaryEntry.category}
              </span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              {glossaryEntry.term}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              {tooltipDefinition}
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs text-emerald-300/80">
                💡 {glossaryEntry.example}
              </p>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

/**
 * Компонент, который автоматически находит термины из глоссария в тексте
 * и оборачивает их в TermTooltip.
 */
export function SmartText({ text, className = "" }: { text: string; className?: string }) {
  // Сортируем термины по длине (длинные первыми, чтобы не было конфликтов)
  const sortedTerms = [...glossaryTerms]
    .filter((t) => t.term.length > 2)
    .sort((a, b) => b.term.length - a.term.length);

  // Создаём регулярное выражение для поиска всех терминов
  const termPatterns = sortedTerms.map((t) => {
    // Берём основную часть термина (до скобок если есть)
    const mainTerm = t.term.split("(")[0].trim();
    // Также берём аббревиатуру из скобок если есть
    const abbrMatch = t.term.match(/\(([^)]+)\)/);
    const abbr = abbrMatch ? abbrMatch[1] : null;

    const patterns = [escapeRegex(mainTerm)];
    if (abbr && abbr.length > 2) {
      patterns.push(escapeRegex(abbr));
    }
    return { patterns, term: t };
  });

  // Функция для экранирования спецсимволов regex
  function escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Разбиваем текст на части
  const parts: { text: string; isTerm: boolean; termName?: string }[] = [];
  let remaining = text;

  // Находим все вхождения терминов
  const allMatches: { index: number; length: number; termName: string }[] = [];

  for (const { patterns, term } of termPatterns) {
    for (const pattern of patterns) {
      const regex = new RegExp(`\\b${pattern}\\b`, "gi");
      let match;
      while ((match = regex.exec(remaining)) !== null) {
        // Проверяем, не пересекается ли с уже найденными
        const overlaps = allMatches.some(
          (m) =>
            (match!.index >= m.index && match!.index < m.index + m.length) ||
            (match!.index + match![0].length > m.index &&
              match!.index + match![0].length <= m.index + m.length)
        );
        if (!overlaps) {
          allMatches.push({
            index: match.index,
            length: match[0].length,
            termName: term.term,
          });
        }
      }
    }
  }

  // Сортируем по позиции
  allMatches.sort((a, b) => a.index - b.index);

  // Если нет совпадений — возвращаем обычный текст
  if (allMatches.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Строим части текста
  let lastIndex = 0;
  for (const match of allMatches) {
    if (match.index > lastIndex) {
      parts.push({ text: remaining.slice(lastIndex, match.index), isTerm: false });
    }
    parts.push({
      text: remaining.slice(match.index, match.index + match.length),
      isTerm: true,
      termName: match.termName,
    });
    lastIndex = match.index + match.length;
  }
  if (lastIndex < remaining.length) {
    parts.push({ text: remaining.slice(lastIndex), isTerm: false });
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.isTerm ? (
          <TermTooltip key={i} term={part.termName!}>
            {part.text}
          </TermTooltip>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </span>
  );
}
