import slug from 'slug';

export const getPrettyColumnNames = str => {
  return slug(str, {
    lower: true,
    replacement: '_'
  });
}

export const parseTalks = talks => {
  let talksArray = [];
  for (let i = 0; i < talks.length; i++) {
    var row = talks[i];
    let talk = {};
    if (i !== 0) {
      talks[0].map((field, j) => {
          return talk[getPrettyColumnNames(field)] = row[j];
      });
      talk.id = i;
      talksArray.push(talk);
    }    
  }
  return talksArray;
}

export const isPK = format => {
  return format === 'Pecha Kucha : 20 images x 20 secondes';
};

export const isLT = format => {
  return format === 'Lightning Talk : 5 minutes';
};

export const getFilteredList = (talks, filter) => {
  if (filter === 'PK') {
    return talks.filter((talk, id) => {
      return isPK(talk.formats);
    });
  }

  if (filter === 'LT') {
    return talks.filter(talk => {
      return isLT(talk.formats);
    });
  }

  return talks;
}

export const countTalksByFormats = talks => {
  if (talks === null) {
    return null
  }
  let all = talks.length,
    PK = 0,
    LT = 0;
  talks.map(talk => {
    if (isPK(talk.formats)) {
      PK++;
    }
    if (isLT(talk.formats)) {
      LT++;
    }
    return false;
  });

  return {
    all, PK, LT
  }
}