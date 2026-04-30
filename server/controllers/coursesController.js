const coursesService = require('../services/coursesService');

exports.getAll = (req, res) => {
    const { title } = req.query;
    const courses = coursesService.findAll(title);
    res.json(courses);
};

exports.getById = (req, res) => {
    const id = parseInt(req.params.id);
    const course = coursesService.findOne(id);
    if (!course) return res.status(404).json({ error: 'Курс не найден' });
    res.json(course);
};

exports.create = (req, res) => {
    const { src, title, shortText, duration, details } = req.body;
    if (!title || !shortText) return res.status(400).json({ error: 'Не все поля заполнены' });
    const newCourse = coursesService.create({ src, title, shortText, duration, details });
    res.status(201).json(newCourse);
};

exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = coursesService.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Курс не найден' });
    res.json(updated);
};

exports.delete = (req, res) => {
    const id = parseInt(req.params.id);
    const success = coursesService.remove(id);
    if (!success) return res.status(404).json({ error: 'Курс не найден' });
    res.status(204).send();
};
