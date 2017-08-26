# Day 2 notes

## Create project directory

Get started by creating your test directory

```shell
mkdir javascript-testing-beginners-course
cd javascript-testing-beginners-course
```

## Create blank npm package file

Create a default `npm` package file using the `init` command and fill in some default values:

```shell
npm init -y
```

## Install packages we need for testing

You'll use [mocha](https://mochajs.org/) for the test runner but it doesn't come with an assertion library by default. Install [chai](http://chaijs.com/) for some expressive assertions which make your tests easy to read.

```shell
npm install --save-dev mocha chai
```

## Install babel for ES6 transpilation

I prefer to use ES6 syntax for my JavaScript. Install [babel](https://babeljs.io/) and some plugins to allow you to transpile to ES5 on the fly. You'll install:

* [babel-register](https://babeljs.io/docs/usage/babel-register/) - Automatically compile files on the fly by binding to Node require
* [babel-preset-env](https://github.com/babel/babel-preset-env) - Automatically determine babel plugins + polyfills needed

```shell
npm install --save-dev babel-register babel-preset-env
```

### Create a babel file for the preset

```shell
touch .babelrc
```

### Edit .babelrc

Add the followng JSON code to the `.babelrc` file to enable the default preset plugin:

```json
{
  "presets": ["env"]
}
```

### Create a src file and test file

* In your editor create a directory for source and test files

```shell
mkdir src
mkdir test
```

* Create a file called `day2.js` in the `src` directory.
* Export it as the default function

```javascript
function day2() {
}

export default day2;
```

* Create a file called `day2.test.js` in the `test` directory.

```javascript
import day2 from '../src/day2';

describe('day 2 tests', () => {
    it('', () => {
    });
});
```

* Going to use 2 main functions - describe and it
* Using BDD interface - also TDD style which uses suite and test
* Run the tests

```shell
mocha
```

* We're using ES6 so doesn't work.
* Need to tell mocha to run using the babel compiler

```shell
mocha --require babel-register
```

## First test

* TDD style - write tests first + write code to pass
* Check that undefined is returned if we pass no parameter


```javascript
    it('should return undefined if no parameter passed', () => {
        expect(day2()).to.be.undefined;
    });
```

* Run tests - don't have chai
* Import chai expect

```javascript
import {expect} from 'chai';
```

* Test now passes because JS returns undefined

## New tests

* Test types
* Test if it's a string

```javascript
        it('should return a string when a string is passed', () => {
            expect(day2('a string')).to.be.a('string');
        });
```

* Could just pass back 'some string'
* Passes 2nd test but first fails
* Just return 'data'

* Test for number
* Test for number not being a string

## Check for equals

* Check .to.equal
* Pass object - check .deep.equal

## Check for contains

* Check for part of a string

## Check for thrown errors

* Pass 'error' as the string we pass
* Throw an error
* Wrap function before we test it - will call the function and throw an error
* Use .to.throw

## Group tests using describes

*

