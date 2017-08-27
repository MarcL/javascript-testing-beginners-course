import {expect} from 'chai';
import sinon from 'sinon';
import requestPromise from 'request-promise';
import {StatusCodeError} from 'request-promise/errors';
import day5 from '../src/day5';

describe('day5 tests', () => {
    describe('GitHub API - not unit tests - spy on API', () => {
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

        it('should call the expected endpoint url', () => {
            const expectedGitHubUrl = 'https://api.github.com/repos/expressjs/express';
            return day5('expressjs', 'express')
                .then((data) => {
                    expect(spyRequestGet.getCall(0).args[0].uri)
                        .to.equal(expectedGitHubUrl);
                });
        });

    });

    describe('GitHub API - unit tests - stub API', () => {
        let stubRequestGet;

        beforeEach(() => {
            stubRequestGet = sinon.stub(requestPromise, 'get');
            stubRequestGet.resolves({});
        });

        afterEach(() => {
            stubRequestGet.restore();
        });

        it('should call the expected endpoint once', () => {
            return day5()
                .then(() => {
                    expect(stubRequestGet.callCount).to.equal(1);
                });
        });

        it('should call the expected endpoint url', () => {
            const expectedGitHubUrl = 'https://api.github.com/repos/expressjs/express';
            return day5('expressjs', 'express')
                .then(() => {
                    expect(stubRequestGet.getCall(0).args[0].uri)
                        .to.equal(expectedGitHubUrl);
                });
        });

        it('should return expected star count', () => {
            const givenApiResponse = {
                'stargazers_count': 100
            };
            stubRequestGet.resolves(givenApiResponse);

            return day5('expressjs', 'express')
                .then((data) => {
                    expect(data.stars)
                        .to.equal(givenApiResponse.stargazers_count);
                });
        });

        it('should return expected forks count', () => {
            const givenApiResponse = {
                'forks_count': 20
            };
            stubRequestGet.resolves(givenApiResponse);

            return day5('expressjs', 'express')
                .then((data) => {
                    expect(data.forks)
                        .to.equal(givenApiResponse.forks_count);
                });
        });

        it('should return expected watch count', () => {
            const givenApiResponse = {
                'watchers_count': 20
            };
            stubRequestGet.resolves(givenApiResponse);

            return day5('expressjs', 'express')
                .then((data) => {
                    expect(data.watchers)
                        .to.equal(givenApiResponse.watchers_count);
                });
        });

        it('should return expected error message when API is rate limited', () => {
            const givenApiResponse = {
                'message': 'API rate limit exceeded for xxx.xxx.xxx.xxx. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)',
                'documentation_url': 'https://developer.github.com/v3/#rate-limiting'
            };
            stubRequestGet.rejects(new StatusCodeError(403, givenApiResponse));

            return day5('expressjs', 'express')
                .then((data) => {
                    expect(data.success).to.be.false;
                    expect(data.errorCode).to.equal(403);
                    expect(data.error)
                        .to.deep.equal('API request is rate limited');
                });
        });
    });
});