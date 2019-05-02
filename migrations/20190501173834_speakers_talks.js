exports.up = function(knex, Promise) {
  return knex.schema.createTable('speaker_talks', function(table) {
    table.increments('id')
    table.integer('speakerid').unsigned()
    table.foreign('speakerid').references('speaker.id')
    table.integer('talkid').unsigned()
    table.foreign('talkid').references('talk.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('speaker_talks')
}
