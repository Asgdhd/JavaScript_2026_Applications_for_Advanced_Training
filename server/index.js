const express = require('express');
const path = require('path');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const coursesRouter = require('./routes/courses');
const coursesService = require('./services/coursesService');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'data/courses.json');
coursesService.init(DATA_FILE);

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Swagger документация
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: 'API Документация — Лаба 4'
}));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/api/courses', coursesRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`API запущен: http://localhost:${PORT}`);
  console.log(`Документация: http://localhost:${PORT}/api-docs`);
});
