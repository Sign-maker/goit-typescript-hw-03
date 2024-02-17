class Key {
  constructor(private signature = Math.trunc(Math.random() * 100000)) {}

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}
  getKey() {
    return this.key;
  }
}

abstract class House {
  public door: boolean;
  private tenants: Person[] = [];

  constructor(protected key: Key) {}

  comeIn(person: Person) {
    if (!this.door) {
      console.log("Door is closed!");
      return;
    }

    console.log("Door is open, plase come in");
    this.tenants.push(person);
  }

  abstract openDoor(key: Key): void;

  abstract closeDoor(): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  openDoor(key: Key): void {
    console.log("Please, Put key on the reader");

    if (key.getSignature() !== this.key.getSignature()) {
      console.log("Sorry, wrong key!");
      return;
    }

    console.log("Key accepted");
    this.door = true;
  }

  closeDoor() {
    if (!this.door) return;
    console.log("Door closes automatically");
    this.door = false;
  }
}

// OK  key
const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);
house.closeDoor();

// Wrong  key
const key2 = new Key();
const person2 = new Person(key2);

house.openDoor(person2.getKey());
house.comeIn(person2);
house.closeDoor();

//New house
const house2 = new MyHouse(key2);
house2.openDoor(person2.getKey());
house2.comeIn(person2);
house2.closeDoor();

export {};
