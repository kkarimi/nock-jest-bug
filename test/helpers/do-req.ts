import { httpRequest } from "./client-request.js";

interface RequestResponse {
    data: string;
    status: number;
}

export async function doReq(
    url = "http://example.com/foo",
    useFetch = process.env.USE_FETCH === "1"
): Promise<RequestResponse> {
    console.log({ useFetch }, "making req");
    if (useFetch) {
        const res = await fetch(url);
        return { status: res.status, data: await res.text() };
    } else {
        return httpRequest(url);
    }
}