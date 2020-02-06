const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";

describe('Avaliação do tipo ASG', () => {
    
    it('Avaliação com dados válidos', (done) => {
        const asg = {
            cod_pac: 3,
            resultado: 'A',
            peso: {
                peso_anterior: 55,
                peso_atual: 49,
                perda_peso: 11,
                mudanca_peso: 'R'
            },
            ingestao_alimentar: {
                sem_mudanca: 'A',
                mudanca: 'F',
                tempo_mudanca: '0',
                tipo_dieta: 'SO'
            },
            sint_gastroint:{
                nenhum: 'T',
                nausea: 'F',
                vomito: 'F',
                diarreia:'F',
                anorexia: 'F',
                duracao: 0
            },
            capac_func:{
                sem_alteracao: 'T',
                altercao: 'F',
                tempo_alteracao: '0',
                duracao: 0
            },
            doenc_comorb:{
                diag_principal: 'teste',
                requerimento: 'N',
                stress_metabol: 'N'
            },
            exame_fisico:{
                red_gord_subcut:'T',
                perda_muscular:'T',
                edema: 'F',
                ascite: 'F'
            }
        }

        chai.request(URL_BASE)
        .post('/avaliacao/asg')
        .send(asg)
        .end((err,res) => {
           res.should.have.status(200)
           res.body.should.have.property('resultado')
           done()
        })
    })
    
    it('Avaliação com dados em branco', (done) => {
        const asg = {
            cod_pac: 3,
            resultado: 'A',
            peso: {
                peso_anterior: '',
                peso_atual: 49,
                perda_peso: 11,
                mudanca_peso: 'R'
            },
            ingestao_alimentar: {
                sem_mudanca: 'A',
                mudanca: 'F',
                tempo_mudanca: '0',
                tipo_dieta: 'SO'
            },
            sint_gastroint:{
                nenhum: 'T',
                nausea: 'F',
                vomito: 'F',
                diarreia:'F',
                anorexia: 'F',
                duracao: 0
            },
            capac_func:{
                sem_alteracao: 'T',
                altercao: 'F',
                tempo_alteracao: '0',
                duracao: 0
            },
            doenc_comorb:{
                diag_principal: 'teste',
                requerimento: 'N',
                stress_metabol: 'N'
            },
            exame_fisico:{
                red_gord_subcut:'T',
                perda_muscular:'T',
                edema: 'F',
                ascite: 'F'
            }
        }

        chai.request(URL_BASE)
        .post('/avaliacao/asg')
        .send(asg)
        .end((err,res) => {
            res.should.have.status(400)
            res.body.should.have.property('error').eql('Dados obrigatórios em branco,favor conferir')
           done()
        })
    })
    
    it('Avaliação com paciente não informado', (done) => {
        const asg = {
            cod_pac: '',
            resultado: 'A',
            peso: {
                peso_anterior: 55,
                peso_atual: 49,
                perda_peso: 11,
                mudanca_peso: 'R'
            },
            ingestao_alimentar: {
                sem_mudanca: 'A',
                mudanca: 'F',
                tempo_mudanca: '0',
                tipo_dieta: 'SO'
            },
            sint_gastroint:{
                nenhum: 'T',
                nausea: 'F',
                vomito: 'F',
                diarreia:'F',
                anorexia: 'F',
                duracao: 0
            },
            capac_func:{
                sem_alteracao: 'T',
                altercao: 'F',
                tempo_alteracao: '0',
                duracao: 0
            },
            doenc_comorb:{
                diag_principal: 'teste',
                requerimento: 'N',
                stress_metabol: 'N'
            },
            exame_fisico:{
                red_gord_subcut:'T',
                perda_muscular:'T',
                edema: 'F',
                ascite: 'F'
            }
        }

        chai.request(URL_BASE)
        .post('/avaliacao/asg')
        .send(asg)
        .end((err,res) => {
           res.should.have.status(400)
           res.body.should.have.property('error').eql('Informe o paciente')
           done()
        })
    })
})