import { test, expect, beforeAll } from "vitest";
import nock from "nock";
import { doReq } from "./helpers/do-req";

beforeAll(() => {
    nock.disableNetConnect();
});

test("two", async () => {
    const scope = nock("http://example.com").get("/foo").reply(200, "two");

    const { data, status } = await doReq("http://example.com/foo");
    expect(data).toBe("two");
    expect(status).toBe(200);
    scope.done();
});