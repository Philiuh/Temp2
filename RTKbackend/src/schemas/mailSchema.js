const { EntitySchema } = require('typeorm')

const mailSchema = new EntitySchema({
  name: 'Mail',
  columns: {
    id: {
      primary: true,
      generated: true,
      type: 'int',
    },
    title: {
      type: 'varchar',
    },
    message: {
      type: 'text',
    },
    user: {
      type: 'varchar',
    },
  },
})

module.exports = mailSchema
