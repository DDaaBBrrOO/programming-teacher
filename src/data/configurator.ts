export interface ConfigOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ConfigStep {
  id: string;
  title: string;
  question: string;
  options: ConfigOption[];
}

export const configSteps: ConfigStep[] = [
  {
    id: "project-type",
    title: "Тип проекта",
    question: "Какой тип приложения вы хотите создать?",
    options: [
      {
        id: "web",
        label: "Веб-приложение",
        description: "Сайт или веб-сервис, работающий в браузере",
        icon: "🌐",
      },
      {
        id: "mobile",
        label: "Мобильное приложение",
        description: "Приложение для смартфонов (iOS/Android)",
        icon: "📱",
      },
      {
        id: "desktop",
        label: "Десктопное приложение",
        description: "Программа для компьютера (Windows/Mac/Linux)",
        icon: "💻",
      },
      {
        id: "bot",
        label: "Бот / Автоматизация",
        description: "Telegram-бот, скрипт автоматизации, парсер",
        icon: "🤖",
      },
    ],
  },
  {
    id: "complexity",
    title: "Сложность",
    question: "Какой уровень сложности вам подходит?",
    options: [
      {
        id: "simple",
        label: "Простой проект",
        description: "1-2 недели, 3-5 экранов, минимум логики",
        icon: "🌱",
      },
      {
        id: "medium",
        label: "Средний проект",
        description: "1-2 месяца, 5-15 экранов, база данных",
        icon: "🌿",
      },
      {
        id: "complex",
        label: "Сложный проект",
        description: "3+ месяца, много экранов, интеграции, API",
        icon: "🌳",
      },
    ],
  },
  {
    id: "experience",
    title: "Ваш опыт",
    question: "Какой у вас опыт в программировании?",
    options: [
      {
        id: "beginner",
        label: "Полный новичок",
        description: "Только начинаю учиться, знаю основы HTML/CSS",
        icon: "🐣",
      },
      {
        id: "some",
        label: "Есть немного опыта",
        description: "Делал(а) учебные проекты, знаю JavaScript/Python",
        icon: "🐥",
      },
      {
        id: "intermediate",
        label: "Средний уровень",
        description: "Работал(а) с фреймворками, делал(а) реальные проекты",
        icon: "🦅",
      },
    ],
  },
  {
    id: "team",
    title: "Команда",
    question: "Вы будете работать один или в команде?",
    options: [
      {
        id: "solo",
        label: "Один",
        description: "Разрабатываю проект самостоятельно",
        icon: "🧑",
      },
      {
        id: "small-team",
        label: "Маленькая команда (2-4)",
        description: "Работаю с друзьями или однокурсниками",
        icon: "👥",
      },
      {
        id: "team",
        label: "Команда (5+)",
        description: "Большая команда с разными ролями",
        icon: "👨‍👩‍👧‍👦",
      },
    ],
  },
  {
    id: "goal",
    title: "Цель проекта",
    question: "Какова основная цель вашего проекта?",
    options: [
      {
        id: "learning",
        label: "Обучение",
        description: "Хочу научиться и получить опыт",
        icon: "📚",
      },
      {
        id: "portfolio",
        label: "Портфолио",
        description: "Хочу показать проект работодателю",
        icon: "💼",
      },
      {
        id: "startup",
        label: "Стартап / Продукт",
        description: "Хочу создать реальный продукт для пользователей",
        icon: "🚀",
      },
      {
        id: "freelance",
        label: "Заказ клиента",
        description: "Делаю проект для конкретного заказчика",
        icon: "📋",
      },
    ],
  },
];

export interface Recommendation {
  title: string;
  description: string;
  icon: string;
  type: "stack" | "methodology" | "tools" | "advice";
}

