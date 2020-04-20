this.die = 4;
this.rolls = 1;
this.modifier = 0;
this.typeOfRoll = 'regular';
this.counter = 0;

function rollDice(formElement) {
    console.log("dice: ", this.die);
    console.log({formElement});
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
    modifierInput.setAttribute('required', "required");


    container.appendChild(modifierLabel);
    container.appendChild(modifierInput);
}

function addRemoveButton() { 
    const container = this.addNewElementContainer();
    container.classList.add('remove-button-container');
    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.innerText ="Remove";

    container.appendChild(removeButton);
}

function addNewElementContainer() {
    let newContainer = document.createElement('div');
    newContainer.classList.add('form-element');
    document.getElementById(`dice-row-${this.counter}`).appendChild(newContainer);
    return newContainer;
}
