import {
  getPrettyColumnNames,
  parseTalks,
  isPK,
  isLT,
  getFilteredList,
  countTalksByFormats
} from './Talks';

describe('Talks selectors', () => {
  it('getPrettyColumnNames should return a string without spaces and special chars', () => {
    expect(getPrettyColumnNames('Ceci est un test')).toEqual('ceci_est_un_test');
  });

  // it('parseTalks should return talks array', () => {
  //   const talksMock = [
  //     ['Title', 'Description', 'Note'],
  //     ['Test 1', 'voici mon test', '2.00']
  //     ['Test 2', 'bonjour', '3.00']
  //   ];
  //   const expectedResponse = [
  //     { title: 'Test 1', description: 'voici mon test', note : 2 },
  //     { title: 'Test 2', description: 'bonjour', note : 3 }
  //   ]
  //   expect(parseTalks(talksMock)).toEqual(expectedResponse);
  // });

  // it('getOwnNote should return profile note', () => {
  //     const notesMock = { "A": "1", "B": "0" , "C": "0" };
  //     expect(getOwnNote(notesMock, 'C')).toEqual(0);
  // });

  // it('getOthersNote should return others notes', () => {
  //     const notesMock = { "A": "1", "B": "0" , "C": "0" };
  //     const expected = [ ["A", 1], ["B", 0] ];
  //     expect(getOthersNote(notesMock, 'C')).toEqual(expected);
  // });

  // it('findColumnLetter should letter associated to name', () => {
  //     const nameArray = ['toto', 'mimi', 'lulu']
  //     expect(findColumnLetter('lulu', nameArray)).toEqual('D');
  // });
})
