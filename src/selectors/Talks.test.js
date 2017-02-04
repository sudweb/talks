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

  it('parseTalks should return talks array', () => {
    const talksMock = [
      [
        "Title",
        "Description",
        "Note"
      ],
      [
        "Test 1",
        "voici mon test",
        "2.00"
      ],
      [
        "Test 2",
        "bonjour",
        "-8.00"
      ]
    ];
    const expectedResponse = [
      { title: 'Test 1', id: 1, description: 'voici mon test', note: 2 },
      { title: 'Test 2', id: 2, description: 'bonjour', note: -8 }
    ];
    expect(parseTalks(talksMock)).toEqual(expectedResponse);
  });

  it('isPK should return true if format is PK', () => {
    expect(isPK('test')).toBeFalsy();
    expect(isPK('Pecha Kucha : 20 images x 20 secondes')).toBeTruthy();
  });

  it('isLT should return true if format is LT', () => {
    expect(isLT('test')).toBeFalsy();
    expect(isLT('Lightning Talk : 5 minutes')).toBeTruthy();
  });

  describe('getFilteredList', () => {
    it('should return all talks if no filter and no sortBy', () => {
      const talks = [
        { title: 'Test 1', if: 1, note: 2, date: '2017-01-01' },
        { title: 'Test 2', id: 2, note: -8, date: '2017-02-01' }
      ];
      expect(getFilteredList(talks)).toEqual([
        { title: 'Test 1', if: 1, note: 2, date: '2017-01-01' },
        { title: 'Test 2', id: 2, note: -8, date: '2017-02-01' }
      ]);
    });

    it('should return only first talk if filter is LT', () => {
      const talks = [
        { title: 'Test 1', if: 1, formats: 'Lightning Talk : 5 minutes', note: 2, date: '2017-01-01' },
        { title: 'Test 2', id: 2, formats: 'Pecha Kucha : 20 images x 20 secondes', note: 8, date: '2017-02-01' }
      ];
      expect(getFilteredList(talks, 'LT')).toEqual([
        { title: 'Test 1', if: 1, formats: 'Lightning Talk : 5 minutes', note: 2, date: '2017-01-01' }
      ]);
    });

    it('should return only second talk if filter is PK', () => {
      const talks = [
        { title: 'Test 1', if: 1, formats: 'Lightning Talk : 5 minutes', note: 2, date: '2017-01-01' },
        { title: 'Test 2', id: 2, formats: 'Pecha Kucha : 20 images x 20 secondes', note: 8, date: '2017-02-01' }
      ];
      expect(getFilteredList(talks, 'PK')).toEqual([
        { title: 'Test 2', id: 2, formats: 'Pecha Kucha : 20 images x 20 secondes', note: 8, date: '2017-02-01' }
      ]);
    });

    it('should return talk list sorted by note', () => {
      const talks = [
        { title: 'Test 1', if: 1, note: 2, date: '2017-01-01' },
        { title: 'Test 2', id: 2, note: 8, date: '2017-02-01' }
      ];
      expect(getFilteredList(talks, null, 'note')).toEqual([
        { title: 'Test 2', id: 2, note: 8, date: '2017-02-01' },
        { title: 'Test 1', if: 1, note: 2, date: '2017-01-01' },
      ]);
    });
  });

  describe('countTalksByFormats', () => {
    it('should return 0 for each formats if no talk', () => {
      const talks = [];
      expect(countTalksByFormats(talks)).toEqual({"LT": 0, "PK": 0, "all": 0})
    });

    it('should return talks lengh for each format', () => {
      const talks = [
        { title: 'Test 1', if: 1, formats: 'Lightning Talk : 5 minutes', note: 2, date: '2017-01-01' },
        { title: 'Test 2', id: 2, formats: 'Pecha Kucha : 20 images x 20 secondes', note: 8, date: '2017-02-01' }
      ];
      expect(countTalksByFormats(talks)).toEqual({
        all: 2, 
        PK: 1, 
        LT: 1
      })
    });
  });
})
