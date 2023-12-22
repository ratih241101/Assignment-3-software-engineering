// server.js or app.js
const http = require('http');
const app = require('./server'); 
const app = require('./merchant');

const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
