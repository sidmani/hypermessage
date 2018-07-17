// hypermessage
// Copyright 2018 Sid Mani and released under the MIT license

// Build an RFC-7230 compliant plaintext HTTP message
module.exports.build = function(r) {
  let str = `${r.method} ${r.endpoint} HTTP/${r.httpVersion || '1.1'}\n`;
  if (r.headers) {
    Object.keys(r.headers).forEach((key) => {
      str += `${key}: ${r.headers[key]}\n`;
    });
  }
  str += '\n';
  str += r.body || '';
  return str;
};
