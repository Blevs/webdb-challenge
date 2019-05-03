const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert
};

function get(id) {
  if (id) {
    const projectQuery = db('projects').where({id}).first();
    const actionsQuery = db('actions')
          .select('id', 'description', 'notes', 'completed')
          .where({project_id: id});
    return Promise.all([projectQuery, actionsQuery]).then(([project, actions]) => {
      if (project) {
        project.completed = Boolean(project.completed);
        actions.forEach(a => a.completed = Boolean(a.completed));
        project.actions = actions;
        return project;
      } else {
        return null;
      }
    });
  } else {
    return db('projects')
      .then(projects => projects.map(p => ({...p, completed: Boolean(p.completed)})));
  }
}

function insert(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) => get(id));
}
