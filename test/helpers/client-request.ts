import * as https from "https";
import * as http from "http";

interface RequestResponse {
    data: string;
    status: number;
}

export const httpRequest = (url: string): Promise<RequestResponse> => {
    return new Promise((resolve, reject) => {
        const { hostname, pathname, port, protocol } = new URL(url);

        const requestOptions = {
            hostname,
            path: pathname,
            port,
            method: "GET",
        };

        const httpRequestLib = protocol === "https:" ? https : http;
        const httpRequest = httpRequestLib.request(requestOptions, (res) => {
            let rawData = "";
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                rawData += chunk;
            });
            res.on("end", () => {
                resolve({ data: rawData, status: res.statusCode ?? 500 });
            });
        });

        httpRequest
            .on("timeout", () => httpRequest.destroy())
            .on("error", (e) => reject(e))
            .end();
    });
};