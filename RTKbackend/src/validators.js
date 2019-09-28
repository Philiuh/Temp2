const R = require('ramda')
const { createValidator } = require('./utils')

const userValidator = createValidator({
  username: [
    [R.anyPass([R.isNil, R.isEmpty]), 'Поле логин должно быть заполнено'],
  ],
  password: [
    [R.anyPass([R.isNil, R.isEmpty]), 'Поле пароль должно быть заполнено'],
  ],
})

const postValidator = createValidator({
  title: [
    [R.anyPass([R.isNil, R.isEmpty]), 'Поле заголовок должно быть заполнено'],
    [x => typeof x !== 'string', 'Поле заголовок должно быть строкой'],
  ],
  tags: [
    [
      R.allPass([R.complement(R.isNil), x => !Array.isArray(x)]),
      'Поле тэги должно быть массивом строк',
    ],
  ],
})

const soundcastValidator = createValidator({
  mimetype: [
    [
      R.complement(R.anyPass([R.equals('audio/mpeg'), R.equals('audio/mp3')])),
      'Неверный формат файла',
    ],
  ],
})

const mailValidator = createValidator({
  title: [
    [R.anyPass([R.isNil, R.isEmpty]), 'Поле заголовок должно быть заполнено'],
    [x => typeof x !== 'string', 'Поле заголовок должно быть строкой'],
  ],
  message: [
    [R.anyPass([R.isNil, R.isEmpty]), 'Поле текст должно быть заполнено'],
    [x => typeof x !== 'string', 'Поле текст должно быть строкой'],
  ],
})

module.exports = {
  userValidator,
  postValidator,
  soundcastValidator,
  mailValidator,
}
