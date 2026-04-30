import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { MainPage } from "../main/index.js";
import { EditPage } from "../edit/index.js";

export class AuthorPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <h2>Об авторе</h2>
                    <div class="card p-4">
                    <p><strong>Студент:</strong> Крахмальникова А. И.</p>
                    <p><strong>Группа:</strong> ИУ5-46Б</p>
                    <p><strong>Репозиторий проекта:</strong> <a href="https://github.com/Asgdhd/JavaScript_2026" target="_blank">GitHub</a></p>
                </div>
                </div>
            </main>
        `;

        const header = new HeaderComponent(document.getElementById('header-container'));
        const sidebar = new SidebarComponent(document.getElementById('sidebar-container'));

        header.render(() => new MainPage(this.parent).render(), () => sidebar.toggle());
        sidebar.render(
            () => new MainPage(this.parent).render(),
            () => new EditPage(this.parent).render(),
            () => this.render()
        );
    }
}
