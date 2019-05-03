const express = require('express');
const Actions = require('./model.js');

const router = express.Router();

router.post('/', (req, res) => {
  const action = req.body;
  if (action && action.description) {
    action.completed = action.completed || false;
    Actions.insert(action)
      .then(action => res.status(201).json(action))
      .catch(() => res.status(500).json({message: "Error creating action."}));
  } else {
    res.status(400).json({message: "Action requires description"});
  }
});

module.exports = router;
