window.onload = function() {
    let a = '';                // Первое число
    let b = '';                // Второе число
    let selectedOperation = null; // Выбранная операция

    const outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    // Обработка цифр и точки
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            // Ввод первого числа (или результата)
            if (digit === '.' && a.includes('.')) return; // запрет второй точки
            a += digit;
            outputElement.innerHTML = a;
        } else {
            // Ввод второго числа
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

    // Функция вычисления текущего выражения
    function compute() {
        if (a === '' || b === '' || !selectedOperation) return;

        let result;
        switch (selectedOperation) {
            case 'x': result = (+a) * (+b); break;
            case '+': result = (+a) + (+b); break;
            case '-': result = (+a) - (+b); break;
            case '/':
                if (+b === 0) {
                    alert('Деление на ноль!');
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

    // Общий обработчик для операций
    function handleOperation(op) {
        if (a === '') return;        // нет первого числа – игнорируем

        // Если уже есть оба числа и операция – сначала вычисляем
        if (selectedOperation && b !== '') {
            compute();
        }

        // Устанавливаем новую операцию
        selectedOperation = op;
        outputElement.innerHTML = op; // показываем символ операции
    }

    // Кнопки операций
    document.getElementById("btn_op_mult").onclick = function() { handleOperation('x'); };
    document.getElementById("btn_op_plus").onclick  = function() { handleOperation('+'); };
    document.getElementById("btn_op_minus").onclick = function() { handleOperation('-'); };
    document.getElementById("btn_op_div").onclick  = function() { handleOperation('/'); };


    // Кнопка π
    document.getElementById("btn_pi").onclick = function() {
        const piValue = Math.PI.toString(); // "3.141592653589793"
        if (!selectedOperation) {
            a = piValue;
            outputElement.innerHTML = a;
        } else {
            b = piValue;
            outputElement.innerHTML = b;
        }
    };

    // Стирание последнего символа (CE)
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
            // Если нечего стирать
            outputElement.innerHTML = '0';
        }
    };

    function factorial(n) {
        // Проверка: n должно быть целым неотрицательным числом
        if (!Number.isInteger(n) || n < 0) {
            alert('Факториал определён только для целых неотрицательных чисел');
            return null;
        }
        if (n === 0) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
            // Защита от переполнения
            if (!isFinite(result)) {
                alert('Слишком большое число');
                return null;
            }
        }
        return result;
    }


   // Факториал
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



   // Смена знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (selectedOperation && b !== '') {
            b = (-parseFloat(b)).toString();
            outputElement.innerHTML = b;
        } else if (!selectedOperation && a !== '') {
            a = (-parseFloat(a)).toString();
            outputElement.innerHTML = a;
        }
    };

    // Процент (деление на 100)
    document.getElementById("btn_op_percent").onclick = function() {
        if (selectedOperation && b !== '') {
            b = (parseFloat(b) / 100).toString();
            outputElement.innerHTML = b;
        } else if (!selectedOperation && a !== '') {
            a = (parseFloat(a) / 100).toString();
            outputElement.innerHTML = a;
        }
    };

    // Очистка
    document.getElementById("btn_op_clear").onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = '0';
    };

    // Равно
    document.getElementById("btn_op_equal").onclick = function() {
        if (a !== '' && b !== '' && selectedOperation) {
            compute();
        }
    };
};
