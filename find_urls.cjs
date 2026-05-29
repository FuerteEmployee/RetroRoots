const fs = require('fs');
const content = fs.readFileSync('live_frontend.js', 'utf8');
const matches = content.match(/https?:\/\/[a-zA-Z0-9\-\.]+/g);
console.log([...new Set(matches)]);
