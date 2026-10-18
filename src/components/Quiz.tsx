import { useState, useEffect, useMemo } from "react";
import { quizQuestions, quizUnits, type QuizQuestion } from "../data/quiz";
import { SmartText } from "./TermTooltip";

interface UserProgress {
  xp: number;
  streak: number;
  bestStreak: number;
  level: number;
  completedQuestions: number[];
  unitProgress: Record<string, { completed: number; total: number; stars: number }>;
  lastPlayedDate: string;
}

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  level: 1,
  completedQuestions: [],
  unitProgress: {},
  lastPlayedDate: "",
};

function getProgress(): UserProgress {
  try {
    const saved = localStorage.getItem("devpath-quiz-progress");
    if (saved) return JSON.parse(saved);
  } catch {}
  return INITIAL_PROGRESS;
}

function saveProgress(progress: UserProgress) {
  localStorage.setItem("devpath-quiz-progress", JSON.stringify(progress));
}

function getXPForLevel(level: number) {
  return level * 100;
}

export default function Quiz() {
  const [progress, setProgress] = useState<UserProgress>(getProgress());
  const [screen, setScreen] = useState<"home" | "unit" | "quiz" | "result">("home");
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [mode, setMode] = useState<"learn" | "challenge">("learn");

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Обновление streak при входе
  useEffect(() => {
    const today = new Date().toDateString();
    if (progress.lastPlayedDate && progress.lastPlayedDate !== today) {
      const lastDate = new Date(progress.lastPlayedDate);
      const diff = Math.floor((new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 1) {
        setProgress((p) => ({ ...p, streak: 0 }));
      }
    }
  }, []);

  const unitQuestions = useMemo(() => {
    if (!selectedUnit) return [];
    return quizQuestions.filter((q) => q.unit === selectedUnit);
  }, [selectedUnit]);

  const startUnit = (unitId: string, quizMode: "learn" | "challenge") => {
    setSelectedUnit(unitId);
    setMode(quizMode);
    let questions = quizQuestions.filter((q) => q.unit === unitId);
    
    if (quizMode === "challenge") {
      // В режиме челленджа перемешиваем
      questions = [...questions].sort(() => Math.random() - 0.5);
    } else {
      // В режиме обучения — сначала неотвеченные, потом сложные
      questions = questions.sort((a, b) => {
        const aCompleted = progress.completedQuestions.includes(a.id);
        const bCompleted = progress.completedQuestions.includes(b.id);
        if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;
        const diffOrder = { easy: 0, medium: 1, hard: 2 };
        return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      });
    }
    
    setSessionQuestions(questions.slice(0, 10)); // 10 вопросов за сессию
    setCurrentQuestionIndex(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScreen("quiz");
  };

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;
    const question = sessionQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === question.correctAnswer;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setSessionTotal((t) => t + 1);

    if (isCorrect) {
      setSessionCorrect((c) => c + 1);
      const xpGain = question.difficulty === "easy" ? 10 : question.difficulty === "medium" ? 15 : 20;
      
      setProgress((p) => {
        const newXp = p.xp + xpGain;
        const newLevel = Math.floor(newXp / 100) + 1;
        const newCompleted = p.completedQuestions.includes(question.id)
          ? p.completedQuestions
          : [...p.completedQuestions, question.id];
        
        // Обновляем прогресс юнита
        const unitQs = quizQuestions.filter((q) => q.unit === question.unit);
        const unitCompleted = newCompleted.filter((id) => unitQs.some((q) => q.id === id)).length;
        const stars = unitCompleted >= unitQs.length ? 3 : unitCompleted >= unitQs.length * 0.7 ? 2 : unitCompleted > 0 ? 1 : 0;
        
        const today = new Date().toDateString();
        const newStreak = p.lastPlayedDate === today ? p.streak : p.streak + 1;

        return {
          ...p,
          xp: newXp,
          level: newLevel,
          completedQuestions: newCompleted,
          streak: newStreak,
          bestStreak: Math.max(p.bestStreak, newStreak),
          lastPlayedDate: today,
          unitProgress: {
            ...p.unitProgress,
            [question.unit]: {
              completed: unitCompleted,
              total: unitQs.length,
              stars,
            },
          },
        };
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= sessionQuestions.length) {
      setScreen("result");
    } else {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const currentQ = sessionQuestions[currentQuestionIndex];
  const xpForNextLevel = getXPForLevel(progress.level);
  const xpProgress = ((progress.xp % 100) / 100) * 100;

  // ===== ЭКРАН РЕЗУЛЬТАТА =====
  if (screen === "result") {
    const percent = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : percent >= 30 ? 1 : 0;
    const xpEarned = sessionCorrect * (mode === "challenge" ? 15 : 10);

    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-6xl mb-4">
            {percent >= 90 ? "🏆" : percent >= 60 ? "🌟" : percent >= 30 ? "👍" : "💪"}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {percent >= 90 ? "Великолепно!" : percent >= 60 ? "Отлично!" : percent >= 30 ? "Неплохо!" : "Продолжай учиться!"}
          </h2>

          {/* Stars */}
          <div className="flex justify-center gap-2 my-4">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-3xl ${s <= stars ? "" : "opacity-20"}`}>
                ⭐
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-indigo-400">{sessionCorrect}/{sessionTotal}</div>
              <div className="text-xs text-slate-400">Правильно</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-amber-400">+{xpEarned}</div>
              <div className="text-xs text-slate-400">XP</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <div className="text-2xl font-bold text-emerald-400">{progress.streak}</div>
              <div className="text-xs text-slate-400">Серия 🔥</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={() => selectedUnit && startUnit(selectedUnit, mode)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all"
            >
              🔄 Ещё раз
            </button>
            <button
              onClick={() => setScreen("home")}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all border border-white/10"
            >
              📋 К юнитам
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== ЭКРАН ТЕСТА =====
  if (screen === "quiz" && currentQ) {
    const progressPercent = ((currentQuestionIndex + 1) / sessionQuestions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Top bar */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setScreen(selectedUnit ? "unit" : "home")}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <span>🔥</span>
            <span className="text-sm">{progress.streak}</span>
          </div>
        </div>

        {/* Question */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <DifficultyBadge difficulty={currentQ.difficulty} />
            {mode === "challenge" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                ⚡ Челлендж
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold mb-6">
            <SmartText text={currentQ.question} />
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correctAnswer;
              const showCorrect = showExplanation && isCorrect;
              const showWrong = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl text-left transition-all border ${
                    showCorrect
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : showWrong
                      ? "bg-red-500/10 border-red-500/30 text-red-300"
                      : isSelected
                      ? "bg-indigo-500/10 border-indigo-500/30"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5"
                  } ${showExplanation ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        showCorrect
                          ? "bg-emerald-500/20 text-emerald-400"
                          : showWrong
                          ? "bg-red-500/20 text-red-400"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {showCorrect ? "✓" : showWrong ? "✗" : String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm md:text-base">
                      <SmartText text={option} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-5 rounded-xl border mb-6 ${
            selectedAnswer === currentQ.correctAnswer
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-red-500/5 border-red-500/20"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                {selectedAnswer === currentQ.correctAnswer ? "✅" : "❌"}
              </span>
              <h4 className="font-semibold">
                {selectedAnswer === currentQ.correctAnswer ? "Правильно!" : "Неправильно"}
              </h4>
              {selectedAnswer === currentQ.correctAnswer && (
                <span className="text-amber-400 text-sm font-bold ml-auto">
                  +{currentQ.difficulty === "easy" ? 10 : currentQ.difficulty === "medium" ? 15 : 20} XP
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300">
              <SmartText text={currentQ.explanation} />
            </p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <div className="text-center">
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all hover:scale-105"
            >
              {currentQuestionIndex + 1 >= sessionQuestions.length
                ? "🏁 Завершить"
                : "→ Дальше"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ===== ЭКРАН ЮНИТА =====
  if (screen === "unit" && selectedUnit) {
    const unit = quizUnits.find((u) => u.id === selectedUnit);
    const unitData = progress.unitProgress[selectedUnit] || { completed: 0, total: unitQuestions.length, stars: 0 };
    const unitPercent = Math.round((unitData.completed / unitData.total) * 100);

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <button
          onClick={() => setScreen("home")}
          className="mb-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Назад к юнитам
        </button>

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{unit?.icon}</div>
          <h1 className="text-3xl font-bold mb-2">{unit?.title}</h1>
          <p className="text-slate-400">{unit?.description}</p>
        </div>

        {/* Unit progress */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Прогресс юнита</span>
            <span className="text-sm font-bold text-indigo-400">{unitData.completed}/{unitData.total}</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${unitPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-2xl ${s <= unitData.stars ? "" : "opacity-20"}`}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Mode selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => startUnit(selectedUnit, "learn")}
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-left hover:scale-[1.02]"
          >
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-lg font-bold mb-1">Режим обучения</h3>
            <p className="text-sm text-slate-400">
              Вопросы от простых к сложным. Сначала неотвеченные. С объяснениями.
            </p>
          </button>
          <button
            onClick={() => startUnit(selectedUnit, "challenge")}
            className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-600/5 border border-red-500/20 hover:border-red-500/40 transition-all text-left hover:scale-[1.02]"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-bold mb-1">Режим челленджа</h3>
            <p className="text-sm text-slate-400">
              Случайный порядок. Больше XP за правильные ответы. Проверь себя!
            </p>
          </button>
        </div>

        {/* Questions list */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-3">Все вопросы юнита:</h3>
          {unitQuestions.map((q, i) => {
            const isCompleted = progress.completedQuestions.includes(q.id);
            return (
              <div
                key={q.id}
                className={`p-3 rounded-lg border flex items-center gap-3 ${
                  isCompleted
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-white/[0.02] border-white/10"
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCompleted ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-slate-400"
                }`}>
                  {isCompleted ? "✓" : i + 1}
                </span>
                <span className="text-sm flex-1">
                  <SmartText text={q.question} />
                </span>
                <DifficultyBadge difficulty={q.difficulty} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== ГЛАВНЫЙ ЭКРАН =====
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">🧪 Тренажёр знаний</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Проходите юниты, зарабатывайте XP и запоминайте термины через практику!
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <StatBox icon="⭐" label="Уровень" value={String(progress.level)} color="amber" />
        <StatBox icon="💎" label="XP" value={String(progress.xp)} color="indigo" />
        <StatBox icon="🔥" label="Серия дней" value={String(progress.streak)} color="red" />
        <StatBox icon="✅" label="Решено" value={String(progress.completedQuestions.length)} color="emerald" />
      </div>

      {/* Level progress */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Уровень {progress.level}</span>
          <span className="text-sm text-slate-400">
            {progress.xp % 100} / 100 XP до уровня {progress.level + 1}
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Units grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {quizUnits.map((unit) => {
          const unitQs = quizQuestions.filter((q) => q.unit === unit.id);
          const unitData = progress.unitProgress[unit.id] || { completed: 0, total: unitQs.length, stars: 0 };
          const percent = Math.round((unitData.completed / unitData.total) * 100);

          return (
            <button
              key={unit.id}
              onClick={() => {
                setSelectedUnit(unit.id);
                setScreen("unit");
              }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-left hover:scale-[1.01] hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{unit.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1">{unit.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{unit.description}</p>
                  
                  {/* Progress */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      {unitData.completed}/{unitData.total}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3].map((s) => (
                      <span key={s} className={`text-sm ${s <= unitData.stars ? "" : "opacity-20"}`}>
                        ⭐
                      </span>
                    ))}
                    {percent === 100 && (
                      <span className="text-xs text-emerald-400 ml-2">Пройден!</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h3 className="font-bold mb-2">💡 Как учиться эффективнее:</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Проходите по 1 юниту в день — так информация лучше запоминается</li>
          <li>• В режиме обучения вопросы идут от простого к сложному</li>
          <li>• В режиме челленджа — больше XP за правильные ответы</li>
          <li>• Поддерживайте серию (streak) — ежедневная практика даёт лучший результат</li>
          <li>• Наводите на подчёркнутые термины для быстрых подсказок</li>
        </ul>
      </div>
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const config: Record<string, { label: string; color: string }> = {
    easy: { label: "Лёгкий", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    medium: { label: "Средний", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    hard: { label: "Сложный", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  };
  const { label, color } = config[difficulty] || config.easy;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

function StatBox({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
    indigo: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20",
    red: "from-red-500/10 to-red-600/5 border-red-500/20",
    emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
  };

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} border text-center`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
