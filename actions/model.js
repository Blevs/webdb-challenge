const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert,
  remove,
  update
};

function get(id) {
  if (id) {
    return db('actions')
      .where({id})
      .first()
      .then(a => a && ({...a, completed: Boolean(a.completed)}));
  } else {
    return db('actions')
      .then(actions => actions.map(a => ({...a, completed: Boolean(a.completed)})))
    ;
  }
}

function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => get(id));
}

function remove(id) {
  return db('actions')
    .where({id})
    .del();
}

function update(changes, id) {
  return db('actions')
    .where({id})
    .update(changes)
    .then(updated => (updated > 0 ? get(id) : null));
}
