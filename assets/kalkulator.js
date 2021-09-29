//membuat displayNumber, operator, firstNumber, dan waitingForSecondNumber.
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};


//Setelah membuat object calculator, selanjutnya kita buat fungsi - fungsi umum yang dilakukan kalkulator seperti meng-update angka pada layar 
//dan menghapus data pada kalkulator.

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//Lalu kita buat juga fungsi untuk memasukkan angka ke dalam nilai displayNumber kalkulator.

function inputDigit(digit) {
    if (calculator.displayNumber == '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

//kita akan melengkapi beberapa fungsi lainnya yang ada pada kalkulator, yakni fungsi negative, operator, dan equals. Untuk itu, buat kondisi lainnya pada event 

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        inputDigit(target.innerText);
        updateDisplay()

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }
    });
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        calculator.displayNumber = '0';
    } else {
        alert('Operator Sudah Ditetapkan')
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda Belum Menetapkan Operator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    calculator.displayNumber = result;
}