class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    clear() {
        this.previousText = ""
        this.currentText = ""
        this.operation = undefined
    }

    delete() {
        if 
        this.currentText = this.currentText.toString().slice(0, -1)

            document.getElementById("point").style.backgroundColor= "grey";

        

    }

    appendNumber(number) {
        if (number === ".") {
            document.getElementById("point").style.backgroundColor= "lightgrey";
        }
        if (number === "." && this.currentText.includes(".")) {
            return
        }
        this.currentText = this.currentText.toString() + number.toString()

    }

    // TO DO: visually display using css if a point has been used "."

    arithmeticOperation(operation) {
        //If user is chaining multiple operations, calculate on operation press
        if (this.currentText === "") return
        if (this.previousText !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousText = this.currentText
        this.currentText = ""
    }

    compute() {
        let computation
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
// FIX ME  
            case "%":
                computation = current / 100
                break  
            default:
                return
        }
        this.currentText = computation
        this.operation = undefined
        this.previousText = ""
    }



    updateDisplay() {
        this.currentTextElement.innerText = this.currentText
        if (this.operation != null) {
            this.previousTextElement.innerText = `${this.previousText}${this.operation}`
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