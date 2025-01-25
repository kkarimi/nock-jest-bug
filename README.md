# bug in nock beta

This is a repo to reproduce a bug in nock beta (14.0.0-beta.19) where an interceptor is failing to intercept.

To reproduce:

```
npm install
USE_FETCH=1 npm run test
USE_FETCH=0 npm run test
```

You should see one of the two tests fail for the `USE_FETCH=0` (aka Client Request) scenario (whichever test runs second will fail):
> NetConnectNotAllowedError: Nock: Disallowed net connect for "example.com:80/foo"

If you install the older nock beta you can see it works as expected (both tests pass for fetch and client-request):

```
npm install --save-dev nock@14.0.0-beta.7
```

This was tested on macos against node v20.18.0 and v22.11.0.

## notes

For context:

https://github.com/mswjs/interceptors/pull/697
https://github.com/nock/nock/pull/2824
https://github.com/nock/nock/issues/2802

General notes:

1. If you remove `nock.cleanAll()` the issues goes away.
1. This issue isn't present in v13.x versions of nock using client request.
1. This issue isn't present in `nock@14.0.0-beta.7` (pre MSW interceptors) for either fetch or client request.
1. not sure why, but each test file includes a fresh nock module
   1. nock is activated when the module in init'd (via back.js which default to `dryRun` setup, which run `nock.activate()`)
   1. this constructs the MSW interceptors multiple times (MSW also get fresh modules)
   1. intercepted MSW requests go to the first nock module, rather than the one on which the nock interceptors were set up on.



