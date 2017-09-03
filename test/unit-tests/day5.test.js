import request from 'request';
import day5 from '../../src/day5';

describe('day5 tests', () => {

    describe('using spies', () => {
        let spyRequestGet;

        beforeEach(() => {
            spyRequestGet = sinon.spy(request, 'get');
        });

        afterEach(() => {
            spyRequestGet.restore();
        });

        // Should make 1 GET request
        it('should make a get request once', (done) => {
            day5('expressjs', 'express', (data) => {
                expect(spyRequestGet.callCount)
                    .to.equal(1);

                done();
            })
        });

        // Should make request with expected URL
        it('should make request with expected URL', (done) => {
            day5('expressjs', 'express', (data) => {
                expect(spyRequestGet.getCall(0).args[0].uri)
                    .to.equal('https://api.github.com/repos/expressjs/express');
                done();
            })
        });
    });

    describe('using stubs', () => {
        let stubRequestGet;

        before(() => {
            // before the test suite
        });

        after(() => {
            // after the test suite
        });

        beforeEach(() => {
            // before each test
            stubRequestGet = sinon.stub(request, 'get');
        });

        afterEach(() => {
            // after each test
            stubRequestGet.restore();
        });

        // Should make 1 request
        it('should make one GET request', (done) => {
            stubRequestGet.yields(
                null,
                {statusCode: 200},
                {stargazers_count: 1000}
            );

            day5('expressjs', 'express', (data) => {
                expect(stubRequestGet.callCount)
                    .to.equal(1);

                done();
            });
        });

        // Should return correct data
        it('should return expected data', (done) => {
            const givenApiResponse = {
                'stargazers_count': 100
            };

            stubRequestGet.yields(
                null,
                {statusCode: 200},
                givenApiResponse
            );

            day5('expressjs', 'express', (data) => {
                expect(data).to.deep.equal({
                    stars: givenApiResponse.stargazers_count
                });
                done();
            })
        });

        // Should return correct data when error
        it('should return expected data when rate limited', (done) => {
            const givenApiResponse = {
                'message': 'API rate limit exceeded',
                'documentation_url': 'https://developer.github.com/v3/#rate-limiting'
            };

            stubRequestGet.yields(
                new Error('API rate limit exceeded'),
                {statusCode: 403},
                givenApiResponse
            );

            day5('expressjs', 'express', (data) => {
                expect(data).to.deep.equal({
                    success: false,
                    statusCode: 403,
                    error: 'API is rate limited - try again later'
                });
                done();
            });
        });
    });
});