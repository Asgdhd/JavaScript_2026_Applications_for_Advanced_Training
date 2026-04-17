export let visibleCourses = [
    {
        id: 1,
        title: "Программная инженерия (Python)",
        shortText: "Основы промышленной разработки на языке Python.",
        duration: "72 академических часа",
        details: "Изучение ООП, создание веб-сервисов на FastAPI и основы DevOps.",
        src: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500"
    },
    {
        id: 2,
        title: "Системный анализ и проектирование",
        shortText: "Сбор требований и проектирование IT-систем.",
        duration: "48 академических часов",
        details: "Изучение UML, BPMN и методологий разработки ПО.",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"
    },
    {
        id: 3,
        title: "Машинное обучение (Data Science)",
        shortText: "Нейросети, анализ данных и искусственный интеллект.",
        duration: "120 академических часов",
        details: "Работа с библиотеками Pandas, Scikit-Learn, PyTorch и алгоритмами регрессии.",
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500"
    },
    {
        id: 4,
        title: "Веб-дизайн и UX/UI интерфейсы",
        shortText: "Проектирование удобных и современных интерфейсов.",
        duration: "60 академических часов",
        details: "Основы композиции, работа в Figma и проведение юзабилити-тестирований.",
        src: "https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_1280.png"
    },
    {
        id: 5,
        title: "Разработка мобильных приложений",
        shortText: "Создание нативных приложений для iOS и Android.",
        duration: "96 академических часов",
        details: "Изучение Kotlin или Swift, жизненный цикл приложения и публикация в сторы.",
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500"
    },
    {
        id: 6,
        title: "Кибербезопасность",
        shortText: "Защита данных и поиск уязвимостей в сетях.",
        duration: "80 академических часов",
        details: "Этичный хакинг, криптография и настройка систем сетевой защиты.",
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500"
    }
];

const allCourses = [...visibleCourses];

export const getCourseById = (id) => visibleCourses.find(c => c.id === parseInt(id));

export const removeCourse = (id) => {
    visibleCourses = visibleCourses.filter(c => c.id !== id);
};

export const restoreCourses = () => {
    visibleCourses = [...allCourses];
};

// Новая функция для добавления рандомной карточки
export const addRandomCourse = () => {
    const getRandomField = (field) => {
        const randomIndex = Math.floor(Math.random() * allCourses.length);
        return allCourses[randomIndex][field];
    };

    const newCourse = {
        id: Date.now(), // Уникальный ID
        title: getRandomField('title'),
        shortText: getRandomField('shortText'),
        duration: getRandomField('duration'),
        details: getRandomField('details'),
        src: getRandomField('src')
    };

    visibleCourses.push(newCourse);
};
