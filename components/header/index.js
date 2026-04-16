export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(onLogoClick, onMenuToggle) {
        document.getElementById('header-logo').addEventListener('click', (e) => {
            e.preventDefault();
            onLogoClick();
        });
        document.getElementById('menu-toggle').addEventListener('click', onMenuToggle);
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            document.getElementById('theme-toggle').innerHTML = document.body.classList.contains('dark-theme') ? '☀' : '☾';
        });
    }

    render(onLogoClick, onMenuToggle) {
        this.parent.innerHTML = `
            <header class="bmstu-header">
                <button id="menu-toggle" class="menu-toggle"><i class="pi pi-bars"></i></button>
                <button id="header-logo" class="logo-link">
                    <img src="https://technored.ru/upload/iblock/7b0/s7f4qpo20l8zyi4b0hb9l14jvx687ipq.png" class="logo-img" alt="МГТУ Лого">
                </button>
                <button id="theme-toggle" class="theme-btn">${document.body.classList.contains('dark-theme') ? '☀' : '☾'}</button>
            </header>
        `;
        this.addListeners(onLogoClick, onMenuToggle);
    }
}
