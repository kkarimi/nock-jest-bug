const nock = require('nock');
const {doReq} = require("./helpers/do-req");
nock.disableNetConnect();

test('two', async () => {
  const scope = nock('http://example.com')
    .get('/foo')
    .reply(200, 'foo');

  const {data, status} = await doReq('http://example.com/foo');
  expect(data).toBe('foo');
  expect(status).toBe(200);
  scope.done();
  nock.cleanAll();
});
