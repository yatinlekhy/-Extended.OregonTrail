(function () {
    console.log('hey')
    let Traveler = function (name) {
        this.name = name;
        this.food = 1;
        this.isHealthy = true;
    }

    let Wagon = function (capacity) {
        this.capacity = capacity;
        this.passenger = [];
    }

    Traveler.prototype.hunt = function () {
        this.food = this.food + 2
    }

    Traveler.prototype.eat = function () {
        if (this.food > 0) {
            this.food--
            // this.food-=1
            // this.food=this.food-1

        }
        else {
            this.isHealthy = false;
        }

    }

    Wagon.prototype.getAvailableSeatCount = function () {
        return this.capacity - this.passenger.length;
    }

    Wagon.prototype.join = function (Traveler) {
        if (this.capacity > this.passenger.length) {
            this.passenger.push(Traveler);
        }
        else {
            console.log("Don't add")
        }
    }

    Wagon.prototype.shouldQuarantine = function () {
        for (let i = 0; i < this.passenger.length; i++) {
            if (this.passenger[i].isHealthy === false) {
                return true
            }
        }
        return false

    }
    Wagon.prototype.totalFood = function () {
        let foodCount = 0
        for (let i = 0; i < this.passenger.length; i++) {
            foodCount = foodCount + this.passenger[i].food
        }
        return foodCount
    }
    // function Dog (name, breed, isGoodBoy) {
    //     this.name = name;
    //     this.breed = breed;
    //     this.isGoodBoy = isGoodBoy;
    // }
    // Dog.prototype.sit = function () {
    //         // sitting code here
    // }
    // function GuardDog (name, breed, isGoodBoy, attackWord) {
    //     Dog.call(this, name, breed, isGoodBoy);
    //     this.attackWord = attackWord;
    // }
    // GuardDog.prototype = Object.create(Dog.prototype);
    // GuardDog.prototype.constructor = GuardDog;
    // GuardDog.prototype.bark = function () {
    //     // barking code here
    // }
    function Doctor(name) {
        Traveler.call(this, name)
    }
    Doctor.prototype = Object.create(Traveler.prototype);
    Doctor.prototype.constructor = Doctor;
    Doctor.prototype.heal = function (Traveler) {
        Traveler.isHealthy = true;
    }
    function Hunter(name) {
        Traveler.call(this, name)
        this.food = 2
    }
    Hunter.prototype = Object.create(Traveler.prototype);
    Hunter.prototype.constructor = Hunter;
    Hunter.prototype.hunt = function () {
        this.food = this.food + 5
    }
    Hunter.prototype.eat = function () {
        if (this.food > 1) {
            this.food = this.food - 2
        } else {
        this.food = 0
            this.isHealthy = false

        }
    }
    Hunter.prototype.giveFood = function (Traveler, numOfFoodUnits) {
        if (numOfFoodUnits > this.food) {
        }else {
            this.food = this.food - numOfFoodUnits
        Traveler.food = Traveler.food + numOfFoodUnits
        }
    }
// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(wagon)
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);

})()


