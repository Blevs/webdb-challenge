const express = require('express');
const Projects = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({message: "Error fetching projects."}));
});

module.exports = router;
