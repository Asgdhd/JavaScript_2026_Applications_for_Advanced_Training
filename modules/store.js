import { ajax } from './ajax.js';
import { courseUrls } from './courseUrls.js';

export async function fetchCourses(title = '') {
    try {
        const data = await ajax.get(courseUrls.getCourses(title));
        return data;
    } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
        return [];
    }
}

export async function fetchCourseById(id) {
    try {
        const course = await ajax.get(courseUrls.getCourseById(id));
        return course;
    } catch (error) {
        console.error('Ошибка загрузки курса:', error);
        return null;
    }
}

export async function deleteCourse(id) {
    try {
        await ajax.delete(courseUrls.deleteCourse(id));
        return true;
    } catch (error) {
        console.error('Ошибка удаления курса:', error);
        return false;
    }
}

export async function createCourse(courseData) {
    try {
        const newCourse = await ajax.post(courseUrls.createCourse(), courseData);
        return newCourse;
    } catch (error) {
        console.error('Ошибка создания курса:', error);
        return null;
    }
}

export async function updateCourse(id, courseData) {
    try {
        const updatedCourse = await ajax.patch(courseUrls.updateCourse(id), courseData);
        return updatedCourse;
    } catch (error) {
        console.error('Ошибка обновления курса:', error);
        return null;
    }
}
