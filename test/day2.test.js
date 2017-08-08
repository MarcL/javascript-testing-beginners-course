import {expect} from 'chai';
import day2 from '../src/day2';

describe('day2 tests', () => {
    it('should return undefined when no parameters are passed', () => {
        expect(day2()).to.be.undefined;
    });

    it('should return a string when a string is passed', () => {
        expect(day2('a string')).to.be.a('string');
    });

    it('should return a number when a number is passed', () => {
        expect(day2(10)).to.be.a('Number');
    });

    it('should not be a string when a number is passed', () => {
        expect(day2(10)).to.not.be.a('string');
    });

    it('should equal the string passed', () => {
        expect(day2('same string')).to.equal('same string');
    });

    it('should deep equal the object passed', () => {
        const givenObject = {
            hello: 'world'
        };

        expect(day2(givenObject)).to.deep.equal(givenObject);
    });

    it('should contain part of the string passed', () => {
        const givenString = 'hello world';

        expect(day2(givenString)).to.contain('world');
    });

    it('should throw an error when "error" is passed', () => {
        function wrappedFunction() {
            day2('error');
        }

        expect(wrappedFunction).to.throw('Cannot pass error');
    });
});