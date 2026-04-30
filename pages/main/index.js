import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { CourseCardComponent } from "../../components/course-card/index.js";
import { ProductPage } from "../product/index.js";
import { AuthorPage } from "../author/index.js";
import { EditPage } from "../edit/index.js";
import { fetchCourses, deleteCourse } from "../../modules/store.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchQuery = "";
    }

    async fetchAndRenderCards() {
        const data = await fetchCourses(this.searchQuery);
        if (data) this.renderCards(data);
    }

    renderCards(courses) {
        const container = document.getElementById('cards-container');
        if (!container) return;
        container.innerHTML = '';

        if (courses.length === 0) {
            container.innerHTML = `<div class="nothing-found">Ничего не найдено по вашему запросу</div>`;
            return;
        }

        courses.forEach(course => {
            const card = new CourseCardComponent(container);
            card.render(course,
                () => new ProductPage(this.parent, course.id).render(),
                async () => {
                    const success = await deleteCourse(course.id);
                    if (success) {
                        this.fetchAndRenderCards();
                    }
                }
            );
        });
    }

    render() {
        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <div class="sticky-controls">
                        <h2>Курсы повышения квалификации</h2>
                        <div class="d-flex gap-3 my-3">
                            <input type="text" id="search-input" class="form-control w-50"
                                placeholder="Поиск курса..." value="${this.searchQuery}">
                            <button id="add-btn" class="btn">+</button>
                        </div>
                    </div>
                    <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
                </div>
            </main>
        `;

        const header = new HeaderComponent(document.getElementById('header-container'));
        const sidebar = new SidebarComponent(document.getElementById('sidebar-container'));

        header.render(() => this.render(), () => sidebar.toggle());
        sidebar.render(
            () => this.render(),
            () => new EditPage(this.parent).render(),
            () => new AuthorPage(this.parent).render()
        );

        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim();
            this.fetchAndRenderCards();
        });

        document.getElementById('add-btn').addEventListener('click', () => {
            new EditPage(this.parent).render();
        });

        this.fetchAndRenderCards();
    }
}
