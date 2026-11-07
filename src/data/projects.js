export const projects = [
  {
    id: 'school-system',
    featured: true,
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React'],
    demo: 'https://school-demo.tbiloliddin.uz/',
    text: {
      en: {
        title: 'School Management System',
        description: 'Built for Joseph School and used daily to manage records for 200+ students.',
        highlights: ['Students, enrollments, and groups', 'Schedules and attendance', 'Payments and receipts', 'Payroll and financial reports'],
      },
      ru: {
        title: 'Система управления учебным центром',
        description: 'Создана для Joseph School. Центр ежедневно ведёт в ней учёт 200+ учеников.',
        highlights: ['Ученики, зачисления и группы', 'Расписание и посещаемость', 'Оплаты и чеки', 'Зарплаты и финансовые отчёты'],
      },
      uz: {
        title: 'O‘quv markazini boshqarish tizimi',
        description: 'Joseph School uchun yaratilgan. Markaz tizimda 200 dan ortiq o‘quvchining ma’lumotlarini yuritadi.',
        highlights: ['O‘quvchilar, qabul va guruhlar', 'Dars jadvali va davomat', 'To‘lovlar va cheklar', 'Ish haqi va moliyaviy hisobotlar'],
      },
    },
  },
  {
    id: 'ielts-reading',
    technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    demo: 'https://ieltsreadingbt.netlify.app/',
    text: {
      en: { title: 'IELTS Reading Platform', description: 'A computer-based IELTS Reading simulator with timed tests, highlighting, notes, answer navigation, results, and printing.' },
      ru: { title: 'Платформа IELTS Reading', description: 'Симулятор компьютерного IELTS Reading с таймером, выделением текста, заметками, навигацией по ответам и печатью результатов.' },
      uz: { title: 'IELTS Reading platformasi', description: 'Taymer, matnni belgilash, izohlar, javoblar orasida o‘tish va natijalarni chop etish imkoniyatiga ega IELTS Reading simulyatori.' },
    },
  },
  {
    id: 'tasbeh',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PWA'],
    text: {
      en: { title: 'Tasbeh', description: 'A digital tasbeh counter, with web and Android versions planned.' },
      ru: { title: 'Тасбих', description: 'Цифровой счётчик для тасбиха. В планах версии для браузера и Android.' },
      uz: { title: 'Tasbeh', description: 'Raqamli tasbeh hisoblagichi. Veb va Android versiyalari rejalashtirilgan.' },
    },
  },
]
