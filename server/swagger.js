const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Курсов повышения квалификации',
      version: '1.0.0',
      description: 'REST API для управления карточками курсов (Лабораторная работа №4)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальный сервер разработки',
      },
    ],
    components: {
      schemas: {
        Course: {
          type: 'object',
          required: ['title', 'shortText'],
          properties: {
            id: { type: 'integer', description: 'Уникальный ID курса', example: 1 },
            title: { type: 'string', description: 'Название курса', example: 'Программная инженерия (Python)' },
            shortText: { type: 'string', description: 'Краткое описание', example: 'Основы промышленной разработки на языке Python.' },
            duration: { type: 'string', description: 'Длительность обучения', example: '72 академических часа' },
            details: { type: 'string', description: 'Подробная программа курса' },
            src: { type: 'string', format: 'uri', description: 'URL изображения', example: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Курс не найден' }
          }
        }
      }
    }
  },
  apis: ['./server/routes/*.js', './server/controllers/*.js'],
};

module.exports = swaggerJsdoc(options);
