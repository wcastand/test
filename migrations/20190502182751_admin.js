const addTimestamps = require('./helpers')

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('admin', function(table) {
      table.increments('id')
      table.string('email').notNullable()
      table.string('encryptedPassword').notNullable()
      table.timestamp('createdat').defaultTo(knex.fn.now())
      table.timestamp('updatedat').defaultTo(knex.fn.now())
    })
    .raw(addTimestamps, { table_name: 'admin' })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admin')
}
