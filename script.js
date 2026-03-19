window.onload = function() {
    // ========== ЛОГИКА КАЛЬКУЛЯТОРА ==========
    let a = '';                // Первое число
    let b = '';                // Второе число
    let selectedOperation = null; // Выбранная операция

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (digit === '.' && a.includes('.')) return;
            a += digit;
            outputElement.innerHTML = a;
        } else {
            if (digit === '.' && b.includes('.')) return;
            b += digit;
            outputElement.innerHTML = b;
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            onDigitButtonClicked(button.innerHTML);
        };
    });

    function compute() {
        if (a === '' || b === '' || !selectedOperation) return;

        let result;
        switch (selectedOperation) {
            case 'x': result = (+a) * (+b); break;
            case '+': result = (+a) + (+b); break;
            case '-': result = (+a) - (+b); break;
            case '/':
                if (+b === 0) {
                    console.error('Деление на ноль!');
                    return;
                }
                result = (+a) / (+b);
                break;
            default: return;
        }

        a = result.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    }

    function handleOperation(op) {
        if (a === '') return;
        if (selectedOperation && b !== '') {
            compute();
        }
        selectedOperation = op;
        outputElement.innerHTML = op;
    }

    document.getElementById("btn_op_mult").onclick = function() { handleOperation('x'); };
    document.getElementById("btn_op_plus").onclick  = function() { handleOperation('+'); };
    document.getElementById("btn_op_minus").onclick = function() { handleOperation('-'); };
    document.getElementById("btn_op_div").onclick  = function() { handleOperation('/'); };

    document.getElementById("btn_pi").onclick = function() {
        const piValue = Math.PI.toString();
        if (!selectedOperation) {
            a = piValue;
            outputElement.innerHTML = a;
        } else {
            b = piValue;
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_erase").onclick = function() {
        if (selectedOperation && b !== '') {
            b = b.slice(0, -1);
            if (b === '' || b === '-') {
                b = '';
                outputElement.innerHTML = '0';
            } else {
                outputElement.innerHTML = b;
            }
        } else if (!selectedOperation && a !== '') {
            a = a.slice(0, -1);
            if (a === '' || a === '-') {
                a = '';
                outputElement.innerHTML = '0';
            } else {
                outputElement.innerHTML = a;
            }
        } else {
            outputElement.innerHTML = '0';
        }
    };

    function factorial(n) {
        if (!Number.isInteger(n) || n < 0) {
            console.error('Факториал определён только для целых неотрицательных чисел');
            return null;
        }
        if (n === 0) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
            if (!isFinite(result)) {
                console.error('Слишком большое число');
                return null;
            }
        }
        return result;
    }

    document.getElementById("btn_op_factorial").onclick = function() {
        if (selectedOperation && b !== '') {
            let num = parseFloat(b);
            if (isNaN(num)) return;
            let fact = factorial(num);
            if (fact !== null) {
                b = fact.toString();
                outputElement.innerHTML = b;
            }
        } else if (!selectedOperation && a !== '') {
            let num = parseFloat(a);
            if (isNaN(num)) return;
            let fact = factorial(num);
            if (fact !== null) {
                a = fact.toString();
                outputElement.innerHTML = a;
            }
        }
    };

    document.getElementById("btn_op_sign").onclick = function() {
        if (selectedOperation && b !== '') {
            b = (-parseFloat(b)).toString();
            outputElement.innerHTML = b;
        } else if (!selectedOperation && a !== '') {
            a = (-parseFloat(a)).toString();
            outputElement.innerHTML = a;
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (selectedOperation && b !== '') {
            b = (parseFloat(b) / 100).toString();
            outputElement.innerHTML = b;
        } else if (!selectedOperation && a !== '') {
            a = (parseFloat(a) / 100).toString();
            outputElement.innerHTML = a;
        }
    };

    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = '0';
    };

    document.getElementById("btn_op_equal").onclick = function() {
        if (a !== '' && b !== '' && selectedOperation) {
            compute();
        }
    };

    // ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀';
    } else {
        themeToggle.textContent = '☾';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀' : '☾';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ========== ЛОГИКА МЕНЮ И СТРАНИЦ ==========
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // Функция открытия/закрытия меню на мобильных
    function toggleMenu(force) {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open', force);
            overlay.classList.toggle('active', force);
        }
    }

    // Гамбургер
    if (menuToggle) {
        menuToggle.addEventListener('click', () => toggleMenu());
    }

    // Оверлей
    if (overlay) {
        overlay.addEventListener('click', () => toggleMenu(false));
    }

    // Переключение страниц
    function showPage(pageId) {
        pages.forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'block';
    }

    // Активный пункт меню
    function setActiveLink(linkId) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(linkId);
        if (activeLink) activeLink.classList.add('active');
    }

    // Обработчики кликов по пунктам меню
    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('home-page');
        setActiveLink('nav-home');
        toggleMenu(false); // закрыть меню после выбора (на мобильных)
    });

    document.getElementById('nav-author').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('author-page');
        setActiveLink('nav-author');
        toggleMenu(false);
    });

    document.getElementById('nav-calc').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('calculator-page');
        setActiveLink('nav-calc');
        toggleMenu(false);
    });

    // При изменении размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // На широком экране меню открыто, оверлей скрыт
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        } else {
            // На узком экране меню должно быть закрыто
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });

    // Инициализация: показываем калькулятор, активный пункт
    showPage('calculator-page');
    setActiveLink('nav-calc');
};
