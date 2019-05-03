const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.listen(3200, () => console.log('API running on port 3200'));

