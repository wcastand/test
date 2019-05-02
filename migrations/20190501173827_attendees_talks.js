exports.up = function(knex, Promise) {
  return knex.schema.createTable('attendee_talks', function(table) {
    table.increments('id')
    table.integer('attendeeid').unsigned()
    table.foreign('attendeeid').references('attendee.id')
    table.integer('talkid').unsigned()
    table.foreign('talkid').references('talk.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('attendee_talks')
}
