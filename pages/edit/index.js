import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { MainPage } from "../main/index.js";
import { AuthorPage } from "../author/index.js";
import { fetchCourseById } from "../../modules/store.js";

export class EditPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.isEdit = id !== null;
    }

    render() {
        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <div class="d-flex align-items-center mb-3">
                        <h2 class="me-3 mb-0">${this.isEdit ? 'Редактирование курса' : 'Добавление курса'}</h2>
                        <button id="back-btn" class="btn btn-secondary">Назад</button>
                    </div>
                    <form id="course-form" class="mt-3">
                        <div class="mb-3">
                            <label for="title" class="form-label">Название</label>
                            <input type="text" class="form-control" id="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="shortText" class="form-label">Краткое описание</label>
                            <input type="text" class="form-control" id="shortText" required>
                        </div>
                        <div class="mb-3">
                            <label for="duration" class="form-label">Длительность</label>
                            <input type="text" class="form-control" id="duration">
                        </div>
                        <div class="mb-3">
                            <label for="details" class="form-label">Подробная программа</label>
                            <textarea class="form-control" id="details" rows="4"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="src" class="form-label">URL изображения</label>
                            <input type="url" class="form-control" id="src">
                        </div>
                        <button type="button" class="btn btn-primary" id="save-btn">Сохранить</button>
                    </form>
                </div>
            </main>
        `;

        const header = new HeaderComponent(document.getElementById('header-container'));
        const sidebar = new SidebarComponent(document.getElementById('sidebar-container'));
        header.render(() => new MainPage(this.parent).render(), () => sidebar.toggle());
        sidebar.render(
            () => new MainPage(this.parent).render(),
            () => new EditPage(this.parent).render(),
            () => new AuthorPage(this.parent).render()
        );

        document.getElementById('back-btn').addEventListener('click', () => new MainPage(this.parent).render());

        if (this.isEdit) {
            fetchCourseById(this.id, (course) => {
                if (course) {
                    document.getElementById('title').value = course.title || '';
                    document.getElementById('shortText').value = course.shortText || '';
                    document.getElementById('duration').value = course.duration || '';
                    document.getElementById('details').value = course.details || '';
                    document.getElementById('src').value = course.src || '';
                }
            });
        }

        // Кнопка Сохранить без обработчика; сообщение в консоль
        document.getElementById('save-btn').addEventListener('click', () => {
            console.log('Функция сохранения будет доступна в следующей лабораторной работе.');
        });
    }
}
