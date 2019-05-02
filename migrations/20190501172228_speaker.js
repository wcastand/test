const addTimestamps = require('./helpers')

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('speaker', function(table) {
      table.increments('id')
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('bio').notNullable()
      table.string('avatar')
      table.timestamp('createdat').defaultTo(knex.fn.now())
      table.timestamp('updatedat').defaultTo(knex.fn.now())
    })
    .raw(addTimestamps, { table_name: 'speaker' })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('speaker')
}
