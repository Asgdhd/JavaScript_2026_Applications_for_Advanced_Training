import { ajax } from './ajax.js';
import { courseUrls } from './courseUrls.js';


export function fetchCourses(title, callback) {
    ajax.get(courseUrls.getCourses(title), callback);
}

export function fetchCourseById(id, callback) {
    ajax.get(courseUrls.getCourseById(id), callback);
}

export function deleteCourse(id, callback) {
    ajax.delete(courseUrls.deleteCourse(id), (data, status) => {
        if (status === 204 || status === 200) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

// Для обратной совместимости заглушки (больше не используются)
export let visibleCourses = [];
export const getCourseById = (id) => visibleCourses.find(c => c.id === id);
export const removeCourse = () => {};
export const restoreCourses = () => {};
export const addRandomCourse = () => {};
