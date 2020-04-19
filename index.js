let die = 4;
let rolls = 1;
let modifier = 0;
let typeOfRoll = 'regular';

function rollDice(formElement) {
    this.getFormValues(formElement);
    const rolls = [];
    rolls.push(this.performRoll());
    if(this.typeOfRoll === 'advantage' || this.typeOfRoll === 'disadvantage') {
        rolls.push(this.performRoll());
    }
    this.printResults(rolls);
}

function getFormValues(formElement) {
    this.die = parseInt(formElement.typeOfDie.value);
    this.rolls = parseInt(formElement.numberOfRolls.value);
    this.modifier = formElement.modifier.value ? parseInt(formElement.modifier.value) : 0;
    this.typeOfRoll = formElement.typeOfRoll.value;
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

function printResults(rolls) {
    let sums = [];
    let lines = [];
    rolls.forEach(roll => {
        lines.push(`Rolling D${this.die}...`);
        for(let result of roll.results) {
            lines.push(`Rolled: ${result}`);
        }

        if(this.modifier) {
            lines.push(`Adding Modifier of ${this.modifier}`);
        }

        lines.push(`Total for this roll is: ${roll.sum}`);
        sums.push(roll.sum);

        lines.push('');
    });

    if(this.typeOfRoll === 'advantage') {
        sums = this.sortRolls(sums);
        lines.push('Taking the highest roll');
        lines.push(`Highest roll is: ${sums[0]}`);
    } else if(this.typeOfRoll === 'disadvantage'){
        sums = this.sortRolls(sums);
        lines.push('Taking the lowest roll');
        lines.push(`Lowest roll is: ${sums[1]}`);
    }
    
    const text = lines.join("\n");
    document.getElementById('roll-log').innerHTML = text;
}


function sortRolls(sums) {
    return sums.sort((a,b) => {
        return a <= b;
    });
}

