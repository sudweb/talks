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
      });
      notesArray.push(talk);
    } 
  }

  return notesArray;
}