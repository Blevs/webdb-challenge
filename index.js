const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

const projects = require('./projects/routes.js');
server.use('/api/projects', projects);

server.listen(3200, () => console.log('API running on port 3200'));

