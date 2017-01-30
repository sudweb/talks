import {
    parseNotes,
    getOwnName,
    getOwnNote,
    getOthersNote,
    findColumnLetter,
    getAverage
} from './Notes';


describe('Notes selectors', () => {
    it('parseNotes should return notes array', () => {
        const mockResponse = [
            ["Sujet", "A", "B", "C" ],
            ["Test 1", "1", "0", "0"],
            ["Test 2", "0", "0", "0"]
        ]
        expect(parseNotes(mockResponse)).toEqual([
            { "A": "1", "B": "0" , "C": "0" },
            { "A": "0", "B": "0", "C": "0" }
        ]);
    });

    it('getOwnName should return profile name', () => {
        const notesMock = { "A": "1", "B": "0" , "C": "0" };
        expect(getOwnName(notesMock, 'CD')).toEqual('C');
    });

    it('getOwnNote should return profile note', () => {
        const notesMock = { "A": "1", "B": "0" , "C": "0" };
        expect(getOwnNote(notesMock, 'C')).toEqual(0);
    });

    it('getOthersNote should return others notes', () => {
        const notesMock = { "A": "1", "B": "0" , "C": "0" };
        const expected = [ ["A", 1], ["B", 0] ];
        expect(getOthersNote(notesMock, 'C')).toEqual(expected);
    });

    it('findColumnLetter should letter associated to name', () => {
        const nameArray = ['toto', 'mimi', 'lulu']
        expect(findColumnLetter('lulu', nameArray)).toEqual('D');
    });

    it('getAverage should return averate of notes object', () => {
        const notesMock = { "A": "1", "B": "2" , "C": "3" };
        expect(getAverage(notesMock)).toEqual(2);
    });
})
