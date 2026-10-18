import { type Page } from "../App";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center py-16 md:py-24">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
          🎯 Для начинающих разработчиков
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
          От идеи к продукту
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
          Пошаговый гид по разработке приложений. Узнайте все этапы, выучите термины, проверьте знания и выберите свой путь.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate("stages")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-500/25"
          >
            📋 Изучить этапы
          </button>
          <button
            onClick={() => onNavigate("configurator")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            ⚙️ Подобрать путь
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
        <FeatureCard
          icon="📋"
          title="10 этапов разработки"
          description="От идеи до итераций — полный путь создания приложения с описанием каждого шага"
          onClick={() => onNavigate("stages")}
          color="indigo"
        />
        <FeatureCard
          icon="📖"
          title="30+ терминов"
          description="Расшифровка всех профессиональных терминов с примерами из реальной жизни"
          onClick={() => onNavigate("glossary")}
          color="emerald"
        />
        <FeatureCard
          icon="🧪"
          title="Тестирование знаний"
          description="Проверьте себя: вопросы от простых к сложным с подробными объяснениями"
          onClick={() => onNavigate("quiz")}
          color="amber"
        />
        <FeatureCard
          icon="⚙️"
          title="Конфигуратор пути"
          description="Ответьте на вопросы и получите персональные рекомендации по стеку и процессу"
          onClick={() => onNavigate("configurator")}
          color="purple"
        />
      </section>

      {/* Quick stats */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard number="10" label="Этапов разработки" />
          <StatCard number="30+" label="Терминов в глоссарии" />
          <StatCard number="24" label="Вопросов в тестах" />
          <StatCard number="5" label="Шагов конфигуратора" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Как пользоваться</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            step={1}
            title="Изучите этапы"
            description="Пройдитесь по всем этапам разработки. Узнайте, какие обязательны, а какие можно пропустить."
          />
          <StepCard
            step={2}
            title="Выучите термины"
            description="Используйте глоссарий как справочник. Все термины объяснены простым языком с примерами."
          />
          <StepCard
            step={3}
            title="Проверьте себя"
            description="Пройдите тесты и используйте конфигуратор для подбора оптимального пути разработки."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick, color }: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    indigo: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 hover:border-indigo-500/40",
    emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40",
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40",
  };

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border text-left transition-all hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </button>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
        {step}
      </div>
      <h3 className="text-lg font-bold mb-2 mt-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
