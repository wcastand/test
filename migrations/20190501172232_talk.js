const addTimestamps = require('./helpers')

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('talk', function(table) {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.date('startDate').notNullable()
      table.integer('duration').notNullable()
      table.timestamp('createdat').defaultTo(knex.fn.now())
      table.timestamp('updatedat').defaultTo(knex.fn.now())
    })
    .raw(addTimestamps, { table_name: 'talk' })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('talk')
}
