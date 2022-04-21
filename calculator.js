class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    //Clear function sets previous text and current text to a blank string
    clear() {
        this.previousText = ""
        this.currentText = ""
        this.operation = undefined
        this.previousTextElement.innerText = ""
        this.currentTextElement.innerText = ""
        this.updateDisplay()
    }

    //Delete function removes last character of string
    delete() {
        this.currentText = this.currentText.toString().slice(0, -1)
        this.checkForDecimal()
    }        

    //Changes the CSS providing a visual indicator whether or not the decimal has been used
    checkForDecimal() {
        if (this.currentText.includes(".") == true) {
            document.getElementById("point").style.backgroundColor= "lightgrey";
        } else {
            document.getElementById("point").removeAttribute("style");
        }
    }

    //Adds a number to the end of the current string. Wont add more than one decimal
    appendNumber(number) {
        if (number === "." && this.currentText.includes(".")) {
            return
        }
        this.currentText = this.currentText.toString() + number.toString()
        this.checkForDecimal()

    }

    //If user is chaining multiple operations, calculate on operation press
    arithmeticOperation(operation) {
        if (this.currentText === "") return
        if (this.previousText !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousText = this.currentText
        this.currentText = ""
        this.checkForDecimal()
    }

    compute() {
        let computation
        this.checkForDecimal()
        const previous = parseFloat(this.previousText)
        const current = parseFloat(this.currentText)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = previous + current
                
                break
            case "-":
                computation = previous - current
                break
            case "×":
                computation = previous * current
                break
            case "÷":
                computation = previous / current
                break    

//FIX ME OR DELETE ME
            case "%":
                computation = (previous / current) * 100
                break  
            default:
                return
        }
        
        computation = this.roundUp(computation)
        this.currentText = computation
        this.operation = undefined
        this.previousText = ""
    }

    roundUp(number) {
        return Math.round(number * 1000) / 1000
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(intDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = intDigits.toLocaleString("en", {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = 
        this.getDisplayNumber(this.currentText)
        if (this.operation != null) {
            this.previousTextElement.innerText =
             `${this.getDisplayNumber(this.previousText)} ${this.operation}`
        } else {
            this.previousTextElement.innerText = ""
        }
    }
}

const numberButton = document.querySelectorAll('[js-number]')
const equalsButton = document.querySelector('[js-equals]')
const operationButton = document.querySelectorAll('[js-operation]')
const deleteButton = document.querySelector('[js-delete]')
const clearButton = document.querySelector('[js-clear]')
const currentTextElement = document.querySelector('[js-current]')
const previousTextElement = document.querySelector('[js-previous]')

//Create calculator 
const calculator = new Calculator(previousTextElement, currentTextElement)

//Event listeners

//Number
numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//Operation
operationButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.arithmeticOperation(button.innerText)
        calculator.updateDisplay()
    })
})

//Equals
equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})


//Delete
deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})


//All clear
clearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})