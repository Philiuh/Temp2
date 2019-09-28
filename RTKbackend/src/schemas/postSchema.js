const { EntitySchema } = require('typeorm')

const postSchema = new EntitySchema({
  name: 'Post',
  columns: {
    id: {
      primary: true,
      generated: true,
      type: 'int',
    },
    title: {
      type: 'varchar',
    },
    url: {
      type: 'varchar',
    },
    tags: {
      type: 'simple-array',
    },
    time: {
      type: 'int',
      unsigned: true,
    },
    description: {
      type: 'text',
    },
    image: {
      type: 'varchar',
    },
  },
  relations: {
    likes: {
      target: 'Like',
      type: 'one-to-many',
      inverseSide: 'post',
    },
    listens: {
      target: 'Listen',
      type: 'one-to-many',
      inverseSide: 'post',
    },
  },
})

module.exports = postSchema
