const ldap = require('ldapjs')
const { LDAP_SERVER_URL } = require('../constants')
const { prodOrDev } = require('../utils')

const checkUser = (username, password) =>
  new Promise(res =>
    prodOrDev(
      () => {
        const client = ldap.createClient({ url: `ldap://${LDAP_SERVER_URL}` })
        client.bind(username, password, err => {
          res(err === null)
          client.destroy()
        })
        client.on('error', err =>
          // eslint-disable-next-line
          console.log('LDAP connection failed: ', err),
        )
      },
      () => {
        res(username === 'test' && password === 'test')
      },
    ),
  )

module.exports = { checkUser }
