//const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

const { authSecret } = require("../.env");

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  const strategy = new Strategy(params, (payload, done) => {
    app
      .db("profissional")
      .where({ cod_profissional: payload.id })
      .first()
      .then(profissional => done(null, profissional ? { ...payload } : false))
      .catch(err => done(err, false));
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate("jwt", { session: false })
  };
};
