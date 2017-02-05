/* eslint-disable */

import _ from 'lodash';

export const parseNotes = notes => {
  let notesArray = [];

  for (let i = 0; i < notes.length; i++) {
    var row = notes[i];
    let talk = {};

    if (i !== 0) {
      notes[0].map((name, j) => {
        if (j !== 0) {
          return talk[name] = row[j];
        }
        return false;
      });
      notesArray.push(talk);
    }
  }
  return notesArray;
}

export const getOwnName = (notes, profileName) => {
  let ownName = null;

  if (!notes) {
    return ownName;
  }

  Object.keys(notes).filter(name => {
    if (profileName.includes(name)) {
      ownName = name;
    }
    return false;
  });

  return ownName;
}

export const getOwnNote = (notes, ownName) => {
  if (!notes[ownName]) {
    return 0;
  }
  return Math.round(notes[ownName])
}

export const getOthersNote = (notes, ownName) => {
  let othertsNotes = [];
  Object.keys(notes).map(name => {
    if (name === ownName) {
      return false;
    }
    if (!notes[name]) {
      othertsNotes.push([name, 0]);
      return false;
    }
    else {
      othertsNotes.push([name, Math.round(notes[name])]);
      return false;
    }
  })
  return othertsNotes;
}

export const findColumnLetter = (name, nameArray) => {
  const i = nameArray.indexOf(name);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTWXYZ';
  return alphabet[i+1]
}
