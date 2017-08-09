    import request from 'superagent';
    import sinon from 'sinon';
    import {expect} from 'chai';

    import moduleToTest from '../src/moduleToTest';

    describe('Testing moduleToTest', () => {

        // Spy on superagent
        // - this will actually GET the url
        // - you probably don't want this for a unit test
        // - could use this for an integration test
        describe('spy on superaget', () => {
            let spySuperagentGet;
            beforeEach(() => {
                spySuperagentGet = sinon.spy(request, 'get');
            });

            afterEach(() => {
                spySuperagentGet.restore();
            });

            it('spy on superagent', () =>{
                const givenUrl = 'https://www.google.com';

                return moduleToTest(givenUrl)
                    .then((data) => {
                        expect(spySuperagentGet.callCount).to.equal(1);
                        expect(data).to.not.be.empty;
                    });
            });
        })

        // Stub superagent
        // - this will stub the response from the GET
        // - you can define the happy and unhappy paths
        // - you want to use this for a unit test
        describe('stub superaget', () => {
            let stubSuperagentGet;
            const myFakeResponse = {
                hello: 'world'
            };

            beforeEach(() => {
                stubSuperagentGet = sinon.stub(request, 'get');
                stubSuperagentGet.resolves(JSON.stringify(myFakeResponse));
            });

            afterEach(() => {
                stubSuperagentGet.restore();
            });

            it('stubbing superagent', () =>{
                const givenUrl = 'https://www.google.com';

                return moduleToTest(givenUrl)
                    .then((data) => {
                        const jsonObject = JSON.parse(data);
                        expect(jsonObject).to.deep.equal(myFakeResponse);
                    });
            });
        })

    });