import { useState } from "react";
import { configSteps, getRecommendations, type Recommendation } from "../data/configurator";

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const step = configSteps[currentStep];
  const totalSteps = configSteps.length;
  const progress = ((currentStep + (showResults ? 1 : 0)) / totalSteps) * 100;

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [step.id]: optionId };
    setAnswers(newAnswers);

    if (currentStep + 1 >= totalSteps) {
      setShowResults(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = showResults ? getRecommendations(answers) : [];

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🎯 Ваш персональный план</h1>
          <p className="text-slate-300 text-lg">
            На основе ваших ответов мы подготовили рекомендации
          </p>
        </div>

        {/* Summary of answers */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h3 className="font-semibold text-lg mb-4">📝 Ваши ответы:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {configSteps.map((s) => {
              const selectedOption = s.options.find((o) => o.id === answers[s.id]);
              return (
                <div key={s.id} className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">{s.title}:</span>
                  <span className="text-indigo-300 font-medium">
                    {selectedOption?.icon} {selectedOption?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} recommendation={rec} index={i} />
          ))}
        </div>

        {/* Roadmap */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <h3 className="text-xl font-bold mb-4">🗺️ Ваш роадмап:</h3>
          <div className="space-y-3">
            <RoadmapStep number={1} text="Изучите основы выбранного стека (1-2 недели)" />
            <RoadmapStep number={2} text="Сделайте wireframe и спроектируйте архитектуру (2-3 дня)" />
            <RoadmapStep number={3} text="Настройте Git репозиторий и среду разработки (1 день)" />
            <RoadmapStep number={4} text="Разработайте MVP — минимальную рабочую версию (2-4 недели)" />
            <RoadmapStep number={5} text="Протестируйте приложение и попросите друзей попробовать (3-5 дней)" />
            <RoadmapStep number={6} text="Задеплойте на хостинг и покажите миру! (1 день)" />
            <RoadmapStep number={7} text="Соберите обратную связь и запланируйте улучшения" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={restart}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all hover:scale-105"
          >
            🔄 Пройти заново
          </button>
          <button
            onClick={goBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all border border-white/10"
          >
            ← Изменить ответы
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">⚙️ Конфигуратор пути</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Ответьте на несколько вопросов, и мы подберём оптимальный путь разработки,
          технологии и инструменты именно для вас.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            Шаг {currentStep + 1} из {totalSteps}
          </span>
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Назад
          </button>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Step indicators */}
        <div className="flex justify-between mt-2">
          {configSteps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i <= currentStep ? "bg-indigo-500" : "bg-white/20"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 block">{step.title === "Тип проекта" ? "🎯" : step.title === "Сложность" ? "📊" : step.title === "Ваш опыт" ? "🎓" : step.title === "Команда" ? "👥" : "🏆"}</span>
          <h2 className="text-2xl font-bold">{step.question}</h2>
        </div>

        <div className="grid gap-3">
          {step.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                answers[step.id] === option.id
                  ? "bg-indigo-500/10 border-indigo-500/30"
                  : "bg-white/[0.02] border-white/10 hover:border-indigo-500/20 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm text-slate-400">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation, index }: { recommendation: Recommendation; index: number }) {
  const typeColors: Record<string, string> = {
    stack: "from-blue-500/10 to-cyan-500/5 border-blue-500/20",
    methodology: "from-purple-500/10 to-pink-500/5 border-purple-500/20",
    tools: "from-amber-500/10 to-orange-500/5 border-amber-500/20",
    advice: "from-emerald-500/10 to-teal-500/5 border-emerald-500/20",
  };

  const typeLabels: Record<string, string> = {
    stack: "🔧 Стек технологий",
    methodology: "🔄 Методология",
    tools: "🛠 Инструменты",
    advice: "💡 Совет",
  };

  return (
    <div
      className={`p-5 rounded-xl bg-gradient-to-r ${typeColors[recommendation.type]} border transition-all hover:scale-[1.005]`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{recommendation.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold">{recommendation.title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
              {typeLabels[recommendation.type]}
            </span>
          </div>
          <p className="text-sm text-slate-300">{recommendation.description}</p>
        </div>
      </div>
    </div>
  );
}

function RoadmapStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300 shrink-0">
        {number}
      </div>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
