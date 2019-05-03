const express = require('express');
const Projects = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(() => res.status(500).json({message: "Error fetching projects."}));
});

router.post('/', (req, res) => {
  const project = req.body;
  if (project && project.name) {
    project.completed = project.completed || false;
    Projects.insert(project)
      .then(project => res.status(201).json(project))
      .catch(() => res.status(500).json({message: "Error creating project"}));
  } else {
    res.status(400).json({message: "Project requires name."});
  }
});

module.exports = router;
