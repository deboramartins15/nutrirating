const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";
let token = "";

describe("Avaliação do tipo MAN", () => {
  beforeEach("Autenticação", function(done) {
    const profissional = {
      email: "debora2@gmail.com",
      senha: "12345678"
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
  it("Avaliação MAN com dados válidos", done => {
    const man = {
      cod_pac: "4",
      av_global: {
        vive_propria_casa: "1",
        qtd_medicamentos: "0",
        escaras_lesoes_pele: "1",
        qtd_refeicao_dia: "2",
        consumo_leite_derivados: "S",
        consumo_leguminosas_ovos: "S",
        consumo_proteina: "S",
        somatorio_consumo: "1",
        consumo_frutas_hortalicas: "0",
        consumo_liquidos: "0",
        modo_alimentacao: "1",
        problema_nutricional: "2",
        comparacao_faixa_etaria: "1",
        perimetro_braquial: "0.5",
        perimetro_perna: "1"
      },
      triagem: {
        diminuicao_ingestao_alimentar: "1",
        perda_peso: "2",
        mobilidade: "2",
        stress_psicologico: "2",
        doenca_neuropsic: "2",
        imc: "2"
      }
    };

    chai
      .request(URL_BASE)
      .post("/avaliacao/man")
      .set("Authorization", "Bearer " + token)
      .send(man)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("resultado");
        done();
      });
  });

  it("Avaliação MAN com dados da triagem em branco", done => {
    const man = {
      cod_pac: "4",
      av_global: {
        vive_propria_casa: "1",
        qtd_medicamentos: "0",
        escaras_lesoes_pele: "1",
        qtd_refeicao_dia: "2",
        consumo_leite_derivados: "S",
        consumo_leguminosas_ovos: "S",
        consumo_proteina: "S",
        somatorio_consumo: "1",
        consumo_frutas_hortalicas: "0",
        consumo_liquidos: "0",
        modo_alimentacao: "1",
        problema_nutricional: "2",
        comparacao_faixa_etaria: "1",
        perimetro_braquial: "0.5",
        perimetro_perna: "1"
      },
      triagem: {
        diminuicao_ingestao_alimentar: "",
        perda_peso: "2",
        mobilidade: "2",
        stress_psicologico: "2",
        doenca_neuropsic: "2",
        imc: "2"
      }
    };

    chai
      .request(URL_BASE)
      .post("/avaliacao/man")
      .set("Authorization", "Bearer " + token)
      .send(man)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Dados obrigatórios em branco,favor conferir");
        done();
      });
  });

  it("Avaliação MAN com dados da avaliação global em branco", done => {
    const man = {
      cod_pac: "4",
      av_global: {
        vive_propria_casa: "",
        qtd_medicamentos: "0",
        escaras_lesoes_pele: "1",
        qtd_refeicao_dia: "2",
        consumo_leite_derivados: "S",
        consumo_leguminosas_ovos: "S",
        consumo_proteina: "S",
        somatorio_consumo: "1",
        consumo_frutas_hortalicas: "0",
        consumo_liquidos: "0",
        modo_alimentacao: "1",
        problema_nutricional: "2",
        comparacao_faixa_etaria: "1",
        perimetro_braquial: "0.5",
        perimetro_perna: "1"
      },
      triagem: {
        diminuicao_ingestao_alimentar: "1",
        perda_peso: "2",
        mobilidade: "2",
        stress_psicologico: "2",
        doenca_neuropsic: "2",
        imc: "2"
      }
    };

    chai
      .request(URL_BASE)
      .post("/avaliacao/man")
      .set("Authorization", "Bearer " + token)
      .send(man)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Dados obrigatórios em branco,favor conferir");
        done();
      });
  });

  it("Avaliação MAN com paciente não informado", done => {
    const man = {
      cod_pac: "",
      av_global: {
        vive_propria_casa: "1",
        qtd_medicamentos: "0",
        escaras_lesoes_pele: "1",
        qtd_refeicao_dia: "2",
        consumo_leite_derivados: "S",
        consumo_leguminosas_ovos: "S",
        consumo_proteina: "S",
        somatorio_consumo: "1",
        consumo_frutas_hortalicas: "0",
        consumo_liquidos: "0",
        modo_alimentacao: "1",
        problema_nutricional: "2",
        comparacao_faixa_etaria: "1",
        perimetro_braquial: "0.5",
        perimetro_perna: "1"
      },
      triagem: {
        diminuicao_ingestao_alimentar: "1",
        perda_peso: "2",
        mobilidade: "2",
        stress_psicologico: "2",
        doenca_neuropsic: "2",
        imc: "2"
      }
    };

    chai
      .request(URL_BASE)
      .post("/avaliacao/man")
      .set("Authorization", "Bearer " + token)
      .send(man)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error").eql("Informe o paciente");
        done();
      });
  });
});
