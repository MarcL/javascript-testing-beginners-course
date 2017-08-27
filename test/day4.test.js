import sinon from 'sinon';
import {expect} from 'chai';
import {timeout, dateDescriber} from '../src/day4';

describe('day 4 tests', () => {
    describe('timeout tests', () => {
        let clock;
        beforeEach(() => {
            clock = sinon.useFakeTimers();
        });

        afterEach(() => {
            clock.restore();
        });

        it('should return expected value from callback', (done) => {

            timeout((returnedData) => {
                expect(returnedData).to.equal('hello');
                done();
            });

            clock.tick(1000);
        });
    });

    describe('dateDescriber tests', () => {
        let clock;
        const currentYear = 2017;

        beforeEach(() => {
            const now = new Date(currentYear, 1, 1);
            clock = sinon.useFakeTimers(now);
        });

        afterEach(() => {
            clock.restore();
        });

        it('should correctly describe a future year', () => {
            const description = dateDescriber(
                new Date(currentYear + 1, 1, 1)
            );

            expect(description).to.equal('in the future');
        });

        it('should correctly describe a past year', () => {
            const description = dateDescriber(
                new Date(currentYear - 1, 1, 1)
            );

            expect(description).to.equal('in the past');
        });

        it('should correctly describe current year', () => {
            const description = dateDescriber(
                new Date(currentYear, 1, 1)
            );

            expect(description).to.equal('this year');
        });
    });
});
