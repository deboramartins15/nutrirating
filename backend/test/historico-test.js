const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";

describe('Histórico de Avaliação', () => {
    it('Visualizar avaliações com paciente que possua avaliações anteriores', (done) => {
        const avaliacao = {
            tipo: 'MAN',
            cod_pac: 4
        }
        
        chai.request(URL_BASE)
        .get(`/historico/${avaliacao.cod_pac}/${avaliacao.tipo}`) 
        .end((err, res) => {
            res.body.should.be.an('array').that.is.not.empty
            done()
        })
    })
    
    it('Visualizar avaliações com paciente que não possua avaliações anteriores', (done) => {
        const avaliacao = {
            tipo: 'MAN',
            cod_pac: 5
        }
        
        chai.request(URL_BASE)
        .get(`/historico/${avaliacao.cod_pac}/${avaliacao.tipo}`)
        .end((err, res) => {            
            res.body.should.be.an('array').that.is.empty
            done()
        })
    })

    it('Visualizar avaliação específica do paciente', (done) => {
        const avaliacao = {
            tipo: 'MAN',
            cod_pac: 4,
            cod_av: 1
        }

        chai.request(URL_BASE)
        .get(`/historico/${avaliacao.cod_pac}/${avaliacao.cod_av}/${avaliacao.tipo}`) 
        .end((err, res) => {
            res.body.should.be.an('object').that.is.not.empty
            done()
        })
    })
})