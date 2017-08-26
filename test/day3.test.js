import {expect} from 'chai';
import day3 from '../src/day3';

describe('day 3 tests', () => {
    it('should return expected value from callback', (done) => {
        day3((returnedData) => {
            expect(returnedData).to.equal('hello');
            done();
        });
    });

    it('should return expected value from promise with done', (done) => {
        day3()
            .then((returnedData) => {
                expect(returnedData).to.equal('hello');
                done();
            });
    });

    it('should return expected value from promise', () => {
        return day3()
            .then((returnedData) => {
                expect(returnedData).to.equal('hello');
            });
    });
});
