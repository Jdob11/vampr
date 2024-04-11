class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /**
 * Adds a vampire as an offspring of this vampire.
 * @param {Vampire} vampire - The vampire to be added as an offspring.
 * @returns {void} - This function does not return anything.
 */
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  /**
 * Calculates the number of offspring of the vampire.
 * @params None
 * @returns {number} The number of offspring of the vampire.
 */
  get numberOfOffspring() {
    return this.offspring.length;
  }

  /**
 * Calculates the number of vampires from the original vampire in the ancestry tree.
 * @params None
 * @returns {number} The number of vampires from the original vampire in the ancestry tree.
 */
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires ++;
    }
    return numberOfVampires;
  }

  /**
 * Determines if the current vampire is more senior than another vampire.
 * @param {Vampire} vampire - The vampire to compare against.
 * @returns {boolean} - True if the current vampire is more senior than the other vampire, false otherwise.
 */
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }
  
  /**
 * Finds the closest common ancestor between this vampire and another vampire.
 * @param {Vampire} vampire - The other vampire to find the closest common ancestor with.
 * @returns {Vampire|null} The closest common ancestor vampire, or null if none is found.
 */
  closestCommonAncestor(vampire) {

    const path1 = [this];
    const path2 = [vampire];
    // Map ancestry of this vampire and save in array
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      path1.push(currentVampire);
    }
    // Map ancestry of other vampire and save in array
    currentVampire = vampire;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      path2.push(currentVampire);
    }
    // Iterate over both for first common ancestor
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

  /**
 * Finds a vampire with a given name via depth first traversal.
 * @param {string} name - The name of the vampire to search for.
 * @returns {object|null} - The vampire object with the given name, or null if not found.
 */
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const vampire of this.offspring) {
      const foundVampire = vampire.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      }
    }
    return null;
  }

  /**
 * Calculates the total number of descendants for a given vampire.
 * @params None
 * @returns {number} - The total number of descendants.
 */
  get totalDescendants() {
    let totalDescendants = 0;
    for (const vampire of this.offspring) {
      totalDescendants += vampire.totalDescendants + 1;
    }
    return totalDescendants;
  }

  /**
 * Retrieves all vampires born after the year 1980, including offspring recursively.
 * @params None
 * @returns {Array} - An array containing all vampires born after the year 1980.
 */
  get allMillennialVampires() {
    let millennialVamps = [];
    if (this.yearConverted > 1980) {
      millennialVamps.push(this);
    }
    for (const vampire of this.offspring) {
      const vampsAfter1980 = vampire.allMillennialVampires;
      millennialVamps = millennialVamps.concat(vampsAfter1980);
    }
    
    return millennialVamps;
  }
}

module.exports = Vampire;

