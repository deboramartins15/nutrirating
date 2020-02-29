//Rotas
module.exports = app => {
  app.route("/signup").post(app.api.profissionalController.save);
  app.route("/login").post(app.api.authController.logon);
  app.route("/forgot-pass").post(app.api.authController.recuperaSenha);
  app.route("/validateToken").post(app.api.authController.validateToken)

  app
    .route("/profissional/:id")
    .all(app.config.authentication.authenticate())
    .put(app.api.profissionalController.save)
    .get(app.api.profissionalController.getById)
    .delete(app.api.profissionalController.remove);

  app
    .route("/paciente")
    .all(app.config.authentication.authenticate())
    .post(app.api.pacienteController.save);

  app
    .route("/paciente/:id")
    .all(app.config.authentication.authenticate())
    .put(app.api.pacienteController.save)
    .get(app.api.pacienteController.getById);

  app
    .route("/historico/:pac/:tipo")
    .all(app.config.authentication.authenticate())
    .get(app.api.historicoController.get);

  app
    .route("/historico/:pac/:av/:tipo")
    .all(app.config.authentication.authenticate())
    .get(app.api.historicoController.getById);

  app
    .route("/avaliacao/asg")
    .all(app.config.authentication.authenticate())
    .post(app.api.asgController.save);

  app
    .route("/avaliacao/man")
    .all(app.config.authentication.authenticate())
    .post(app.api.manController.save);
};