export function getRecommendations(answers: Record<string, string>): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const projectType = answers["project-type"];
  const complexity = answers["complexity"];
  const experience = answers["experience"];
  const team = answers["team"];
  const goal = answers["goal"];

  // Рекомендации по стеку
  if (projectType === "web") {
    if (experience === "beginner") {
      recommendations.push({
        title: "Стек: HTML + CSS + JavaScript",
        description: "Начните с основ веба. Когда освоитесь — переходите к React или Vue.js. Это самый востребованный путь во фронтенде.",
        icon: "🎨",
        type: "stack",
      });
    } else if (experience === "some") {
      recommendations.push({
        title: "Стек: React + Node.js + PostgreSQL",
        description: "React для интерфейса, Node.js для сервера, PostgreSQL для данных. Популярный и хорошо документированный стек.",
        icon: "⚛️",
        type: "stack",
      });
    } else {
      recommendations.push({
        title: "Стек: Next.js + TypeScript + Prisma",
        description: "Next.js для fullstack-разработки, TypeScript для надёжности, Prisma для работы с базой данных. Современный production-ready стек.",
        icon: "🔷",
        type: "stack",
      });
    }
  } else if (projectType === "mobile") {
    if (experience === "beginner") {
      recommendations.push({
        title: "Стек: React Native или Flutter",
        description: "Кроссплатформенные фреймворки — один код для iOS и Android. React Native если знаете React, Flutter если хотите Dart.",
        icon: "📱",
        type: "stack",
      });
    } else {
      recommendations.push({
        title: "Стек: React Native + Expo",
        description: "Expo упрощает разработку на React Native — быстрая настройка, OTA обновления, простой деплой.",
        icon: "📲",
        type: "stack",
      });
    }
  } else if (projectType === "desktop") {
    recommendations.push({
      title: "Стек: Electron или Tauri",
      description: "Electron — если знаете JavaScript (VS Code, Discord написаны на нём). Tauri — легче и быстрее, но нужен Rust для бэкенда.",
      icon: "🖥️",
      type: "stack",
    });
  } else if (projectType === "bot") {
    if (experience === "beginner") {
      recommendations.push({
        title: "Стек: Python + python-telegram-bot",
        description: "Python — идеальный первый язык. Простой синтаксис, огромная библиотека готовых решений для ботов.",
        icon: "🐍",
        type: "stack",
      });
    } else {
      recommendations.push({
        title: "Стек: Node.js + Telegraf / grammY",
        description: "Если знаете JavaScript — Telegraf или grammY для Telegram-ботов. Быстрая разработка, хорошая документация.",
        icon: "🤖",
        type: "stack",
      });
    }
  }

  // Рекомендации по методологии
  if (team === "solo") {
    recommendations.push({
      title: "Методология: Kanban",
      description: "Для одиночной работы Kanban проще Scrum. Создайте доску с колонками: 'Нужно сделать', 'В работе', 'Готово'. Перемещайте карточки задач.",
      icon: "📋",
      type: "methodology",
    });
  } else {
    recommendations.push({
      title: "Методология: Scrum",
      description: "Для команды Scrum идеален: спринты по 2 недели, ежедневные стендапы, ретроспективы. Все знают, что делать и когда.",
      icon: "🔄",
      type: "methodology",
    });
  }

  // Рекомендации по инструментам
  if (team !== "solo") {
    recommendations.push({
      title: "Инструменты: Git + GitHub + Vercel",
      description: "Git для контроля версий, GitHub для совместной работы, Vercel для автоматического деплоя при каждом push.",
      icon: "🛠️",
      type: "tools",
    });
  } else {
    recommendations.push({
      title: "Инструменты: Git + GitHub + Vercel",
      description: "Даже работая одному, используйте Git! Это ваша 'страховка' — можно откатить любые изменения. GitHub — портфолио + бэкап.",
      icon: "🔧",
      type: "tools",
    });
  }

  // Советы по процессу
  if (goal === "learning") {
    recommendations.push({
      title: "Совет: Фокус на обучении",
      description: "Не гонитесь за идеальным результатом. Главное — понять, КАК это работает. Комментируйте код, ведите дневник обучения, не бойтесь ломать.",
      icon: "🎓",
      type: "advice",
    });
  } else if (goal === "portfolio") {
    recommendations.push({
      title: "Совет: Качество > Количество",
      description: "Лучше 2-3 отличных проекта, чем 10 средних. Добавьте README, скриншоты, живое демо. Работодатель смотрит на качество кода и оформление.",
      icon: "⭐",
      type: "advice",
    });
  } else if (goal === "startup") {
    recommendations.push({
      title: "Совет: MVP и валидация",
      description: "Сделайте MVP за 2-4 недели и покажите реальным пользователям. Не тратьте месяцы на идеальную версию того, что никому не нужно.",
      icon: "🚀",
      type: "advice",
    });
  } else if (goal === "freelance") {
    recommendations.push({
      title: "Совет: Чёткое ТЗ и договор",
      description: "Всегда фиксируйте требования письменно. Обсудите сроки, стоимость, количество правок. Договор защищает обе стороны.",
      icon: "📝",
      type: "advice",
    });
  }

  // Дополнительные советы по сложности
  if (complexity === "simple") {
    recommendations.push({
      title: "Совет: Не усложняйте!",
      description: "Простой проект — это нормально. Сделайте его хорошо до конца, а не идеально наполовину. Завершённый проект ценнее идеального незавершённого.",
      icon: "✅",
      type: "advice",
    });
  } else if (complexity === "complex") {
    recommendations.push({
      title: "Совет: Разбейте на части",
      description: "Большой проект пугает. Разбейте его на маленькие задачи по 2-4 часа каждая. Делайте по одной задаче в день — через месяц удивитесь прогрессу.",
      icon: "🧩",
      type: "advice",
    });
  }

  return recommendations;
}
