const { EntitySchema } = require('typeorm')

const listenSchema = new EntitySchema({
  name: 'Listen',
  columns: {
    id: {
      primary: true,
      generated: true,
      type: 'int',
    },
    user: {
      type: 'varchar',
    },
  },
  relations: {
    post: {
      target: 'Post',
      type: 'many-to-one',
      joinColumn: true,
      cascade: true,
    },
  },
})

module.exports = listenSchema
