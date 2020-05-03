this.typeOfRoll = 'regular';
this.basicRoll = {
    die: 4,
    rolls: 1,
    modifier: 0
};

this.counter = 0;

this.extraDiceCounters = [];

this.extraDiceValues = [];

function rollDice(formElement) {
    // console.log("dice: ", this.die);
    console.log({formElement});
    this.getFormValues(formElement);
    console.log({basic: this.basicRoll, extra: this.extraDiceValues});
    
    const rollGroups = this.getRollValues();
    this.printResults(rollGroups);
}

function getFormValues(formElement) {
    this.basicRoll.die = parseInt(formElement.typeOfDie.value);
    this.basicRoll.rolls = parseInt(formElement.numberOfRolls.value);
    this.basicRoll.modifier = formElement.modifier.value ? parseInt(formElement.modifier.value) : 0;
    this.typeOfRoll = formElement.typeOfRoll.value;

    if(this.extraDiceCounters.length > 0) {
        extraDiceCounters.forEach(counter => {
            const extraDice = {
                die: parseInt(formElement[`typeOfDie${counter}`].value),
                rolls: parseInt(formElement[`numberOfRolls${counter}`].value),
                modifier: formElement[`modifier${counter}`].value ? parseInt(formElement[`modifier${counter}`].value) : 0 
            };
            this.extraDiceValues.push(extraDice);
        })
    }
}

function getRollValues() {
    const rolls = [];
    
    const basicRoll = this.performRoll(this.basicRoll);
    let firstGroup = this.extraDiceValues.map(diceRow => {
        return this.performRoll(diceRow);
    });
    firstGroup.unshift(basicRoll);
    rolls.push(firstGroup);

    if(this.typeOfRoll === 'advantage' || this.typeOfRoll === 'disadvantage') {
        const basicRollTwo = this.performRoll(this.basicRoll);
        let secondGroup = this.extraDiceValues.map(diceRow => {
            return this.performRoll(diceRow);
        });
        secondGroup.unshift(basicRollTwo);
        rolls.push(secondGroup);
    }

    return rolls;
}


function performRoll(dice) {
    let results = [];
    let sum = 0;
    for(let rollNumber = 0; rollNumber < dice.rolls; rollNumber++) {
        let result = this.rollSingleDice(dice);
        results.push(result);
        sum += result;
    }
    sum += dice.modifier;
    console.log({results, sum});
    return {...dice, results, sum};
}

function rollSingleDice(dice) {
    return Math.ceil(Math.random() * dice.die);
}

function printResults(rollGroups) {
    let sums = [];
    let lines = [];
    console.log({rollGroups});
    try {
        rollGroups.forEach(rolls => {
            let groupSum = 0;
            rolls.forEach(roll => {
                lines.push(`Rolling D${roll.die}...`);
                for(let result of roll.results) {
                    lines.push(`Rolled: ${result}`);
                }

                if(roll.modifier) {
                    lines.push(`Adding Modifier of ${roll.modifier}`);
                }

                groupSum += roll.sum;
                lines.push('');
            });
            lines.push(`Total for this roll is: ${groupSum}`);
            sums.push(groupSum);

            lines.push('');
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
    } catch(error) {
        console.log(error);
    }
}


function sortRolls(sums) {
    return sums.sort((a,b) => {
        return a > b;
    });
}

function resetForm() {
    for(let index = this.extraDiceCounters.length-1; index >= 0; index--) {
        const counter = this.extraDiceCounters[index];
        this.removeDiceRow(counter)
    };

    this.counter = 0;
    this.extraDiceCounters = [];
    this.extraDiceValues = [];

    this.typeOfRoll = 'regular';
    this.basicRoll = {
        die: 4,
        rolls: 1,
        modifier: 0
    };

}

function addDiceRow(){
    try{
        this.addContainer();
        this.addTypeOfDiceInput();
        this.addNumberOfRollsInput();
        this.addModifierInput();
        this.addRemoveButton();
    } catch(error){
        console.log("Error adding row");
        console.log(error);
    }
}


function addContainer() {
    console.log("counter A: ", this.counter);
    this.counter++;
    this.extraDiceCounters.push(this.counter);
    console.log("counter: ", this.counter);
    let newContainer = document.createElement('div');
    newContainer.classList.add('flex-form');
    newContainer.setAttribute('id', `dice-row-${this.counter}`);
    document.getElementById('additional-dice-container').appendChild(newContainer);
}

function addTypeOfDiceInput() {
    const container = this.addNewElementContainer();

    let typeOfDieLabel = document.createElement('label');
    typeOfDieLabel.htmlFor = `typeOfDie${this.counter}`;
    typeOfDieLabel.innerText = "Type of Die:";
    
    let typeOfDieSelect = document.createElement('select');
    typeOfDieSelect.setAttribute('id', `typeOfDie${this.counter}`);

    [4, 6, 8, 10, 12, 20, 100].forEach(sides => {
        let diceOption = document.createElement("option");
        diceOption.text = `D${sides}`;
        diceOption.value = `${sides}`;
        typeOfDieSelect.appendChild(diceOption);
    });
    
    container.appendChild(typeOfDieLabel);
    container.appendChild(typeOfDieSelect);
}

function addNumberOfRollsInput() {
    const container = this.addNewElementContainer();

    let numberOfRollsLabel = document.createElement('label');
    numberOfRollsLabel.htmlFor = `numberOfRolls${this.counter}`;
    numberOfRollsLabel.innerText = "Number of Rolls:";

    let numberOfRollsInput = document.createElement('input');
    numberOfRollsInput.setAttribute('type', 'number');
    numberOfRollsInput.setAttribute('id', `numberOfRolls${this.counter}`);
    numberOfRollsInput.setAttribute('required', "required");


    container.appendChild(numberOfRollsLabel);
    container.appendChild(numberOfRollsInput);
}

function addModifierInput() { 
    const container = this.addNewElementContainer();

    let modifierLabel = document.createElement('label');
    modifierLabel.htmlFor = `modifier${this.counter}`;
    modifierLabel.innerText = "Modifier:";

    let modifierInput = document.createElement('input');
    modifierInput.setAttribute('type', 'number');
    modifierInput.setAttribute('id', `modifier${this.counter}`);


    container.appendChild(modifierLabel);
    container.appendChild(modifierInput);
}

function addRemoveButton() { 
    const container = this.addNewElementContainer();
    
    container.classList.add('remove-button-container');
    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.innerText ="Remove";

    const thisIndex = this.counter;
    removeButton.addEventListener('click', () => {this.removeDiceRow(thisIndex)});
    container.appendChild(removeButton);
}

function addNewElementContainer() {
    let newContainer = document.createElement('div');
    newContainer.classList.add('form-element');
    document.getElementById(`dice-row-${this.counter}`).appendChild(newContainer);
    return newContainer;
}

function removeDiceRow(counter) {
    const index = this.extraDiceCounters.findIndex(item => item === counter);
    console.log({counter, index});
    this.extraDiceCounters.splice(index, 1);

    const rowToRemove = document.getElementById(`dice-row-${counter}`);
    rowToRemove.remove();
}