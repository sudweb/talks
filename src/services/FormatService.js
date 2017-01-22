export const isPK = format => {
  return format === 'Pecha Kucha : 20 images x 20 secondes';
};

export const isLT = format => {
  return format === 'Lightning Talk : 5 minutes';
};

export const countTalksByFormats = talks => {
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