// hypermessage
// Copyright (c) 2018 Sid Mani

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Build an RFC-7230 compliant plaintext HTTP message
module.exports.build = function (r) {
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


module.exports.parse = function (m) {
  const split = /([^\n]+)\n([\W\w]+?\n)\n([\W\w]+)/.exec(m);
  const firstLine = /HTTP\/([^ ]+?) ([\d]+) [\W\w]+?/m.exec(split[1]);

  const httpVersion = firstLine[1];
  const status = parseInt(firstLine[2], 10);
  const headerRegion = split[2];
  const body = split[3];

  const headerRegex = /^([^:\n]+?):[ ]+([\W\w]+?)$/gm;
  const headers = {};
  while (h = headerRegex.exec(headerRegion)) {
    headers[h[1]] = h[2];
  };

  return {
    status,
    httpVersion,
    headers,
    body,
  };
};

module.exports.buildMultipart = function (parts, boundary, options) {
  options = options || {
    headers: {},
    autoContentLength: false,
  };

  const headers = Object.keys(options.headers)
    .map(key => `${key}: ${options.headers[key]}\n`)
    .join('');

  let ret = '';
  parts.forEach(p => {
    ret += `--${boundary}\n`;
    ret += headers;
    if (options.autoContentLength) {
      ret += `Content-Length: ${Buffer.byteLength(p, 'utf8')}\n`;
    }
    ret += `\n${p}\n`;
  });

  return `${ret}--${boundary}--`;
};

module.exports.parseMultipart = function(m, boundary) {
  boundary = boundary ? `--${boundary}` : /^--[^\n]+(?:--)?/gm;
  return m.split(boundary).slice(1, -1);
};
