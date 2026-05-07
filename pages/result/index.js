import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { MainPage } from "../main/index.js";
import { AuthorPage } from "../author/index.js";
import { EditPage } from "../edit/index.js";
import { getTotalSum } from "../../modules/promiseStore.js";

export class ResultPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const sum = getTotalSum();

        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <h2>Результат</h2>
                    <div class="alert alert-info">
                        Сумма значений всех карточек: <strong>${sum}</strong>
                    </div>
                    <button id="back-btn" class="btn btn-secondary">Назад</button>
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
    }
}
