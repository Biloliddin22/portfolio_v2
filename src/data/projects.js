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
    demo: 'https://tasbeh.tbiloliddin.uz/',
    text: {
      en: { title: 'Tasbeh', description: 'A digital tasbeh with a freestyle counter and a daily list of five zikrs. The app saves progress on the device and offers light and dark themes.', linkLabel: 'Open Tasbeh' },
      ru: { title: 'Тасбих', description: 'Цифровой тасбих со свободным счётом и списком из пяти зикров на день. Приложение сохраняет прогресс на устройстве и поддерживает светлую и тёмную темы.', linkLabel: 'Открыть Тасбих' },
      uz: { title: 'Tasbeh', description: 'Erkin hisoblash rejimi va har kuni beshta zikr ro‘yxatiga ega raqamli tasbeh. Ilova natijalarni qurilmada saqlaydi, yorug‘ va qorong‘i mavzularni qo‘llaydi.', linkLabel: 'Tasbehni ochish' },
    },
  },
]
