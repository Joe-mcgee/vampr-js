function climb(vampire, rank) {
      if (vampire.creator == null) {
        return rank
      } else {
        rank += 1
        return climb(vampire.creator, rank)
      }
    }

function ancestorMatch(older, younger) {
  const baseYounger = younger;
  console.log(0, baseYounger.name)
  return ancestorMatchLogic(older, younger, baseYounger)

}

function ancestorMatchLogic(older, younger, base) {
  if (older == younger) {
    console.log(1, older.name)
    return older
  } else {
    if (younger.creator == null) {
      console.log(2, older.name, younger.name, base.name)
      return ancestorMatchLogic(older.creator, base, base);
    }
    else {
      console.log(3, older.name, younger.name, base.name)
      return ancestorMatchLogic(older, younger.creator, base)
    }
  }
}

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
    return climb(this, 0)
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let thisVamp = climb(this, 0);
    let otherVamp = climb(vampire, 0);
    if (thisVamp < otherVamp) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisIsYounger = this.isMoreSeniorThan(vampire) ? false: true;
    if (thisIsYounger) {
      return ancestorMatch(vampire, this)
    } else {
      return ancestorMatch(this, vampire)
    }

  }

}


module.exports = Vampire;

