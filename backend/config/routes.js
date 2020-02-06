//Rotas
module.exports = app => {
  app.route("/signup").post(app.api.profissionalController.save);
  app.route("/login").post(app.api.authController.logon);
  app.route("/forgot-pass").post(app.api.authController.recuperaSenha);

  app
    .route("/profissional/:id")
    .put(app.api.profissionalController.save)
    .get(app.api.profissionalController.getById)
    .delete(app.api.profissionalController.remove);

  app.route("/paciente").post(app.api.pacienteController.save);

  app
    .route("/paciente/:id")
    .put(app.api.pacienteController.save)
    .get(app.api.pacienteController.getById);

  app.route("/historico/:pac/:tipo").get(app.api.historicoController.get);

  app
    .route("/historico/:pac/:av/:tipo")
    .get(app.api.historicoController.getById);

  app.route("/avaliacao/asg").post(app.api.asgController.save);

  app.route("/avaliacao/man").post(app.api.manController.save);
};
