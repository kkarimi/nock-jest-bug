const {httpRequest} = require("./client-request");

module.exports.doReq = async function (url = 'http://example.com/foo', useFetch = process.env.USE_FETCH === '1') {
  console.log({useFetch}, 'making req')
  if (useFetch) {
    const res = await fetch(url)
    return {status: res.status, data: await res.text()};
  } else {
    return httpRequest(url);
  }
}
