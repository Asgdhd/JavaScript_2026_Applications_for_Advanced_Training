export class SidebarComponent {
    constructor(parent) { this.parent = parent; }

    toggle() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    addListeners(onHomeClick, onAddClick, onAuthorClick) {
        document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); onHomeClick(); };
        document.getElementById('nav-add').onclick = (e) => { e.preventDefault(); onAddClick(); };
        document.getElementById('nav-author').onclick = (e) => { e.preventDefault(); onAuthorClick(); };

        // закрывать меню при клике на пункт (для мобилок)
        const links = document.querySelectorAll('.nav-link');
        links.forEach(l => l.addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
        }));
    }

    render(onHomeClick, onAddClick, onAuthorClick) {
        this.parent.innerHTML = `
            <aside class="sidebar" id="sidebar">
                <nav>
                    <ul class="nav-menu">
                        <li><a href="#" id="nav-home" class="nav-link"><i class="pi pi-home"></i> <span>Главная</span></a></li>
                        <li><a href="#" id="nav-author" class="nav-link"><i class="pi pi-user"></i> <span>Об авторе</span></a></li>
                        <li><a href="#" id="nav-add" class="nav-link"><i class="pi pi-plus"></i> <span>Добавить курс</span></a></li>
                    </ul>
                </nav>
            </aside>
        `;
        this.addListeners(onHomeClick, onAddClick, onAuthorClick);
    }
}
