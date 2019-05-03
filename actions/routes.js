const express = require('express');
const Actions = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => res.status(200).json(actions))
    .catch(() => res.status(500).json({message: "Error fetching actions."}));
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Actions.get(id)
    .then(action => action
          ? res.status(200).json(action)
          : res.status(404).json({message: "No action with id."}))
    .catch(err => console.log(err) || res.status(500).json({message: "Error fetching action"}));
});

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
