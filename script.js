window.onload = function() {
    // ========== ЛОГИКА КАЛЬКУЛЯТОРА ==========
    let a = '';
    let b = '';
    let selectedOperation = null;
    let errorFlag = false;

    // Переменные для управления масштабированием шрифта
    let shrinkCount = 0;
    const maxShrink = 3;
    const shrinkFactor = 0.8;   // уменьшение на 20% при каждом шаге
    let blockInput = false;     // блокировка ввода новых символов
    let baseFontSize = 24;      // будет установлена позже

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    // Определяем базовый размер шрифта в пикселях
    function initBaseFontSize() {
        baseFontSize = parseFloat(window.getComputedStyle(outputElement).fontSize);
        if (isNaN(baseFontSize) || baseFontSize <= 0) baseFontSize = 24;
        outputElement.style.fontSize = baseFontSize + 'px';
    }

    // Функция проверки переполнения
    function isOverflow() {
        void outputElement.offsetWidth; // принудительный reflow
        return outputElement.scrollWidth > outputElement.clientWidth;
    }

    // Универсальная функция подстройки размера шрифта под содержимое
    function adjustFontSize() {
        if (outputElement.innerHTML === 'Error' || outputElement.innerHTML === '0' || outputElement.innerHTML === '') {
            return;
        }

        let overflow = isOverflow();
        let iterations = 0;
        const maxIterations = 20;

        // Уменьшаем шрифт при переполнении, если есть лимит
        while (overflow && shrinkCount < maxShrink && iterations < maxIterations) {
            let currentSize = parseFloat(window.getComputedStyle(outputElement).fontSize);
            if (isNaN(currentSize) || currentSize <= 1) break;
            let newSize = currentSize * shrinkFactor;
            outputElement.style.fontSize = newSize + 'px';
            shrinkCount++;
            overflow = isOverflow();
            iterations++;
        }

        // Увеличиваем шрифт, если есть свободное место и были уменьшения
        while (!overflow && shrinkCount > 0 && iterations < maxIterations) {
            let currentSize = parseFloat(window.getComputedStyle(outputElement).fontSize);
            let potentialSize = currentSize / shrinkFactor;
            if (potentialSize > baseFontSize) potentialSize = baseFontSize;
            outputElement.style.fontSize = potentialSize + 'px';
            let newOverflow = isOverflow();
            if (newOverflow) {
                // Если увеличение вызвало переполнение, возвращаем старый размер
                outputElement.style.fontSize = currentSize + 'px';
                break;
            } else {
                shrinkCount--;
                overflow = false;
            }
            iterations++;
        }

        // Блокировка ввода: если исчерпан лимит И в данный момент есть переполнение
        blockInput = (shrinkCount >= maxShrink) && isOverflow();
    }

    // Полный сброс масштабирования (устанавливаем базовый размер)
    function resetFontScaling() {
        outputElement.style.fontSize = baseFontSize + 'px';
        shrinkCount = 0;
        blockInput = false;
    }

    // Установка состояния ошибки
    function setError() {
        outputElement.innerHTML = 'Error';
        a = '';
        b = '';
        selectedOperation = null;
        errorFlag = true;
        resetFontScaling();
    }

    // Обработчик нажатия на цифры и точку
    function onDigitButtonClicked(digit) {
        if (blockInput) return;

        if (errorFlag) {
            errorFlag = false;
            resetFontScaling(); // начинаем новое число с чистого листа
            a = digit;
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
            adjustFontSize();
            return;
        }

        if (!selectedOperation) {
            if (digit === '.' && a.includes('.')) return;
            a += digit;
            outputElement.innerHTML = a;
            adjustFontSize();
        } else {
            if (digit === '.' && b.includes('.')) return;
            b += digit;
            outputElement.innerHTML = b;
            adjustFontSize();
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            onDigitButtonClicked(button.innerHTML);
        };
    });

    // Вычисление результата
    function compute() {
        if (a === '' || b === '' || !selectedOperation) return;

        let result;
        switch (selectedOperation) {
            case 'x': result = (+a) * (+b); break;
            case '+': result = (+a) + (+b); break;
            case '-': result = (+a) - (+b); break;
            case '/':
                if (+b === 0) {
                    setError();
                    return;
                }
                result = (+a) / (+b);
                break;
            default: return;
        }

        if (!isFinite(result)) {
            setError();
            return;
        }

        a = result.toString();
        b = '';
        selectedOperation = null;
        // Результат — новое число, сбрасываем масштабирование и применяем
        resetFontScaling();
        outputElement.innerHTML = a;
        adjustFontSize();
    }

    // Обработчик бинарных операций
    function handleOperation(op) {
        if (errorFlag) {
            errorFlag = false;
            a = '';
            resetFontScaling();
        }
        if (a === '') return;

        // Если уже есть операция и второе число, сначала вычисляем
        if (selectedOperation && b !== '') {
            compute();
            if (errorFlag) return;
        }
        // Переходим к новой операции: показываем оператор (сбрасываем масштаб)
        selectedOperation = op;
        resetFontScaling();
        outputElement.innerHTML = op;
        adjustFontSize(); // оператор обычно короткий, но проверим
    }

    document.getElementById("btn_op_mult").onclick = function() { handleOperation('x'); };
    document.getElementById("btn_op_plus").onclick  = function() { handleOperation('+'); };
    document.getElementById("btn_op_minus").onclick = function() { handleOperation('-'); };
    document.getElementById("btn_op_div").onclick  = function() { handleOperation('/'); };

    // Кнопка π (ввод числа Пи)
    document.getElementById("btn_pi").onclick = function() {
        if (blockInput) return; // если ввод заблокирован, π тоже не добавляем
        if (errorFlag) errorFlag = false;
        const piValue = Math.PI.toString();
        if (!selectedOperation) {
            // Начинаем новое первое число
            resetFontScaling();
            a = piValue;
            outputElement.innerHTML = a;
        } else {
            // Начинаем новое второе число
            resetFontScaling();
            b = piValue;
            outputElement.innerHTML = b;
        }
        adjustFontSize();
    };

    // Кнопка стирания (CE)
    document.getElementById("btn_op_erase").onclick = function() {
        if (errorFlag) {
            a = '';
            b = '';
            selectedOperation = null;
            errorFlag = false;
            outputElement.innerHTML = '0';
            resetFontScaling();
            return;
        }
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
        adjustFontSize(); // после удаления проверяем, можно ли увеличить шрифт
    };

    // Факториал
    function factorial(n) {
        if (!Number.isInteger(n) || n < 0) {
            setError();
            return null;
        }
        if (n === 0) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
            if (!isFinite(result)) {
                setError();
                return null;
            }
        }
        return result;
    }

    document.getElementById("btn_op_factorial").onclick = function() {
        if (errorFlag) errorFlag = false;
        if (selectedOperation && b !== '') {
            let num = parseFloat(b);
            if (isNaN(num)) return;
            let fact = factorial(num);
            if (fact !== null) {
                b = fact.toString();
                outputElement.innerHTML = b;
                adjustFontSize();
            }
        } else if (!selectedOperation && a !== '') {
            let num = parseFloat(a);
            if (isNaN(num)) return;
            let fact = factorial(num);
            if (fact !== null) {
                a = fact.toString();
                outputElement.innerHTML = a;
                adjustFontSize();
            }
        }
    };

    // Смена знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (errorFlag) errorFlag = false;
        if (selectedOperation && b !== '') {
            b = (-parseFloat(b)).toString();
            outputElement.innerHTML = b;
            adjustFontSize();
        } else if (!selectedOperation && a !== '') {
            a = (-parseFloat(a)).toString();
            outputElement.innerHTML = a;
            adjustFontSize();
        }
    };

    // Процент
    document.getElementById("btn_op_percent").onclick = function() {
        if (errorFlag) errorFlag = false;
        if (selectedOperation && b !== '') {
            b = (parseFloat(b) / 100).toString();
            outputElement.innerHTML = b;
            adjustFontSize();
        } else if (!selectedOperation && a !== '') {
            a = (parseFloat(a) / 100).toString();
            outputElement.innerHTML = a;
            adjustFontSize();
        }
    };

    // Полная очистка (C)
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        errorFlag = false;
        outputElement.innerHTML = '0';
        resetFontScaling();
    };

    // Равно
    document.getElementById("btn_op_equal").onclick = function() {
        if (errorFlag) return;
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

    function toggleMenu(force) {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open', force);
            overlay.classList.toggle('active', force);
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => toggleMenu());
    }

    if (overlay) {
        overlay.addEventListener('click', () => toggleMenu(false));
    }

    function showPage(pageId) {
        pages.forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'block';
    }

    function setActiveLink(linkId) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(linkId);
        if (activeLink) activeLink.classList.add('active');
    }

    document.getElementById('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('home-page');
        setActiveLink('nav-home');
        toggleMenu(false);
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

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        } else {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
        // При изменении размера окна пересчитываем масштабирование
        adjustFontSize();
    });

    // Инициализация
    showPage('calculator-page');
    setActiveLink('nav-calc');
    initBaseFontSize();   // запоминаем базовый размер шрифта
    resetFontScaling();   // устанавливаем исходный размер
    outputElement.innerHTML = '0';
};
