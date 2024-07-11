class Car {
  #brand;
  #model;
  #speed = 0;
  isTrunkOpen = false;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  go(acceleration = 50) {
    if (!this.isTrunkOpen && this.#speed + acceleration <= 300) {
      this.#speed += acceleration;
    }
  }
  brake() {
    if (this.#speed >= 5) this.#speed -= 5;
  }
  openTrunk() {
    if (!this.isTrunkOpen && this.#speed === 0) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk() {
    if (this.isTrunkOpen) {
      this.isTrunkOpen = false;
    }
  }
  displayInfo() {
    console.log(
      this.#brand,
      this.#model +
        `\nSpeed : ${this.#speed} km/h\n Trunk open is ${this.isTrunkOpen}`
    );
  }
}

class RaceCar extends Car {
  acceleration;
  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
    super.go(acceleration);
  }
  go(acceleration) {
    if (this.acceleration < 300) {
      this.acceleration += acceleration;
    }
    super.go(acceleration);
  }
  displayInfo() {
    console.log(
      this.brand,
      this.model +
        `\nTrunk open is ${this.isTrunkOpen}\nacceleration is ${this.acceleration}\nSpeed : ${this.speed} km/h`
    );
  }
}

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Tesla", "Model 3");
const raceCar = new RaceCar("McLaren", "F1", 20);
// raceCar.go(280);
// raceCar.displayInfo();
//console.log(`${car1}\n${car2}`);
console.log(car1);
console.log(car2);
//car1.#model;

// car1.model = "benz";
// console.log(car1);
//displayBothCarsInfo();

/*car1.go();
car2.brake();
car1.go();
displayBothCarsInfo();
car2.displayInfo();
car1.go();
car2.brake();
car1.displayInfo();
car2.displayInfo();
car1.go();
car2.go();
car1.displayInfo();
car2.displayInfo();
car1.go();
car2.go();
car1.displayInfo();
car2.displayInfo();
car1.brake();
car2.go();
car1.displayInfo();
car2.displayInfo();*/

function displayBothCarsInfo() {
  car1.displayInfo();
  car2.displayInfo();
}

/*displayBothCarsInfo();
car1.openTrunk();
car2.openTrunk();
displayBothCarsInfo();
car1.go();
car2.closeTrunk();
car2.go();
displayBothCarsInfo();
car1.closeTrunk();
car1.go();
car2.openTrunk();
displayBothCarsInfo();*/
