const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/coursesController');

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Получить список всех курсов
 *     description: Возвращает массив курсов. Можно отфильтровать по названию.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Часть названия курса для поиска
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Получить курс по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Данные курса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Курс не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Создать новый курс
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - shortText
 *             properties:
 *               title:
 *                 type: string
 *               shortText:
 *                 type: string
 *               duration:
 *                 type: string
 *               details:
 *                 type: string
 *               src:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Курс успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/courses/{id}:
 *   patch:
 *     summary: Частично обновить курс
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID курса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortText:
 *                 type: string
 *               duration:
 *                 type: string
 *               details:
 *                 type: string
 *               src:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Курс обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Курс не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', ctrl.update);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Удалить курс
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID курса
 *     responses:
 *       204:
 *         description: Курс удалён (без содержимого)
 *       404:
 *         description: Курс не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', ctrl.delete);

module.exports = router;
