const {
  postSchema,
  mailSchema,
  likeSchema,
  listenSchema,
} = require('./src/schemas')
const { prodOrDev } = require('./src/utils')

const config = {
  type: 'mysql',
  host: prodOrDev('mysql', 'localhost'),
  port: 3310,
  username: 'rt',
  password: 'VW32n93N',
  database: 'rt',
  entities: [postSchema, mailSchema, likeSchema, listenSchema],
  migrationsRun: true,
  migrations: ['src/migrations/*.js'],
  cli: { migrationsDir: 'src/migrations' },
  // synchronize: true,
  // logging: ['query', 'error'],
}

module.exports = config
