# Day 3 notes - Asynchronous tests

## Mocha `done`

### Create new src file and test file

* In your editor create a directory for source and test
* Create src function and export it

```javascript
function day3() {
}

export default day3;
```

```javascript
import {expect} from 'chai';
import day3 from '../src/day3';

describe('day 3 tests', () => {
    it('', () => {
    });
});
```

* Run the tests

```shell
mocha --require babel-register
```

* Run only the day3 tests

```shell
mocha --require babel-register test/day3.test.js
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
