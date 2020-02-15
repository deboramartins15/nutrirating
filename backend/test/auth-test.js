const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const api = require("../api/profissionalController");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";

describe("Login c/ profissional", () => {
  it("Logar com profissional cadastrado", done => {
    const profissional = {
      email: "profissional_test6.646757917205573@gmail.com",
      senha: "1234de78"
    };

    chai
      .request(URL_BASE)
      .post("/login")
      .send(profissional)
      .end((err, res) => {
        res.body.should.be.an("object").that.contains.property("token");
        done();
      });
  });

  it("Logar com profissional com dados obrigatórios em branco", done => {
    const profissional = {
      email: "",
      senha: ""
    };

    chai
      .request(URL_BASE)
      .post("/login")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Informe o e-mail e/ou senha");
        done();
      });
  });

  it("Logar com profissional não cadastrado", done => {
    const profissional = {
      email: "profissional@gmail.com",
      senha: "1234de78"
    };

    chai
      .request(URL_BASE)
      .post("/login")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error").eql("Usuário não cadastrado");
        done();
      });
  });

  it("Logar com profissional com senha inválida", done => {
    const profissional = {
      email: "profissional_test@gmail.com",
      senha: "1234de789"
    };

    chai
      .request(URL_BASE)
      .post("/login")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("error").eql("Senha inválida");
        done();
      });
  });

  it("Usuário esqueceu os dados com email válido", done => {
    const profissional = {
      email: "profissional_test@gmail.com"
    };

    chai
      .request(URL_BASE)
      .post("/forgot-pass")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("Usuário esqueceu os dados com email inválido", done => {
    const profissional = {
      email: "profissional_testando@gmail.com"
    };

    chai
      .request(URL_BASE)
      .post("/forgot-pass")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error").eql("E-mail não cadastrado");
        done();
      });
  });
});
