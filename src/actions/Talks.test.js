import {
    fetchedTalks, FETCHED_TALKS,
    selectTalk, SELECT_TALK,
    sortTalks, SORT_TALK
} from './Talks';

describe('App actions', () => {
    describe('fetchedTalks', () => {
        it('should create action FETCHED_TALKS with talks', () => {
            expect(fetchedTalks('test')).toEqual({
                type: FETCHED_TALKS,
                talks: 'test'
            });
        });
    });

    describe('selectTalk', () => {
        it('should create action SELECT_TALK with talk id', () => {
            expect(selectTalk(1)).toEqual({
                type: SELECT_TALK,
                id: 0
            });
        });
    });

    describe('sortTalks', () => {
        it('should create action SORT_TALK with sort value', () => {
            expect(sortTalks('test')).toEqual({
                type: SORT_TALK,
                value: 'test'
            });
        });
    });
});