# Day 4 notes - Time travel with fake timers

### Copy day 3 source code and first test

```javascript
function timeout(callback) {
    setTimeout(() => callback('hello'), 1000);
}

export {
    timeout
};
```

```javascript
import {expect} from 'chai';
import {timeout} from '../src/day4';

describe('day 4 tests', () => {
    it('should return expected value from callback', (done) => {
        const clock = sinon.useFakeTimers();

        timeout((returnedData) => {
            expect(returnedData).to.equal('hello');
            done();
        });

        clock.tick(1000);
    });
});
```

* Now runs really quick ~100ms

## New test with dates

```javascript
function dateDescriber(date) {
    const dateNow = Date.now();
    console.log(dateNow);
}
```

* Runs slowly
* Want unit tests run quickly - if we have hundreds of tests then take a long time
* So we can cheat and time travel
* Use sinon

## Install sinon

```shell
npm install --save-dev sinon
```

## Add timeout test

```javascript
it('should return expected value from callback', () => {
    day3((returnedData) => {
        expect(returnedData).to.equal('hello');
    });
});
```
* Run the tests - they appear to pass
* We've got no code yet!
* Let's write the code

```javascript
function day3(callback) {
    setTimeout(() => {
        callback('hello');
    }, 1000);
}
```

* Run the tests - they still appear to pass
* It thinks test is synchronous
* Need to tell Mocha it's an asynchronous
* Add done to callback function and call it when we've done

```javascript
it('should return expected value from callback', (done) => {
    day3((returnedData) => {
        expect(returnedData).to.equal('hello');
        done();
    });
});
```

## Promises

```javascript
it('should return expected value from promise', () => {
    day3()
        .then((returnedData) => {
            expect(returnedData).to.equal('hello');
        });
});
```

```javascript
function day3(callback) {
    if (callback) {
        setTimeout(() => {
            callback('hello');
        }, 1000);
    } else {
        return Promise.resolve('hello');
    }
}
```

* Test to return a promise which does the same
* Gotcha : Not using done - tests pass
* Use `done` again

```javascript
it('should return expected value from promise', (done) => {
    day3()
        .then((returnedData) => {
            expect(returnedData).to.equal('hello');
            done();
        });
});
```

* Better way - return a promise

```javascript
it('should return expected value from promise', () => {
    return day3()
        .then((returnedData) => {
            expect(returnedData).to.equal('hello');
        });
});
```
