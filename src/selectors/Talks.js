/* eslint-disable */

import _ from "lodash";
import slug from "slug";

export const getPrettyColumnNames = str => {
  return slug(str, {
    lower: true,
    replacement: "_"
  });
};

export const parseTalks = talks => {
  let talksArray = [];
  for (let i = 0; i < talks.length; i++) {
    var row = talks[i];
    let talk = {};

    if (i !== 0) {
      talks[0].map((field, j) => {
        let content = row[j];
        let column = getPrettyColumnNames(field);

        if (content !== undefined) {
          if (column === "note") {
            return talk[column] = Number(content);
          }
          return talk[column] = content;
        }
      });
      talk.id = i;

      if (talk.titre_de_ta_presentation !== "") {
        talksArray.push(talk);
      }
    }
  }
  
  return talksArray;
};

export const isPK = format => {
  return format === "Pecha Kucha : 20 images x 20 secondes";
};

export const isLT = format => {
  return format === "Lightning Talk : 5 minutes";
};

export const getFilteredList = state => {
  const { talks, notes, filter, sortBy } = state;
  let sortedTalks = notes !== null
    ? _.map(talks, talk => {
        talk.note = notes[talk.id - 1].total;
        return talk;
      })
    : talks;

  sortedTalks = _.sortBy(sortedTalks, sortBy);

  if (sortBy === "note") {
    sortedTalks.reverse();
  }

  if (filter === "PK") {
    return sortedTalks.filter(talk => {
      return isPK(talk.formats);
    });
  }

  if (filter === "LT") {
    return sortedTalks.filter(talk => {
      return isLT(talk.formats);
    });
  }
  return sortedTalks;
};

export const countTalksByFormats = talks => {
  if (talks === null) {
    return null;
  }
  let all = talks.length, PK = 0, LT = 0;
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
    all,
    PK,
    LT
  };
};
