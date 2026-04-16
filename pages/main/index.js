import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { CourseCardComponent } from "../../components/course-card/index.js";
import { ProductPage } from "../product/index.js";
import { AuthorPage } from "../author/index.js";
import { visibleCourses, removeCourse, restoreCourses } from "../../modules/store.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchQuery = "";
    }

    renderCards() {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        const filtered = visibleCourses.filter(c => c.title.toLowerCase().includes(this.searchQuery));

        filtered.forEach(course => {
            const card = new CourseCardComponent(container);
            card.render(course,
                () => new ProductPage(this.parent, course.id).render(),
                () => { removeCourse(course.id); this.renderCards(); }
            );
        });
    }

    render() {
        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <h2>Курсы повышения квалификации</h2>
                    <div class="d-flex gap-3 my-3">
                        <input type="text" id="search-input" class="form-control w-50" placeholder="Поиск курса..." value="${this.searchQuery}">
                        <button id="restore-btn" class="btn btn-primary">Вернуть всё</button>
                    </div>
                    <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
                </div>
            </main>
        `;

        const header = new HeaderComponent(document.getElementById('header-container'));
        const sidebar = new SidebarComponent(document.getElementById('sidebar-container'));

        header.render(() => this.render(), () => sidebar.toggle());
        sidebar.render(() => this.render(), () => new AuthorPage(this.parent).render());

        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderCards();
        });
        document.getElementById('restore-btn').addEventListener('click', () => {
            restoreCourses();
            this.renderCards();
        });

        this.renderCards();
    }
}
