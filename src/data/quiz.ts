export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  unit: string;
}

export interface QuizUnit {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export const quizUnits: QuizUnit[] = [
  { id: "basics", title: "Основы разработки", icon: "🏗️", description: "Базовые понятия и этапы", color: "indigo" },
  { id: "methodologies", title: "Методологии", icon: "🔄", description: "Agile, Scrum, Kanban", color: "emerald" },
  { id: "frontend", title: "Фронтенд", icon: "🎨", description: "HTML, CSS, JavaScript", color: "amber" },
  { id: "backend", title: "Бэкенд", icon: "⚙️", description: "Серверы, API, базы данных", color: "purple" },
  { id: "tools", title: "Инструменты", icon: "🛠️", description: "Git, IDE, терминал", color: "cyan" },
  { id: "design", title: "Дизайн", icon: "✏️", description: "UX, UI, прототипы", color: "pink" },
  { id: "testing", title: "Тестирование", icon: "🧪", description: "Виды тестов, баги", color: "orange" },
  { id: "deploy", title: "Деплой и хостинг", icon: "🚀", description: "Серверы, домены, CI/CD", color: "blue" },
  { id: "security", title: "Безопасность", icon: "🔒", description: "Защита, шифрование", color: "red" },
  { id: "principles", title: "Принципы", icon: "💎", description: "KISS, DRY, SOLID", color: "violet" },
];

export const quizQuestions: QuizQuestion[] = [
  // ===== ЮНИТ 1: ОСНОВЫ РАЗРАБОТКИ (10 вопросов) =====
  {
    id: 1, question: "Что такое MVP?",
    options: ["Most Valuable Player", "Minimum Viable Product — минимально жизнеспособный продукт", "Maximum Visual Performance", "Main Version Package"],
    correctAnswer: 1, explanation: "MVP — версия продукта с минимальным набором функций для получения обратной связи от первых пользователей.",
    difficulty: "easy", unit: "basics",
  },
  {
    id: 2, question: "С чего начинается разработка приложения?",
    options: ["С написания кода", "С выбора технологий", "С определения идеи и цели", "С дизайна интерфейса"],
    correctAnswer: 2, explanation: "Любой проект начинается с идеи — нужно понять, какую проблему решает приложение и для кого оно.",
    difficulty: "easy", unit: "basics",
  },
  {
    id: 3, question: "Что такое Fullstack-разработчик?",
    options: ["Только фронтенд-разработчик", "Только бэкенд-разработчик", "Разработчик, работающий и с фронтендом, и с бэкендом", "Разработчик мобильных приложений"],
    correctAnswer: 2, explanation: "Fullstack — разработчик, владеющий полным стеком технологий: от интерфейса (фронтенд) до сервера (бэкенд).",
    difficulty: "easy", unit: "basics",
  },
  {
    id: 4, question: "Что такое технический долг?",
    options: ["Деньги на серверы", "Накопленные проблемы из-за некачественных решений", "Стоимость лицензии", "Долг перед инвесторами"],
    correctAnswer: 1, explanation: "Технический долг — последствия быстрых/грязных решений. Чем дольше не исправляешь, тем дороже обходится.",
    difficulty: "medium", unit: "basics",
  },
  {
    id: 5, question: "Что такое прототип приложения?",
    options: ["Готовый продукт", "Упрощённая модель для демонстрации идеи", "База данных", "Серверная часть"],
    correctAnswer: 1, explanation: "Прототип — упрощённая, часто интерактивная модель приложения для проверки идеи до начала разработки.",
    difficulty: "easy", unit: "basics",
  },
  {
    id: 6, question: "Что такое User Story?",
    options: ["История компании", "Описание функции с точки зрения пользователя", "Лог действий", "Техническое задание"],
    correctAnswer: 1, explanation: "User Story — формат: 'Как [роль], я хочу [действие], чтобы [цель]'. Описывает функцию глазами пользователя.",
    difficulty: "medium", unit: "basics",
  },
  {
    id: 7, question: "Что такое бэклог проекта?",
    options: ["Журнал ошибок", "Приоритизированный список всех задач", "Резервная копия", "Лог сервера"],
    correctAnswer: 1, explanation: "Бэклог — упорядоченный по приоритету список задач, функций и улучшений, которые нужно сделать.",
    difficulty: "medium", unit: "basics",
  },
  {
    id: 8, question: "Какой этап разработки идёт первым?",
    options: ["Написание кода", "Тестирование", "Сбор и анализ требований", "Деплой на сервер"],
    correctAnswer: 2, explanation: "Сначала нужно понять, ЧТО делать (требования), потом КАК делать (дизайн), и только потом писать код.",
    difficulty: "easy", unit: "basics",
  },
  {
    id: 9, question: "Что такое итерация в разработке?",
    options: ["Ошибка в коде", "Повторный цикл разработки с улучшениями", "Удаление проекта", "Финальная версия"],
    correctAnswer: 1, explanation: "Итерация — повторный цикл, в котором продукт улучшается. После каждой итерации — рабочая версия с новыми функциями.",
    difficulty: "medium", unit: "basics",
  },
  {
    id: 10, question: "Что такое Proof of Concept (PoC)?",
    options: ["Финальный продукт", "Доказательство работоспособности идеи", "Тест производительности", "Документация"],
    correctAnswer: 1, explanation: "PoC — небольшая реализация для проверки, что идея технически возможна. Делается до полноценной разработки.",
    difficulty: "hard", unit: "basics",
  },

  // ===== ЮНИТ 2: МЕТОДОЛОГИИ (10 вопросов) =====
  {
    id: 11, question: "Что такое Agile?",
    options: ["Язык программирования", "Гибкая методология с короткими итерациями", "Тип базы данных", "Инструмент тестирования"],
    correctAnswer: 1, explanation: "Agile — семейство гибких методологий с итеративным подходом и быстрой адаптацией к изменениям.",
    difficulty: "easy", unit: "methodologies",
  },
  {
    id: 12, question: "Что такое спринт в Scrum?",
    options: ["Быстрая разработка", "Фиксированный период (1-4 недели) для выполнения работы", "Экстренное исправление", "Тестирование в сжатые сроки"],
    correctAnswer: 1, explanation: "Спринт — фиксированный промежуток времени (обычно 2 недели), за который команда выполняет запланированный объём работы.",
    difficulty: "medium", unit: "methodologies",
  },
  {
    id: 13, question: "Что такое Daily Standup (ежедневный стендап)?",
    options: ["Долгое совещание раз в месяц", "Короткая (15 мин) ежедневная встреча команды", "Тренировка разработчиков", "Презентация заказчику"],
    correctAnswer: 1, explanation: "Daily Standup — ежедневная 15-минутная встреча: что сделал, что буду делать, какие препятствия.",
    difficulty: "medium", unit: "methodologies",
  },
  {
    id: 14, question: "Какой порядок этапов в Waterfall?",
    options: ["Дизайн → Требования → Разработка", "Требования → Дизайн → Разработка → Тестирование", "Разработка → Тестирование → Дизайн", "Тестирование → Разработка → Дизайн"],
    correctAnswer: 1, explanation: "Waterfall (Водопад): требования → дизайн → разработка → тестирование → внедрение. Каждый этап завершается полностью.",
    difficulty: "medium", unit: "methodologies",
  },
  {
    id: 15, question: "Что такое Kanban?",
    options: ["Язык программирования", "Метод визуализации рабочего процесса с доской задач", "Тип тестирования", "База данных"],
    correctAnswer: 1, explanation: "Kanban — метод с доской (To Do → In Progress → Done). Задачи перемещаются по колонкам по мере выполнения.",
    difficulty: "medium", unit: "methodologies",
  },
  {
    id: 16, question: "Что такое ретроспектива в Scrum?",
    options: ["Планирование следующего спринта", "Встреча для анализа прошедшего спринта и поиска улучшений", "Демонстрация продукта заказчику", "Написание документации"],
    correctAnswer: 1, explanation: "Ретроспектива — встреча в конце спринта: что прошло хорошо, что можно улучшить, какие действия предпринять.",
    difficulty: "hard", unit: "methodologies",
  },
  {
    id: 17, question: "Кто такой Scrum Master?",
    options: ["Главный программист", "Человек, помогающий команде следовать процессу Scrum", "Заказчик проекта", "Тестировщик"],
    correctAnswer: 1, explanation: "Scrum Master — фасилитатор, который помогает команде работать по Scrum, убирает препятствия, следит за процессом.",
    difficulty: "hard", unit: "methodologies",
  },
  {
    id: 18, question: "Что такое Product Owner?",
    options: ["Владелец компании", "Человек, определяющий приоритеты и видение продукта", "Главный разработчик", "Дизайнер"],
    correctAnswer: 1, explanation: "Product Owner — отвечает за видение продукта, приоритизацию бэклога и максимизацию ценности для пользователей.",
    difficulty: "hard", unit: "methodologies",
  },
  {
    id: 19, question: "В чём главное отличие Agile от Waterfall?",
    options: ["Agile быстрее", "Agile допускает изменения в процессе, Waterfall — нет", "Waterfall дешевле", "Ничем не отличаются"],
    correctAnswer: 1, explanation: "Agile гибок — можно менять требования по ходу. Waterfall требует чёткого плана в начале, изменения дороги.",
    difficulty: "medium", unit: "methodologies",
  },
  {
    id: 20, question: "Что такое MoSCoW-метод приоритизации?",
    options: ["Метод тестирования", "Must have / Should have / Could have / Won't have", "Метод кодирования", "Тип архитектуры"],
    correctAnswer: 1, explanation: "MoSCoW — расстановка приоритетов: обязательно (Must), желательно (Should), можно (Could), не сейчас (Won't).",
    difficulty: "hard", unit: "methodologies",
  },

  // ===== ЮНИТ 3: ФРОНТЕНД (10 вопросов) =====
  {
    id: 21, question: "Что такое Frontend?",
    options: ["Серверная часть", "Клиентская часть — то, что видит пользователь", "База данных", "Сетевая часть"],
    correctAnswer: 1, explanation: "Frontend — всё, что видит пользователь: интерфейс, анимации, кнопки. Технологии: HTML, CSS, JavaScript.",
    difficulty: "easy", unit: "frontend",
  },
  {
    id: 22, question: "Для чего нужен HTML?",
    options: ["Для стилизации страницы", "Для структуры и содержания страницы", "Для логики приложения", "Для работы с сервером"],
    correctAnswer: 1, explanation: "HTML (HyperText Markup Language) — разметка структуры: заголовки, абзацы, ссылки, изображения.",
    difficulty: "easy", unit: "frontend",
  },
  {
    id: 23, question: "Для чего нужен CSS?",
    options: ["Для структуры страницы", "Для стилизации и внешнего вида", "Для логики", "Для работы с базой данных"],
    correctAnswer: 1, explanation: "CSS (Cascading Style Sheets) — стили: цвета, шрифты, отступы, анимации, расположение элементов.",
    difficulty: "easy", unit: "frontend",
  },
  {
    id: 24, question: "Для чего нужен JavaScript?",
    options: ["Только для стилей", "Для интерактивности и логики на странице", "Только для серверов", "Для создания баз данных"],
    correctAnswer: 1, explanation: "JavaScript — язык программирования для веба: обработка кликов, отправка запросов, динамическое обновление контента.",
    difficulty: "easy", unit: "frontend",
  },
  {
    id: 25, question: "Что такое React?",
    options: ["База данных", "JavaScript-библиотека для создания интерфейсов", "Операционная система", "Язык программирования"],
    correctAnswer: 1, explanation: "React — популярная библиотека от Facebook для создания пользовательских интерфейсов из компонентов.",
    difficulty: "easy", unit: "frontend",
  },
  {
    id: 26, question: "Что такое компонент в React?",
    options: ["Файл стилей", "Переиспользуемый блок интерфейса со своей логикой", "База данных", "Серверный скрипт"],
    correctAnswer: 1, explanation: "Компонент — самостоятельный блок UI (кнопка, форма, карточка) с собственной логикой и состоянием.",
    difficulty: "medium", unit: "frontend",
  },
  {
    id: 27, question: "Что такое responsive design?",
    options: ["Быстрая загрузка", "Адаптация под разные размеры экранов", "Тёмная тема", "Анимации"],
    correctAnswer: 1, explanation: "Responsive — интерфейс автоматически подстраивается под телефон, планшет, десктоп.",
    difficulty: "easy", unit: "frontend",
  },
  {
    id: 28, question: "Что такое DOM (Document Object Model)?",
    options: ["Тип базы данных", "Представление HTML-документа в виде дерева объектов", "Язык программирования", "Протокол передачи данных"],
    correctAnswer: 1, explanation: "DOM — дерево объектов HTML-страницы. JavaScript может изменять DOM, обновляя страницу без перезагрузки.",
    difficulty: "hard", unit: "frontend",
  },
  {
    id: 29, question: "Что такое state (состояние) в React?",
    options: ["Страна пользователя", "Данные, которые могут меняться и обновлять интерфейс", "Тип компонента", "Название файла"],
    correctAnswer: 1, explanation: "State — данные компонента, при изменении которых React автоматически перерисовывает интерфейс.",
    difficulty: "medium", unit: "frontend",
  },
  {
    id: 30, question: "Что такое Flexbox в CSS?",
    options: ["JavaScript-библиотека", "Модель разметки для гибкого расположения элементов", "Тип шрифта", "Анимация"],
    correctAnswer: 1, explanation: "Flexbox — CSS-модель для выравнивания и распределения пространства между элементами в контейнере.",
    difficulty: "medium", unit: "frontend",
  },

  // ===== ЮНИТ 4: БЭКЕНД (10 вопросов) =====
  {
    id: 31, question: "Что такое Backend?",
    options: ["Визуальная часть сайта", "Серверная часть — логика и данные", "Дизайн", "Анимации"],
    correctAnswer: 1, explanation: "Backend — серверная часть: обработка запросов, работа с базой данных, бизнес-логика. Невидима для пользователя.",
    difficulty: "easy", unit: "backend",
  },
  {
    id: 32, question: "Что такое API?",
    options: ["Тип дизайна", "Интерфейс для взаимодействия программ", "Язык программирования", "База данных"],
    correctAnswer: 1, explanation: "API — набор правил, позволяющих программам общаться. Как меню в ресторане: заказ → кухня → блюдо.",
    difficulty: "easy", unit: "backend",
  },
  {
    id: 33, question: "Что такое REST API?",
    options: ["Отдых программиста", "Архитектурный стиль API с HTTP-методами", "Тип базы данных", "Фреймворк"],
    correctAnswer: 1, explanation: "REST — стиль API: GET (получить), POST (создать), PUT (обновить), DELETE (удалить). Использует HTTP.",
    difficulty: "medium", unit: "backend",
  },
  {
    id: 34, question: "Что такое база данных?",
    options: ["Редактор кода", "Организованное хранилище данных", "Тип сервера", "Язык программирования"],
    correctAnswer: 1, explanation: "База данных — система хранения и управления данными: поиск, добавление, изменение, удаление информации.",
    difficulty: "easy", unit: "backend",
  },
  {
    id: 35, question: "Чем SQL отличается от NoSQL?",
    options: ["SQL быстрее", "SQL — табличные данные со связями, NoSQL — гибкие документы", "NoSQL новее и лучше", "Ничем не отличаются"],
    correctAnswer: 1, explanation: "SQL (PostgreSQL, MySQL) — таблицы со строгими связями. NoSQL (MongoDB) — документы/ключи, гибкая структура.",
    difficulty: "medium", unit: "backend",
  },
  {
    id: 36, question: "Что такое HTTP-метод GET?",
    options: ["Создание ресурса", "Получение данных", "Удаление данных", "Обновление данных"],
    correctAnswer: 1, explanation: "GET — запрос на получение данных. Например, GET /api/users — получить список пользователей.",
    difficulty: "easy", unit: "backend",
  },
  {
    id: 37, question: "Что такое HTTP-метод POST?",
    options: ["Получение данных", "Создание нового ресурса", "Удаление данных", "Обновление данных"],
    correctAnswer: 1, explanation: "POST — создание нового ресурса. Например, POST /api/users с данными — создать нового пользователя.",
    difficulty: "easy", unit: "backend",
  },
  {
    id: 38, question: "Что такое JSON?",
    options: ["Язык программирования", "Формат обмена данными (текстовый)", "База данных", "Протокол передачи"],
    correctAnswer: 1, explanation: "JSON (JavaScript Object Notation) — текстовый формат данных: {\"name\": \"Иван\", \"age\": 25}. Используется в API.",
    difficulty: "medium", unit: "backend",
  },
  {
    id: 39, question: "Что такое сервер?",
    options: ["Компьютер пользователя", "Компьютер/программа, обслуживающая запросы клиентов", "Тип базы данных", "Редактор кода"],
    correctAnswer: 1, explanation: "Сервер — компьютер или программа, которая принимает запросы от клиентов (браузеров) и отправляет ответы.",
    difficulty: "easy", unit: "backend",
  },
  {
    id: 40, question: "Что такое ORM (Object-Relational Mapping)?",
    options: ["Тип дизайна", "Технология для работы с БД через объекты вместо SQL", "Протокол безопасности", "Метод тестирования"],
    correctAnswer: 1, explanation: "ORM позволяет работать с базой данных как с объектами в коде. Примеры: Prisma, Sequelize, Django ORM.",
    difficulty: "hard", unit: "backend",
  },

  // ===== ЮНИТ 5: ИНСТРУМЕНТЫ (10 вопросов) =====
  {
    id: 41, question: "Что такое Git?",
    options: ["Редактор кода", "Система контроля версий", "База данных", "Язык программирования"],
    correctAnswer: 1, explanation: "Git — система контроля версий: отслеживает изменения в коде, позволяет возвращаться к прошлым версиям.",
    difficulty: "easy", unit: "tools",
  },
  {
    id: 42, question: "Что такое коммит (commit)?",
    options: ["Удаление файла", "Фиксация изменений в Git с описанием", "Создание проекта", "Отправка на сервер"],
    correctAnswer: 1, explanation: "Коммит — 'сохранение' текущего состояния кода в Git с сообщением о том, что было изменено.",
    difficulty: "easy", unit: "tools",
  },
  {
    id: 43, question: "Что такое ветка (branch) в Git?",
    options: ["Тип файла", "Параллельная линия разработки", "Команда Git", "Ошибка в коде"],
    correctAnswer: 1, explanation: "Ветка — параллельная версия кода. Можно разрабатывать функцию в отдельной ветке, не ломая основную.",
    difficulty: "medium", unit: "tools",
  },
  {
    id: 44, question: "Что такое pull request (PR)?",
    options: ["Запрос на удаление", "Предложение внести изменения из одной ветки в другую", "Загрузка файла", "Тип коммита"],
    correctAnswer: 1, explanation: "Pull Request — запрос на слияние изменений из вашей ветки в основную. Коллеги могут проверить код перед merge.",
    difficulty: "medium", unit: "tools",
  },
  {
    id: 45, question: "Что такое merge (слияние) в Git?",
    options: ["Удаление ветки", "Объединение изменений из двух веток", "Создание репозитория", "Клонирование проекта"],
    correctAnswer: 1, explanation: "Merge — объединение изменений из одной ветки в другую. Все коммиты из ветки feature попадают в main.",
    difficulty: "medium", unit: "tools",
  },
  {
    id: 46, question: "Что такое репозиторий (repository)?",
    options: ["Тип сервера", "Хранилище проекта с кодом и историей изменений", "Язык программирования", "База данных"],
    correctAnswer: 1, explanation: "Репозиторий — папка проекта с Git: весь код, история коммитов, ветки. Хранится локально и на GitHub.",
    difficulty: "easy", unit: "tools",
  },
  {
    id: 47, question: "Что такое npm?",
    options: ["Язык программирования", "Менеджер пакетов для Node.js", "Редактор кода", "База данных"],
    correctAnswer: 1, explanation: "npm (Node Package Manager) — менеджер пакетов: установка библиотек, управление зависимостями проекта.",
    difficulty: "medium", unit: "tools",
  },
  {
    id: 48, question: "Что такое package.json?",
    options: ["Исполняемый файл", "Файл конфигурации проекта с зависимостями и скриптами", "Документация", "Тестовый файл"],
    correctAnswer: 1, explanation: "package.json — 'паспорт' проекта: название, версия, зависимости, скрипты запуска, тестов.",
    difficulty: "medium", unit: "tools",
  },
  {
    id: 49, question: "Что такое терминал (консоль)?",
    options: ["Графический интерфейс", "Текстовый интерфейс для ввода команд", "Тип монитора", "База данных"],
    correctAnswer: 1, explanation: "Терминал — текстовый интерфейс для выполнения команд: запуск скриптов, управление Git, установка пакетов.",
    difficulty: "easy", unit: "tools",
  },
  {
    id: 50, question: "Что такое IDE (Integrated Development Environment)?",
    options: ["Тип сервера", "Интегрированная среда разработки с редактором, отладчиком и др.", "Язык программирования", "База данных"],
    correctAnswer: 1, explanation: "IDE — программа для разработки: редактор кода + отладчик + терминал + Git. Примеры: VS Code, WebStorm, IntelliJ.",
    difficulty: "medium", unit: "tools",
  },

  // ===== ЮНИТ 6: ДИЗАЙН (10 вопросов) =====
  {
    id: 51, question: "Что такое UX?",
    options: ["Визуальный дизайн", "Пользовательский опыт — удобство использования", "Язык разметки", "Тип анимации"],
    correctAnswer: 1, explanation: "UX (User Experience) — совокупность ощущений от использования продукта: насколько удобно, понятно, приятно.",
    difficulty: "easy", unit: "design",
  },
  {
    id: 52, question: "Что такое UI?",
    options: ["Логика приложения", "Пользовательский интерфейс — визуальное оформление", "Серверная часть", "Тип тестирования"],
    correctAnswer: 1, explanation: "UI (User Interface) — визуальная часть: кнопки, цвета, шрифты, расположение элементов на экране.",
    difficulty: "easy", unit: "design",
  },
  {
    id: 53, question: "Что такое wireframe?",
    options: ["Готовый дизайн", "Упрощённая схема интерфейса (каркас)", "Тип анимации", "Шрифт"],
    correctAnswer: 1, explanation: "Wireframe — схема без дизайна: прямоугольники вместо картинок, линии вместо текста. Показывает структуру.",
    difficulty: "easy", unit: "design",
  },
  {
    id: 54, question: "Что такое user flow?",
    options: ["Поток данных", "Путь пользователя через приложение от начала до цели", "Анимация", "Тип кнопки"],
    correctAnswer: 1, explanation: "User Flow — схема пути пользователя: главная → каталог → карточка товара → корзина → оплата.",
    difficulty: "medium", unit: "design",
  },
  {
    id: 55, question: "Что такое макет (mockup)?",
    options: ["Рабочий прототип", "Визуализация дизайна без интерактивности", "Тип кода", "База данных"],
    correctAnswer: 1, explanation: "Mockup — статичная картинка будущего дизайна с цветами, шрифтами, изображениями. Не кликабельный.",
    difficulty: "medium", unit: "design",
  },
  {
    id: 56, question: "Что такое дизайн-система?",
    options: ["Одна страница", "Набор переиспользуемых компонентов, стилей и правил", "Тип шрифта", "Анимация"],
    correctAnswer: 1, explanation: "Дизайн-система — библиотека компонентов, цветов, типографики, правил. Обеспечивает единообразие продукта.",
    difficulty: "hard", unit: "design",
  },
  {
    id: 57, question: "Что такое цветовая палитра?",
    options: ["Тип анимации", "Набор цветов, используемых в дизайне", "Шрифт", "Тип кнопки"],
    correctAnswer: 1, explanation: "Цветовая палитра — набор согласованных цветов: основной, вторичный, акцентный, фоновый, текст.",
    difficulty: "easy", unit: "design",
  },
  {
    id: 58, question: "Что такое типографика?",
    options: ["Тип графики", "Искусство оформления текста: шрифты, размеры, интервалы", "Анимация", "Цветовая схема"],
    correctAnswer: 1, explanation: "Типографика — выбор и использование шрифтов: заголовки, основной текст, размеры, межстрочные интервалы.",
    difficulty: "medium", unit: "design",
  },
  {
    id: 59, question: "Что такое accessibility (доступность)?",
    options: ["Скорость загрузки", "Доступность приложения для людей с ограниченными возможностями", "Тип дизайна", "Цена хостинга"],
    correctAnswer: 1, explanation: "Accessibility (a11y) — дизайн и код, доступные для всех: скринридеры, клавиатурная навигация, контрастность.",
    difficulty: "hard", unit: "design",
  },
  {
    id: 60, question: "Что такое Figma?",
    options: ["Язык программирования", "Инструмент для дизайна и прототипирования интерфейсов", "База данных", "Сервер"],
    correctAnswer: 1, explanation: "Figma — популярный онлайн-инструмент для UI/UX дизайна, прототипирования и совместной работы.",
    difficulty: "easy", unit: "design",
  },

  // ===== ЮНИТ 7: ТЕСТИРОВАНИЕ (10 вопросов) =====
  {
    id: 61, question: "Что такое баг?",
    options: ["Новая функция", "Ошибка в коде", "Тип базы данных", "Метод тестирования"],
    correctAnswer: 1, explanation: "Баг — ошибка в коде, приводящая к неправильной работе приложения.",
    difficulty: "easy", unit: "testing",
  },
  {
    id: 62, question: "Что такое дебаг (debug)?",
    options: ["Создание бага", "Процесс поиска и исправления ошибок", "Тип теста", "Удаление кода"],
    correctAnswer: 1, explanation: "Debug — процесс поиска причины бага: использование console.log, breakpoints, пошаговое выполнение.",
    difficulty: "easy", unit: "testing",
  },
  {
    id: 63, question: "Что такое unit-тест?",
    options: ["Тест всего приложения", "Тест отдельной функции или компонента", "Ручное тестирование", "Тест дизайна"],
    correctAnswer: 1, explanation: "Unit-тест — автоматический тест одной функции/компонента. Быстро, изолированно, много тестов.",
    difficulty: "medium", unit: "testing",
  },
  {
    id: 64, question: "Что такое E2E-тест (end-to-end)?",
    options: ["Тест одной функции", "Сквозной тест всего пользовательского сценария", "Тест скорости", "Тест дизайна"],
    correctAnswer: 1, explanation: "E2E — тест полного сценария: открыть сайт → войти → добавить товар → оплатить. Имитирует реального пользователя.",
    difficulty: "medium", unit: "testing",
  },
  {
    id: 65, question: "Что такое 'счастливый путь' (happy path)?",
    options: ["Название фреймворка", "Сценарий, когда всё идёт правильно без ошибок", "Тип дизайна", "Метод деплоя"],
    correctAnswer: 1, explanation: "Happy path — идеальный сценарий: пользователь делает всё правильно. Важно тестировать и 'несчастные' пути!",
    difficulty: "medium", unit: "testing",
  },
  {
    id: 66, question: "Что такое regression-тестирование?",
    options: ["Тест нового функционала", "Проверка, что старые функции не сломались после изменений", "Тест скорости", "Тест дизайна"],
    correctAnswer: 1, explanation: "Regression — проверка, что новые изменения не сломали то, что уже работало. Критически важно!",
    difficulty: "hard", unit: "testing",
  },
  {
    id: 67, question: "Что такое тестовое покрытие (code coverage)?",
    options: ["Размер кода", "Процент кода, покрытого автоматическими тестами", "Скорость тестов", "Количество тестировщиков"],
    correctAnswer: 1, explanation: "Code coverage — сколько % кода выполняется при тестировании. 80%+ считается хорошим показателем.",
    difficulty: "hard", unit: "testing",
  },
  {
    id: 68, question: "Что такое TDD (Test-Driven Development)?",
    options: ["Тип дизайна", "Разработка через тестирование: сначала тест, потом код", "Метод деплоя", "Тип базы данных"],
    correctAnswer: 1, explanation: "TDD — пишем тест (красный) → пишем код чтобы тест прошёл (зелёный) → улучшаем код (рефакторинг).",
    difficulty: "hard", unit: "testing",
  },
  {
    id: 69, question: "Что такое граничные значения (edge cases)?",
    options: ["Обычные данные", "Экстремальные/нестандартные данные для тестирования", "Тип теста", "Название функции"],
    correctAnswer: 1, explanation: "Edge cases — пустая строка, 0, очень длинный текст, спецсимволы. Часто именно здесь прячутся баги!",
    difficulty: "medium", unit: "testing",
  },
  {
    id: 70, question: "Что такое smoke-тестирование?",
    options: ["Тест с дымом", "Быстрая проверка основных функций на работоспособность", "Тест безопасности", "Нагрузочный тест"],
    correctAnswer: 1, explanation: "Smoke-тест — быстрая проверка: 'приложение запускается, основные кнопки работают'. Перед глубоким тестированием.",
    difficulty: "hard", unit: "testing",
  },

  // ===== ЮНИТ 8: ДЕПЛОЙ И ХОСТИНГ (10 вопросов) =====
  {
    id: 71, question: "Что такое деплой (deploy)?",
    options: ["Удаление приложения", "Развёртывание на сервере для доступа пользователей", "Написание кода", "Тестирование"],
    correctAnswer: 1, explanation: "Deploy — размещение приложения на сервере, чтобы оно стало доступно через интернет.",
    difficulty: "easy", unit: "deploy",
  },
  {
    id: 72, question: "Что такое хостинг?",
    options: ["Редактор кода", "Услуга размещения сайта на сервере 24/7", "Язык программирования", "Тип теста"],
    correctAnswer: 1, explanation: "Хостинг — аренда места на сервере для вашего сайта. Без хостинга сайт работает только на вашем компьютере.",
    difficulty: "easy", unit: "deploy",
  },
  {
    id: 73, question: "Что такое домен?",
    options: ["Тип сервера", "Имя сайта в интернете (google.com)", "Язык программирования", "База данных"],
    correctAnswer: 1, explanation: "Домен — адрес сайта: google.com, github.com. Можно купить от 200 рублей в год.",
    difficulty: "easy", unit: "deploy",
  },
  {
    id: 74, question: "Что такое CI/CD?",
    options: ["Язык программирования", "Непрерывная интеграция и доставка", "Тип тестирования", "Модель БД"],
    correctAnswer: 1, explanation: "CI/CD — автоматизация: push в Git → автотесты (CI) → автодеплой (CD). Быстро и без ошибок.",
    difficulty: "medium", unit: "deploy",
  },
  {
    id: 75, question: "Что такое Vercel?",
    options: ["Язык программирования", "Платформа для хостинга и деплоя веб-приложений", "База данных", "Редактор кода"],
    correctAnswer: 1, explanation: "Vercel — платформа для деплоя фронтенда: бесплатный хостинг, автоматический деплой из Git, HTTPS.",
    difficulty: "medium", unit: "deploy",
  },
  {
    id: 76, question: "Что такое DNS?",
    options: ["Тип сервера", "Система преобразования доменных имён в IP-адреса", "Язык программирования", "Протокол шифрования"],
    correctAnswer: 1, explanation: "DNS — 'телефонная книга интернета': преобразует google.com в IP-адрес сервера (142.250.74.46).",
    difficulty: "hard", unit: "deploy",
  },
  {
    id: 77, question: "Что такое переменные окружения?",
    options: ["Локальные переменные", "Конфигурационные значения, хранящиеся отдельно от кода", "CSS-переменные", "Тип базы данных"],
    correctAnswer: 1, explanation: "Переменные окружения (.env) — пароли, ключи API, настройки. Хранятся отдельно от кода, не попадают в Git.",
    difficulty: "medium", unit: "deploy",
  },
  {
    id: 78, question: "Что такое Docker?",
    options: ["Редактор кода", "Платформа для контейнеризации приложений", "База данных", "Язык программирования"],
    correctAnswer: 1, explanation: "Docker — упаковывает приложение со всеми зависимостями в 'контейнер'. Работает одинаково везде.",
    difficulty: "hard", unit: "deploy",
  },
  {
    id: 79, question: "Что такое CDN (Content Delivery Network)?",
    options: ["Тип базы данных", "Сеть серверов для быстрой доставки контента по всему миру", "Язык программирования", "Тип теста"],
    correctAnswer: 1, explanation: "CDN — копии контента на серверах по всему миру. Пользователь получает данные с ближайшего сервера — быстрее!",
    difficulty: "hard", unit: "deploy",
  },
  {
    id: 80, question: "Что такое environment (окружение)?",
    options: ["Операционная система", "Конфигурация для запуска: development, staging, production", "Тип сервера", "Язык программирования"],
    correctAnswer: 1, explanation: "Environment — окружение: dev (разработка), staging (тестирование), production (продакшен). Разные настройки для каждого.",
    difficulty: "medium", unit: "deploy",
  },

  // ===== ЮНИТ 9: БЕЗОПАСНОСТЬ (10 вопросов) =====
  {
    id: 81, question: "Что такое SSL/TLS?",
    options: ["Язык программирования", "Протоколы шифрования данных", "Тип базы данных", "Метод тестирования"],
    correctAnswer: 1, explanation: "SSL/TLS — шифрование между браузером и сервером. https:// = безопасно, http:// = данные открыты.",
    difficulty: "medium", unit: "security",
  },
  {
    id: 82, question: "Что такое хеширование паролей?",
    options: ["Шифрование с возможностью расшифровки", "Преобразование пароля в уникальную строку (нельзя расшифровать)", "Сжатие пароля", "Удаление пароля"],
    correctAnswer: 1, explanation: "Хеширование — пароль превращается в строку (hash). При входе сравниваются хеши. Даже если БД украдут — пароли в безопасности.",
    difficulty: "medium", unit: "security",
  },
  {
    id: 83, question: "Что такое XSS (Cross-Site Scripting)?",
    options: ["Тип дизайна", "Атака: внедрение вредоносного скрипта на страницу", "Метод тестирования", "Тип API"],
    correctAnswer: 1, explanation: "XSS — злоумышленник внедряет JavaScript в страницу. Когда жертва открывает — скрипт выполняется, крадя данные.",
    difficulty: "hard", unit: "security",
  },
  {
    id: 84, question: "Что такое SQL-инъекция?",
    options: ["Тип запроса", "Атака: внедрение SQL-кода через пользовательский ввод", "Метод оптимизации", "Тип БД"],
    correctAnswer: 1, explanation: "SQL-инъекция — в поле ввода пишут SQL-код вместо данных. Может дать доступ ко всей базе. Защита: параметризованные запросы.",
    difficulty: "hard", unit: "security",
  },
  {
    id: 85, question: "Что такое CORS?",
    options: ["Тип сервера", "Механизм безопасности: контроль запросов между доменами", "Язык программирования", "Тип теста"],
    correctAnswer: 1, explanation: "CORS (Cross-Origin Resource Sharing) — сервер решает, с каких доменов можно делать запросы. Защита от несанкционированного доступа.",
    difficulty: "hard", unit: "security",
  },
  {
    id: 86, question: "Что такое аутентификация?",
    options: ["Создание аккаунта", "Проверка личности пользователя (логин/пароль)", "Удаление аккаунта", "Шифрование данных"],
    correctAnswer: 1, explanation: "Аутентификация — проверка 'кто ты?': логин + пароль, отпечаток пальца, код из SMS.",
    difficulty: "easy", unit: "security",
  },
  {
    id: 87, question: "Что такое авторизация?",
    options: ["Проверка личности", "Проверка прав доступа: что пользователю разрешено", "Регистрация", "Шифрование"],
    correctAnswer: 1, explanation: "Авторизация — проверка 'что тебе можно?': обычный пользователь vs админ. Идёт после аутентификации.",
    difficulty: "medium", unit: "security",
  },
  {
    id: 88, question: "Что такое JWT (JSON Web Token)?",
    options: ["Тип базы данных", "Токен для безопасной передачи данных между сторонами", "Язык программирования", "Тип API"],
    correctAnswer: 1, explanation: "JWT — токен с данными пользователя. После логина сервер выдаёт JWT, клиент прикрепляет к каждому запросу.",
    difficulty: "hard", unit: "security",
  },
  {
    id: 89, question: "Что такое двухфакторная аутентификация (2FA)?",
    options: ["Два пароля", "Два шага подтверждения: пароль + код из SMS/приложения", "Два аккаунта", "Два сервера"],
    correctAnswer: 1, explanation: "2FA — два фактора: что знаешь (пароль) + что имеешь (телефон). Значительно повышает безопасность.",
    difficulty: "easy", unit: "security",
  },
  {
    id: 90, question: "Почему нельзя хранить пароли в открытом виде?",
    options: ["Это занимает много места", "При утечке БД все пароли будут скомпрометированы", "Это запрещено JavaScript", "Пароли слишком длинные"],
    correctAnswer: 1, explanation: "Если БД украдут — все пароли пользователей станут известны. Храните только хеши! Даже администратор не должен видеть пароли.",
    difficulty: "easy", unit: "security",
  },

  // ===== ЮНИТ 10: ПРИНЦИПЫ (10 вопросов) =====
  {
    id: 91, question: "Что означает KISS?",
    options: ["Keep It Super Simple — делай супер просто", "Keep It Simple, Stupid — делай проще", "Know It, Share It — знай и делись", "Kill It, Start Softly — убей и начни мягко"],
    correctAnswer: 1, explanation: "KISS — 'делай проще'. Не усложняй без необходимости. Простое решение часто лучше сложного.",
    difficulty: "easy", unit: "principles",
  },
  {
    id: 92, question: "Что означает DRY?",
    options: ["Do Repeat Yourself — повторяй", "Don't Repeat Yourself — не повторяйся", "Debug Run Yield — отладка", "Data Recovery Yield — восстановление"],
    correctAnswer: 1, explanation: "DRY — не дублируй код. Одна логика = одна функция. Изменил в одном месте — обновилось везде.",
    difficulty: "easy", unit: "principles",
  },
  {
    id: 93, question: "Что такое рефакторинг?",
    options: ["Добавление функций", "Улучшение структуры кода без изменения функциональности", "Удаление кода", "Переписывание с нуля"],
    correctAnswer: 1, explanation: "Рефакторинг — код работает так же, но становится чище и понятнее. Как навести порядок в комнате.",
    difficulty: "medium", unit: "principles",
  },
  {
    id: 94, question: "Что такое Code Review?",
    options: ["Автоматическая проверка", "Проверка кода другим разработчиком", "Тестирование пользователями", "Сравнение с конкурентами"],
    correctAnswer: 1, explanation: "Code Review — коллега проверяет ваш код перед merge. Находит баги, предлагает улучшения, делится знаниями.",
    difficulty: "medium", unit: "principles",
  },
  {
    id: 95, question: "Что такое SOLID?",
    options: ["Тип базы данных", "5 принципов объектно-ориентированного проектирования", "Язык программирования", "Метод тестирования"],
    correctAnswer: 1, explanation: "SOLID — S(ingle Responsibility), O(pen/Closed), L(ischkov Substitution), I(nterface Segregation), D(ependency Inversion).",
    difficulty: "hard", unit: "principles",
  },
  {
    id: 96, question: "Что такое чистый код (clean code)?",
    options: ["Код без комментариев", "Код, который легко читать, понимать и изменять", "Код без ошибок", "Короткий код"],
    correctAnswer: 1, explanation: "Clean Code — читаемый, понятный, хорошо структурированный. Понятен не только автору, но и другим разработчикам.",
    difficulty: "medium", unit: "principles",
  },
  {
    id: 97, question: "Что такое YAGNI?",
    options: ["You Aren't Gonna Need It — не делай то, что пока не нужно", "You Always Get New Ideas — всегда новые идеи", "Yet Another Great New Innovation", "Young And Growing New Initiative"],
    correctAnswer: 0, explanation: "YAGNI — не пиши код 'на будущее'. Делай только то, что нужно сейчас. Иначе потратишь время на ненужное.",
    difficulty: "hard", unit: "principles",
  },
  {
    id: 98, question: "Что такое 'разделение ответственности' (Separation of Concerns)?",
    options: ["Разделение команды", "Каждый модуль отвечает за одну задачу", "Разделение проекта на части", "Распределение задач по времени"],
    correctAnswer: 1, explanation: "Каждый компонент/модуль делает ОДНО дело. HTML — структура, CSS — стили, JS — логика. Не смешивай!",
    difficulty: "medium", unit: "principles",
  },
  {
    id: 99, question: "Что такое 'преждевременная оптимизация'?",
    options: ["Слишком ранний запуск", "Оптимизация кода до того, как он работает правильно", "Быстрая разработка", "Раннее тестирование"],
    correctAnswer: 1, explanation: "'Преждевременная оптимизация — корень всех зол' (Д. Кнут). Сначала сделай чтобы работало, потом оптимизируй если нужно.",
    difficulty: "hard", unit: "principles",
  },
  {
    id: 100, question: "Что такое 'абстракция' в программировании?",
    options: ["Удаление кода", "Скрытие сложных деталей, показ только важного", "Тип данных", "Метод тестирования"],
    correctAnswer: 1, explanation: "Абстракция — скрытие сложности. Кнопка 'Отправить' — абстракция сложного процесса отправки данных на сервер.",
    difficulty: "medium", unit: "principles",
  },
];
