const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert
};

function get(id) {
  if (id) {
    const projectQuery = db('projects').where({id});
    const actionsQuery = db('actions').where({project_id: id});
    return Promise.all([projectQuery, actionsQuery]).then(([project, actions]) => {
      if (project) {
        project.actions = actions;
        return project;
      } else {
        return null;
      }
    });
  } else {
    return db('projects');
  }
}

function insert(project) {
  db('projects')
    .insert(project, 'id')
    .then(([id]) => get(id));
}
