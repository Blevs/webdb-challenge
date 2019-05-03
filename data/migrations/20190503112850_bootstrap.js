exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .unique()
        .notNullable();
      tbl.text('description');
      tbl.boolean('completed');
    })
    .createTable('actions', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable();
      tbl.text('notes');
      tbl.boolean('completed');
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects');
};
