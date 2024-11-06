import https from "https";
import http from "http";

export const httpRequest = (url) => {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, port, protocol } = new URL(url);

    const requestOptions = {
      hostname,
      path: pathname,
      port,
      method: 'GET',
    };

    const httpRequestLib = protocol === 'https:' ? https : http;
    const httpRequest = httpRequestLib.request(requestOptions, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const errorMsg =
            // @ts-ignore
            (res.body && (res.body.message || res.body)) || res.statusMessage || `Http Error ${res.statusCode}`;
          reject({ errorMsg });
        } else {
          try {
            resolve(rawData && JSON.parse(rawData));
          } catch (error) {
            reject(error);
          }
        }
      });
    });

    httpRequest
      .on('timeout', () => httpRequest.destroy())
      .on('error', (e) => reject(e))
      .end();
  });
};
