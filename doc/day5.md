# Day 5 notes - GitHub stargazing with spies and stubs

## What you'll do

Today you're going to look at calling the GitHub API using a HTTP request

## Install request-promise

You're going to make a HTTP request to the GitHub API using `request-promise`. This is a simple HTTP request client with Promise support. Install `request-promise` (and also `request` as it is a peer dependency) using `npm`:

```shell
npm install --save request request-promise
```

## Spies vs Stubs

Spies and stubs are sometimes confused but they serve two different purposes. **Spies** live up to their name and the spy on functions but don't alter the function's behaviour at all. We can use them to tell us that something has been called and how. **Stubs** are similar to spies, and they support the sinon spy API, but they also alter the behaviour of the function. This means you can define how the function will respond. This allows you to better test the happy and unhappy paths in your code.

### Create the code

Create a new module in the `src` directory called `day5.js` and corresponding test file in the `test` directory called `day5.test.js`:

```javascript
import requestPromise from 'request-promise';

function day5(owner, repository) {
});

export default day5;
```

```javascript
import {expect} from 'chai';
import sinon from 'sinon';
import requestPromise from 'request-promise';
import day5 from '../src/day5';

describe('day5 tests', () => {
});
```

### Spy on the GitHub API

Let's spy on the GitHub API request and confirm that it's called once. Set up the spy to inspect `requestPromise.get` for the GET request we'll make to the API. You can then write a test that confirms that the spy was called only once.

```javascript
let spyRequestGet;

beforeEach(() => {
    spyRequestGet = sinon.spy(requestPromise, 'get');
});

afterEach(() => {
    spyRequestGet.restore();
});

it('should call the expected endpoint once', () => {
    return day5()
        .then(() => {
            expect(spyRequestGet.callCount).to.equal(1);
        });
});
```

And write the code to pass this:

```javascript
function day5(owner, repository) {
    const gitHubRepoGetUrl =
        `https://api.github.com/repos/${owner}/${repository}`;

    const requestOptions = {
        uri: gitHubRepoGetUrl,
        resolveWithFullResponse: true,
        json: true,
        headers: {
            'User-Agent': 'JavaScript Testing Beginners Course'
        }
    };

    // We need a few extra parameters
    return requestPromise.get(requestOptions);
}
```

### Confirm the correct API endpoint

Let's write a test to confirm that the correct endpoint has been called.

```javascript
it('should call the expected endpoint url', () => {
    const expectedGitHubUrl = 'https://api.github.com/repos/expressjs/express';
    return day5('expressjs', 'express')
        .then((data) => {
            expect(spyRequestGet.getCall(0).args[0].uri)
                .to.equal(expectedGitHubUrl);
        });
});
```