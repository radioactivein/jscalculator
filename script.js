class Calculator{
    constructor(perviousOperandTextElement, currentOperandTextElement){
        this.perviousOperandTextElement = perviousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.perviousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.perviousOperand !== ''){
            this.compute()
        }
        this.operation = operation 
        this.perviousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        let prev = parseInt(this.perviousOperand)
        let current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break 
            case '*':
                computation = prev * current
                break    
            case '÷':
                computation = prev / current
                break   
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.perviousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(integerDigits)){
            intergerDisplay = ''
        } else{
            intergerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        }
        else{
            return intergerDisplay
        }
        }
        
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.perviousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.perviousOperand)} ${this.operation}`
        }else{
            this.perviousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const perviousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(perviousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
deleteButtonButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})