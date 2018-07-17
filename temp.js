const hm = require('./index');

 var req = {
    method: 'POST',
    body: '{ "key": "value" }',
    headers: {
      'Content-Type': 'foo'
    },
    endpoint: 'https://example.com/foo?bar=baz',
    httpVersion: '2.0' // defaults to 1.1
};

 console.log(hm.build(req));

