export class SidebarComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(onHomeClick, onAuthorClick) {
        document.getElementById('nav-home').addEventListener('click', (e) => {
            e.preventDefault();
            onHomeClick();
        });
        document.getElementById('nav-author').addEventListener('click', (e) => {
            e.preventDefault();
            onAuthorClick();
        });
    }

    toggle() {
        document.getElementById('sidebar').classList.toggle('open');
    }

    render(onHomeClick, onAuthorClick) {
        this.parent.innerHTML = `
            <aside class="sidebar" id="sidebar">
                <nav>
                    <ul class="nav-menu">
                        <li><a href="#" id="nav-home" class="nav-link"><i class="pi pi-home"></i> Главная</a></li>
                        <li><a href="#" id="nav-author" class="nav-link"><i class="pi pi-user"></i> Автор</a></li>
                    </ul>
                </nav>
            </aside>
        `;
        this.addListeners(onHomeClick, onAuthorClick);
    }
}
