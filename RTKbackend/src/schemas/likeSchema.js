const { EntitySchema } = require('typeorm')

const likeSchema = new EntitySchema({
  name: 'Like',
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

module.exports = likeSchema
