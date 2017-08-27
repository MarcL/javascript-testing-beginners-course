# Day 4 notes - Time travel with fake timers

## Speed up yesterday's asynchronous tests

### Copy day 3 source code and first test

Make a copy of the code from day3 but we only testing our slow `setTimeout` code and not the promise. **Note:** don't export as a default ES6 module as we're going to export a couple of functions

```javascript
function timeout(callback) {
    setTimeout(() => callback('hello'), 1000);
}

export {
    timeout
};
```

Impor the function in your test code.

```javascript
import {expect} from 'chai';
import {timeout} from '../src/day4';

describe('day 4 tests', () => {
    it('should return expected value from callback', (done) => {
        timeout((returnedData) => {
            expect(returnedData).to.equal('hello');
            done();
        });
    });
});
```

If you run the code you'll see that it still runs in just over 1000ms.

```shell
mocha --require babel-register test/day4.test.js
```

You're going to install `sinon` which is a library of test double functions. It has a special fake timer implementation which makes asynchronous time-related functions become syncronous and controllable.

```shell
npm install --save-dev sinon
```

You can now update the test to use the fake timer.

```javascript
describe('timeout tests', () => {
    let clock;
    beforeEach(() => {
        // Set the fake timer before all of our tests
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        // Restore back to async time/date functions after each test
        clock.restore();
    });

    it('should return expected value from callback', (done) => {
        timeout((returnedData) => {
            expect(returnedData).to.equal('hello');
            done();
        });

        // You need to tick the clock by the amount you need.
        // Here it's 1000ms or 1 second to allow the timeout callback to trigger
        clock.tick(1000);
    });
});
```

Try the test again and you'll see that it runs in about 150ms! A great improvement and the sort of speed you want from unit tests.

## DateDescriber - faking dates

Let's add a new function which will take a date and tell us whether the year is in the future, the past or the current year.

```javascript
// Under timeout code

function dateDescriber(otherDate) {
}

export {
    timeout,
    dateDescriber
};
```

Create a new test `describe` block and add a test to check that the date is in the future.

```javascript
describe('dateDescriber tests', () => {
    it('should correctly describe a future year', () => {
        const description = dateDescriber(
            new Date(2018, 1, 1)
        );

        expect(description).to.equal('in the future');
    });

    it('should correctly describe a past year', () => {
        const description = dateDescriber(
            new Date(2016, 1, 1)
        );

        expect(description).to.equal('in the past');
    });

    it('should correctly describe current year', () => {
        const description = dateDescriber(
            new Date(2017, 1, 1)
        );

        expect(description).to.equal('this year');
    });
});
```

If you run the tests, they will fail so let's add the code to make them all pass:

```javascript
function dateDescriber(otherDate) {
    const dateNow = new Date();

    const otherYear = otherDate.getFullYear();
    const currentYear = dateNow.getFullYear();

    const yearDifference = otherYear - currentYear;

    if (yearDifference > 0) {
        return 'in the future';
    } else if (yearDifference < 0) {
        return 'in the past';
    } else {
        return 'this year';
    }
}
```

Now all of the tests will pass but we have a major problem. These tests will run correctly but what happens if it's 2018? They'll start to fail. What should we do? Let's use `sinon.useFakeTimer` to set the initial date to what we would like it to be. Add a `beforeEach` and `afterEach` function to the `describe` block and let's set the initial date to January 1 2017.

```javascript
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

    // Other code snipped
```

Great! The tests now pass and we've set the initial date. However, notice that we're still hardcoding dates into our tests. If we change `currentYear` to 2018, our future test will still fail. It would be better to make them relative to our `currentYear` variable. Let's tidy up our tests so we're know they're always correct.

```javascript
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
```

Now you should be happy with your tests. They all pass and the dates won't alter if you run them on a different environment or in the future. Great work!