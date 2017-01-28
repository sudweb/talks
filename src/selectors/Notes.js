import _ from 'lodash';

export const parseNotes = notes => {
  let notesArray = [];

  for (let i = 0; i < notes.length; i++) {
    var row = notes[i];
    let talk = {};

    if (i !== 0) {
      notes[0].map((field, j) => {
        if (j !== 0) {
          return talk[field] = row[j];
        }
        return false;
      });
      notesArray.push(talk);
    } 
  }

  return notesArray;
}

export const getMyData = (notes, profileName) => {
  let myNote = null;
  let myName = null;
  Object.keys(notes).filter(name => {
    if (profileName.includes(name)) {
      myNote = notes[name];
      myName = name;
    }
    return false;
  });

  return {
    note: myNote,
    name: myName
  }
}

export const findColumnLetter = (name, nameArray) => {
  const i = nameArray.indexOf(name);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTWXYZ';
  return alphabet[i+1]
}

export const getAverage = notes => {
  const notesNumbers = _.values(notes).map(note => parseInt(note, 10));
  return _.sum(notesNumbers) / notesNumbers.length;
}