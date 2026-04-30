const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => { dataFilePath = filePath; };

const findAll = (title) => {
    const courses = fileService.readData(dataFilePath);
    if (!title) return courses;
    return courses.filter(c =>
        c.title.toLowerCase().includes(title.toLowerCase())
    );
};

const findOne = (id) => {
    const courses = fileService.readData(dataFilePath);
    return courses.find(c => c.id === id);
};

const create = (courseData) => {
    const courses = fileService.readData(dataFilePath);
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const newCourse = { id: newId, ...courseData };
    courses.push(newCourse);
    fileService.writeData(dataFilePath, courses);
    return newCourse;
};

const update = (id, courseData) => {
    const courses = fileService.readData(dataFilePath);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;
    courses[index] = { ...courses[index], ...courseData };
    fileService.writeData(dataFilePath, courses);
    return courses[index];
};

const remove = (id) => {
    const courses = fileService.readData(dataFilePath);
    const filtered = courses.filter(c => c.id !== id);
    if (filtered.length === courses.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
