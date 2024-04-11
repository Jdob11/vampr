class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires ++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common ancestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common ancestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common ancestor.
  closestCommonAncestor(vampire) {

    const path1 = [this];
    const path2 = [vampire];

    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      path1.push(currentVampire);
    }

    currentVampire = vampire;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      path2.push(currentVampire);
    }

    let commonAncestor = null;
    for (let i = 0; i < path1.length; i++) {
      for (let j = 0; j < path2.length; j++) {
        if (path1[i].name === path2[j].name) {
          commonAncestor = path1[i];
          return commonAncestor;
        }
      }
    }

    return commonAncestor;
  }
}

module.exports = Vampire;

