const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";
let token = "";

describe("Cadastro de Paciente", () => {
  beforeEach("Autenticação", function(done) {
    const profissional = {
      email: "profissional_test6.646757917205573@gmail.com",
      senha: "1234de78"
    };

    chai
      .request(URL_BASE)
      .post("/login")
      .send(profissional)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it("Cadastrar um paciente com dados válidos", done => {
    const paciente = {
      nome: "Paciente teste" + Math.floor(Math.random() * 10000),
      dt_nasc: "1998-03-15",
      cpf: "1718374" + Math.floor(Math.random() * 10000),
      sexo: "F",
      endereco: "Rua teste",
      telefone: "99999999999",
      diabetes: "T",
      demencia: "F",
      cod_profissional: 4
    };

    chai
      .request(URL_BASE)
      .post("/paciente")
      .set("Authorization", "Bearer " + token)
      .send(paciente)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("success")
          .eql("Paciente inserido com sucesso");
        done();
      });
  });

  it("Cadastrar um paciente com dados obrigatórios em branco", done => {
    const paciente = {
      nome: "",
      dt_nasc: "1998-03-15",
      cpf: "17183742750",
      sexo: "F",
      endereco: "Rua teste",
      telefone: "99999999999",
      diabetes: "T",
      demencia: "F",
      cod_profissional: 4
    };

    chai
      .request(URL_BASE)
      .post("/paciente")
      .set("Authorization", "Bearer " + token)
      .send(paciente)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Campos obrigatórios em branco,favor conferir");
        done();
      });
  });

  it("Cadastrar um paciente com CPF já cadastrado", done => {
    const paciente = {
      nome: "Paciente teste",
      dt_nasc: "1998-03-15",
      cpf: "17183742750",
      sexo: "F",
      endereco: "Rua teste",
      telefone: "99999999999",
      diabetes: "T",
      demencia: "F",
      cod_profissional: 4
    };

    chai
      .request(URL_BASE)
      .post("/paciente")
      .set("Authorization", "Bearer " + token)
      .send(paciente)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error").eql("Paciente já cadastrado");
        done();
      });
  });
});

describe("Update de Paciente", () => {
  it("Alteração de paciente com dados válidos", done => {
    const paciente = {
      id: 4,
      nome: "Paciente teste update",
      dt_nasc: "1998-03-15",
      cpf: "17183742750",
      sexo: "F",
      endereco: "Rua teste",
      telefone: "99999999999",
      diabetes: "T",
      demencia: "F",
      cod_profissional: 4
    };

    chai
      .request(URL_BASE)
      .put("/paciente/" + paciente.id)
      .set("Authorization", "Bearer " + token)
      .send(paciente)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("success")
          .eql("Paciente alterado com sucesso");
        done();
      });
  });

  it("Alteração de paciente com dados obrigatórios em branco", done => {
    const paciente = {
      id: 4,
      nome: "",
      dt_nasc: "1998-03-15",
      sexo: "F",
      endereco: "Rua teste",
      telefone: "99999999999",
      diabetes: "T",
      demencia: "F",
      cod_profissional: 4
    };

    chai
      .request(URL_BASE)
      .put("/paciente/" + paciente.id)
      .set("Authorization", "Bearer " + token)
      .send(paciente)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Campos obrigatórios em branco,favor conferir");
        done();
      });
  });
});
