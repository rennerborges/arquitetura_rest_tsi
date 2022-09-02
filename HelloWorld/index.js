const http = require('http');

const host = 'localhost';
const port = '3000';

let server = http.createServer((req, res) => {
  console.log('URL:', req.url);
  console.log('Method', req.method);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'plain/text; charset=utf8');
  res.end('Hello, world!');
});

server.listen(port, host, () => {
  console.log('Server running on ' + host + ':' + port);
});
