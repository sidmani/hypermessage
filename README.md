# hypermessage

Make plaintext HTTP messages as specified by [RFC-7230](https://tools.ietf.org/html/rfc7230#section-3).

## Example
```
var hm = require('hypermessage');

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
```
**Output**
```
POST https://example.com/foo?bar=baz HTTP/2.0
Content-Type: foo

{ "key": "value" }
```

## License
MIT
