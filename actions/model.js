const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert
};

function get(id) {
  if (id) {
    return db('actions').where({id}).first();
  } else {
    return db('actions');
  }
}

function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => get(id));
}
