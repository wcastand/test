exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('admin').insert([
        {
          email: 'manager@paybase.com',
          encryptedPassword: '$2a$10$.2POnqmtmqr8SjVzhIDw6u2JLWiT2OB4zd4qPS5V4wKYjBhSwTWZC',
        },
      ])
    })
}
