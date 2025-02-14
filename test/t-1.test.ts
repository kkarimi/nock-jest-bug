import { test, expect, beforeAll } from "vitest";
import nock from "nock";
import { doReq } from "./helpers/do-req";

beforeAll(() => {
    nock.disableNetConnect();
});

test("one", async () => {
    const scope = nock("http://example.com").get("/foo").reply(200, "one");

    const { data, status } = await doReq("http://example.com/foo");
    expect(data).toBe("one");
    expect(status).toBe(200);
    scope.done();
    nock.cleanAll();
});