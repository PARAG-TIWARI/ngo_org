const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: 1, username: 'admin' }, 'ngo-jwt-secret-key-2024');
const http = require('http');

const data = '--boundary\r\nContent-Disposition: form-data; name="title"\r\n\r\nef\r\n--boundary\r\nContent-Disposition: form-data; name="description"\r\n\r\nhfh\r\n--boundary--\r\n';

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/activities',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data', // NO BOUNDARY!
    'Content-Length': Buffer.byteLength(data),
    'Authorization': 'Bearer ' + token
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response Status:', res.statusCode, '\nBody:', body));
});

req.on('error', e => console.error('Error:', e));
req.write(data);
req.end();
