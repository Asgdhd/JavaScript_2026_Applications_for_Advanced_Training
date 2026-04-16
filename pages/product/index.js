import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";
import { AuthorPage } from "../author/index.js";
import { getCourseById } from "../../modules/store.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    render() {
        const course = getCourseById(this.id);
        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <button id="back-btn" class="btn btn-secondary mb-3">Назад</button>
                    <div class="row">
                        <div class="col-md-5">
                            <img src="${course.src}" class="img-fluid rounded" alt="${course.title}">
                        </div>
                        <div class="col-md-7">
                            <h3>${course.title}</h3>
                            <div id="accordion-container"></div>
                        </div>
                    </div>
                </div>
            </main>
        `;

        const header = new HeaderComponent(document.getElementById('header-container'));
        const sidebar = new SidebarComponent(document.getElementById('sidebar-container'));

        header.render(() => new MainPage(this.parent).render(), () => sidebar.toggle());
        sidebar.render(
            () => new MainPage(this.parent).render(),
            () => new AuthorPage(this.parent).render()
        );

        document.getElementById('back-btn').addEventListener('click', () => new MainPage(this.parent).render());
        new AccordionComponent(document.getElementById('accordion-container')).render(course);
    }
}
