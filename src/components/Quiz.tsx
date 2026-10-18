import { useState, useMemo } from "react";
import { quizQuestions } from "../data/quiz";
import { SmartText } from "./TermTooltip";

type Difficulty = "all" | "easy" | "medium" | "hard";

interface QuizState {
  currentQuestion: number;
  answers: Record<number, number>;
  showResult: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
}

export default function Quiz() {
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [quizStarted, setQuizStarted] = useState(false);
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    showResult: false,
    selectedAnswer: null,
    showExplanation: false,
  });

  const filteredQuestions = useMemo(() => {
    if (difficulty === "all") return quizQuestions;
    return quizQuestions.filter((q) => q.difficulty === difficulty);
  }, [difficulty]);

  const currentQ = filteredQuestions[state.currentQuestion];
  const totalQuestions = filteredQuestions.length;
  const correctAnswers = Object.entries(state.answers).filter(
    ([qIndex, answer]) =>
      filteredQuestions[parseInt(qIndex)]?.correctAnswer === answer
  ).length;

  const handleAnswer = (answerIndex: number) => {
    if (state.showExplanation) return;
    setState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
      answers: { ...prev.answers, [prev.currentQuestion]: answerIndex },
      showExplanation: true,
    }));
  };

  const nextQuestion = () => {
    if (state.currentQuestion + 1 >= totalQuestions) {
      setState((prev) => ({ ...prev, showResult: true }));
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showExplanation: false,
      }));
    }
  };

  const restartQuiz = () => {
    setState({
      currentQuestion: 0,
      answers: {},
      showResult: false,
      selectedAnswer: null,
      showExplanation: false,
    });
  };

  const getScoreMessage = () => {
    const percent = (correctAnswers / totalQuestions) * 100;
    if (percent >= 90) return { emoji: "🏆", text: "Великолепно! Вы отлично разбираетесь в разработке!" };
    if (percent >= 70) return { emoji: "🌟", text: "Отлично! У вас хорошие знания основ." };
    if (percent >= 50) return { emoji: "👍", text: "Неплохо! Но есть куда расти. Повторите глоссарий." };
    if (percent >= 30) return { emoji: "📚", text: "Стоит ещё раз изучить этапы и термины." };
    return { emoji: "💪", text: "Не расстраивайтесь! Изучите материалы и попробуйте снова." };
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🧪 Проверка знаний</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Проверьте, насколько хорошо вы усвоили материал. Вопросы идут от простых к сложным.
            После каждого ответа вы получите объяснение.
          </p>
        </div>

        {/* Difficulty selection */}
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-center text-lg font-semibold mb-4">Выберите уровень сложности:</h3>
          <div className="grid grid-cols-2 gap-3">
            <DifficultyCard
              active={difficulty === "all"}
              onClick={() => setDifficulty("all")}
              emoji="📊"
              title="Все вопросы"
              count={quizQuestions.length}
              color="indigo"
            />
            <DifficultyCard
              active={difficulty === "easy"}
              onClick={() => setDifficulty("easy")}
              emoji="🌱"
              title="Лёгкие"
              count={quizQuestions.filter((q) => q.difficulty === "easy").length}
              color="emerald"
            />
            <DifficultyCard
              active={difficulty === "medium"}
              onClick={() => setDifficulty("medium")}
              emoji="🌿"
              title="Средние"
              count={quizQuestions.filter((q) => q.difficulty === "medium").length}
              color="amber"
            />
            <DifficultyCard
              active={difficulty === "hard"}
              onClick={() => setDifficulty("hard")}
              emoji="🌳"
              title="Сложные"
              count={quizQuestions.filter((q) => q.difficulty === "hard").length}
              color="red"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setQuizStarted(true);
              restartQuiz();
            }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-indigo-500/25"
          >
            🚀 Начать тест ({filteredQuestions.length} вопросов)
          </button>
        </div>
      </div>
    );
  }

  if (state.showResult) {
    const scoreMessage = getScoreMessage();
    const percent = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-6xl mb-4">{scoreMessage.emoji}</div>
          <h2 className="text-3xl font-bold mb-2">Результат</h2>
          <div className="text-5xl font-bold my-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {correctAnswers} / {totalQuestions}
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 mb-4">
            <div
              className={`h-4 rounded-full transition-all ${
                percent >= 70 ? "bg-emerald-500" : percent >= 40 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="text-xl text-slate-300 mb-6">{scoreMessage.text}</p>
          <p className="text-slate-400 mb-8">
            Правильных ответов: {percent}%
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all"
            >
              🔄 Пройти ещё раз
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all border border-white/10"
            >
              ← Изменить сложность
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            Вопрос {state.currentQuestion + 1} из {totalQuestions}
          </span>
          <span className="text-sm text-slate-400">
            ✅ {correctAnswers} правильных
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-indigo-500 transition-all"
            style={{
              width: `${((state.currentQuestion + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <DifficultyBadge difficulty={currentQ.difficulty} />
          <span className="text-xs text-slate-500">{currentQ.category}</span>
        </div>
        <h2 className="text-xl font-bold mb-6"><SmartText text={currentQ.question} /></h2>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            const isSelected = state.selectedAnswer === index;
            const isCorrect = index === currentQ.correctAnswer;
            const showCorrect = state.showExplanation && isCorrect;
            const showWrong = state.showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={state.showExplanation}
                className={`w-full p-4 rounded-xl text-left transition-all border ${
                  showCorrect
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : showWrong
                    ? "bg-red-500/10 border-red-500/30 text-red-300"
                    : isSelected
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5"
                } ${state.showExplanation ? "cursor-default" : "cursor-pointer"}`}
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
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-sm md:text-base"><SmartText text={option} /></span>
                  {showCorrect && <span className="ml-auto">✅</span>}
                  {showWrong && <span className="ml-auto">❌</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {state.showExplanation && (
        <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 mb-6">
          <h4 className="font-semibold text-indigo-300 mb-2">💡 Объяснение:</h4>
          <p className="text-sm text-slate-300"><SmartText text={currentQ.explanation} /></p>
        </div>
      )}

      {/* Next button */}
      {state.showExplanation && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all hover:scale-105"
          >
            {state.currentQuestion + 1 >= totalQuestions
              ? "📊 Показать результат"
              : "→ Следующий вопрос"}
          </button>
        </div>
      )}
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

function DifficultyCard({ active, onClick, emoji, title, count, color }: {
  active: boolean;
  onClick: () => void;
  emoji: string;
  title: string;
  count: number;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    indigo: active ? "border-indigo-500/50 bg-indigo-500/10" : "border-white/10 hover:border-indigo-500/30",
    emerald: active ? "border-emerald-500/50 bg-emerald-500/10" : "border-white/10 hover:border-emerald-500/30",
    amber: active ? "border-amber-500/50 bg-amber-500/10" : "border-white/10 hover:border-amber-500/30",
    red: active ? "border-red-500/50 bg-red-500/10" : "border-white/10 hover:border-red-500/30",
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all ${colorClasses[color]}`}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-slate-400">{count} вопросов</div>
    </button>
  );
}
