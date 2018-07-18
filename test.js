#!/usr/bin/env node

const hm = require('./index');
const assert = require('assert');

function testParseResponse() {
  const httpResponse = `HTTP/1.1 200 OK
Content-Type: application/json; charset=UTF-8
Date: Tue, 17 Jul 2018 21:33:55 GMT
Expires: Tue, 17 Jul 2018 21:33:55 GMT
Cache-Control: private, max-age=0
Content-Length: 130

{
  "kind": "drive#file",
  "id": "1hBaGQJIomcW4RE5eAwiX1PPNksYnNkHV",
  "name": "test11",
  "mimeType": "application/octet-stream"
}`;

  const expected = {
    httpVersion: '1.1',
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Date': 'Tue, 17 Jul 2018 21:33:55 GMT',
      'Expires': 'Tue, 17 Jul 2018 21:33:55 GMT',
      'Cache-Control': 'private, max-age=0',
      'Content-Length': '130',
    },
    body: '{\n  "kind": "drive#file",\n  "id": "1hBaGQJIomcW4RE5eAwiX1PPNksYnNkHV",\n  "name": "test11",\n  "mimeType": "application/octet-stream"\n}',
  };

  const result = hm.parse(httpResponse);
  assert.deepEqual(result, expected);
}

function test() {
  testParseResponse();
  console.log('Tests OK');
}

test();
