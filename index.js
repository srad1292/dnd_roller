let die = 4;
let rolls = 1;
let modifier = 0;

function rollDice(formElement) {
    this.getFormValues(formElement);
    const roll = this.performRoll();
    this.printResults(roll);
}

function getFormValues(formElement) {
    this.die = parseInt(formElement.typeOfDie.value);
    this.rolls = parseInt(formElement.numberOfRolls.value);
    this.modifier = formElement.modifier.value ? parseInt(formElement.modifier.value) : 0;
}


function performRoll() {
    let results = [];
    let sum = 0;
    for(let rollNumber = 0; rollNumber < this.rolls; rollNumber++) {
        let result = this.rollSingleDice();
        results.push(result);
        sum += result;
    }
    sum += this.modifier;
    console.log({results, sum});
    return {results, sum};
}

function rollSingleDice() {
    return Math.ceil(Math.random() * this.die);
}

function printResults(roll) {
    let lines = [`Rolling D${this.die}...`];
    for(let result of roll.results) {
        lines.push(`Rolled: ${result}`);
    }

    if(modifier) {
        lines.push(`Adding Modifier of ${this.modifier}`);
    }

    lines.push(`Total for this roll is: ${roll.sum}`);

    const text = lines.join("\n");
    document.getElementById('roll-log').innerHTML = text;
}


