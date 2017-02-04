import {
    handleError, HANDLE_ERROR,
    filterTalks, FILTER_TALKS
} from './App'

describe('App actions', () => {
    describe('handleError', () => {
        it('should create action HANDLE_ERROR with error message', () => {
            expect(handleError('test')).toEqual({
                type: HANDLE_ERROR,
                message: 'test'
            });
        });
    });

    describe('filterTalks', () => {
        it('should create action FILTER_TALKS with filter', () => {
            expect(filterTalks('test')).toEqual({
                type: FILTER_TALKS,
                filter: 'test'
            });
        });
    });
});