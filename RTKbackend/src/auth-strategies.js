const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const passport = require('passport')
const { JWT_SECRET } = require('./constants')
const { Ldap } = require('./managers')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    ({ username, password }, done) =>
      Ldap.checkUser(username, password).then(success =>
        done(null, success ? { username } : false),
      ),
  ),
)
