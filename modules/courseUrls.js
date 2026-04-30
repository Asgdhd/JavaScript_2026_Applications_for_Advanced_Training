    class CourseUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getCourses(title = '') {
        const query = title ? `?title=${encodeURIComponent(title)}` : '';
        return `${this.baseUrl}/api/courses${query}`;
    }

    getCourseById(id) {
        return `${this.baseUrl}/api/courses/${id}`;
    }

    createCourse() {
        return `${this.baseUrl}/api/courses`;
    }

    updateCourse(id) {
        return `${this.baseUrl}/api/courses/${id}`;
    }

    deleteCourse(id) {
        return `${this.baseUrl}/api/courses/${id}`;
    }
}

export const courseUrls = new CourseUrls();
