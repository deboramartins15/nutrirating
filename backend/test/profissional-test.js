const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";
let token = "";

describe("Sign up profissional", () => {
  it("Cadastrar um profissional com dados válidos", done => {
    const profissional = {
      nome: "Profissional Test",
      email:
        "profissional_test" + Math.floor(Math.random() * 10000) + "@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de78",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .post("/signup")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("Cadastrar um profissional com dados obrigatórios em branco", done => {
    const profissional = {
      nome: "",
      email: "",
      dt_nasc: "1998-03-15",
      senha: "",
      conf_senha: "",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: ""
    };

    chai
      .request(URL_BASE)
      .post("/signup")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Campos obrigatórios em branco.Favor conferir");
        done();
      });
  });

  it("Cadastrar um profissional com e-mail já cadastrado", done => {
    const profissional = {
      nome: "Profissional Test",
      email: "profissional_test@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de78",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .post("/signup")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error").eql("E-mail já cadastrado");
        done();
      });
  });

  it("Cadastrar um profissional com senha inválida", done => {
    const profissional = {
      nome: "Profissional Test",
      email: "profissional_test@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de7",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .post("/signup")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("A senha deve ter no mínimo 8 dígitos alfanuméricos");
        done();
      });
  });

  it("Cadastrar um profissional com a senha e confirmação da senha diferentes", done => {
    const profissional = {
      nome: "Profissional Test",
      email: "profissional_test@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de789",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .post("/signup")
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Senha e confirmação da senha não conferem");
        done();
      });
  });
});

describe("Update Profissional", () => {
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

  it("Alteração de profissional com dados válidos", done => {
    const profissional = {
      id: 3,
      nome: "Profissional Teste",
      email:
        "profissional_test_upt" +
        Math.floor(Math.random() * 10000) +
        "@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de78",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .put("/profissional/" + profissional.id)
      .set("Authorization", "Bearer " + token)
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("success")
          .eql("Usuário alterado com sucesso");
        done();
      });
  });

  it("Alteração de profissional com dados obrigatórios em branco", done => {
    const profissional = {
      id: 3,
      nome: "",
      email:
        "profissional_test_upt" +
        Math.floor(Math.random() * 10000) +
        "@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de78",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .put("/profissional/" + profissional.id)
      .set("Authorization", "Bearer " + token)
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Campos obrigatórios em branco.Favor conferir");
        done();
      });
  });

  it("Alteração de profissional com senha inválida", done => {
    const profissional = {
      id: 3,
      nome: "Profissional Teste",
      email:
        "profissional_test_upt" +
        Math.floor(Math.random() * 10000) +
        "@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de7",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .put("/profissional/" + profissional.id)
      .set("Authorization", "Bearer " + token)
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("A senha deve ter no mínimo 8 dígitos alfanuméricos");
        done();
      });
  });

  it("Alteração de profissional com senha e confirmação de senha diferentes", done => {
    const profissional = {
      id: 3,
      nome: "Profissional Teste",
      email:
        "profissional_test_upt" +
        Math.floor(Math.random() * 10000) +
        "@gmail.com",
      dt_nasc: "1998-03-15",
      senha: "1234de789",
      conf_senha: "1234de78",
      sexo: "F",
      telefone: "999999999",
      conselho: "CRM",
      crm_crn: "999999999999"
    };

    chai
      .request(URL_BASE)
      .put("/profissional/" + profissional.id)
      .set("Authorization", "Bearer " + token)
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Senha e confirmação da senha não conferem");
        done();
      });
  });
});

describe("Delete profissional", () => {
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

  it("Exclusão de profissional sem pacientes", done => {
    const profissional = {
      id: 3
    };

    chai
      .request(URL_BASE)
      .delete("/profissional/" + profissional.id)
      .set("Authorization", "Bearer " + token)
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql("Usuário excluído");
        done();
      });
  });

  it("Exclusão de profissional com pacientes", done => {
    const profissional = {
      id: 4
    };

    chai
      .request(URL_BASE)
      .delete("/profissional/" + profissional.id)
      .set("Authorization", "Bearer " + token)
      .send(profissional)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Usuário possui pacientes cadastrados. Impossível excluir");
        done();
      });
  });
});
