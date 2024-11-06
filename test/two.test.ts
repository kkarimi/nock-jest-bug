import nock, {disableNetConnect} from 'nock';
import {httpRequest} from "../request";

disableNetConnect();
afterAll(() => {
  nock.cleanAll();
})

test('two', async () => {
  const scope = nock('http://example.com')
    .get('/foo')
    .reply(200, { keys: [] });

  const res = await httpRequest('http://example.com/foo');
  expect(res).toBeDefined();
  scope.done();
});
