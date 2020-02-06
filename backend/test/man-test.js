const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();
chai.use(chaiHttp);
chai.use(require("chai-things"));

const URL_BASE = "http://localhost:3001";

describe('Avaliação do tipo MAN', () => {
    it('Avaliação MAN com dados válidos',(done) => {
        const man = {
            cod_pac: '',
            av_global:{
                vive_propria_casa:'',
                qtd_medicamentos: '',
                escaras_lesoes_pele: '',
                qtd_refeicao_dia: '',
                consumo_leite_derivados: '',
                consumo_leguminosas_ovos: '',
                consumo_proteina: '',
                somatorio_consumo: '',
                consumo_frutas_hortalicas: '',
                consumo_liquidos: '',
                modo_alimentacao: '',
                problema_nutricional: '',
                comparacao_faixa_etaria: '',
                perimetro_braquial: '',
                perimetro_perna: ''
            },
            triagem:{
                diminuicao_ingestao_alimentar: '',
                perda_peso: '',
                mobilidade:'',
                stress_psicologico: '',
                doenca_neuropsic: '',
                imc: ''
            }
        }
        
        chai.request(URL_BASE)
        .post('/avaliacao/man')
        .send(man)
        .end((err,res) => {
           res.should.have.status(200)
           res.body.should.have.property('resultado')
           done()
        })
    })
    
    it('Avaliação MAN com dados da triagem em branco',(done) => {
        const man = {
            cod_pac: '',
            av_global:{
                vive_propria_casa:'',
                qtd_medicamentos: '',
                escaras_lesoes_pele: '',
                qtd_refeicao_dia: '',
                consumo_leite_derivados: '',
                consumo_leguminosas_ovos: '',
                consumo_proteina: '',
                somatorio_consumo: '',
                consumo_frutas_hortalicas: '',
                consumo_liquidos: '',
                modo_alimentacao: '',
                problema_nutricional: '',
                comparacao_faixa_etaria: '',
                perimetro_braquial: '',
                perimetro_perna: ''
            },
            triagem:{
                diminuicao_ingestao_alimentar: '',
                perda_peso: '',
                mobilidade:'',
                stress_psicologico: '',
                doenca_neuropsic: '',
                imc: ''
            }
        }
        
        chai.request(URL_BASE)
        .post('/avaliacao/man')
        .send(man)
        .end((err,res) => {
           res.should.have.status(400)
           res.body.should.have.property('error').eql('Dados obrigatórios em branco,favor conferir')
           done()
        })
    })
    
    it('Avaliação MAN com dados da avaliação global em branco',(done) => {
        const man = {
            cod_pac: '',
            av_global:{
                vive_propria_casa:'',
                qtd_medicamentos: '',
                escaras_lesoes_pele: '',
                qtd_refeicao_dia: '',
                consumo_leite_derivados: '',
                consumo_leguminosas_ovos: '',
                consumo_proteina: '',
                somatorio_consumo: '',
                consumo_frutas_hortalicas: '',
                consumo_liquidos: '',
                modo_alimentacao: '',
                problema_nutricional: '',
                comparacao_faixa_etaria: '',
                perimetro_braquial: '',
                perimetro_perna: ''
            },
            triagem:{
                diminuicao_ingestao_alimentar: '',
                perda_peso: '',
                mobilidade:'',
                stress_psicologico: '',
                doenca_neuropsic: '',
                imc: ''
            }
        }
        
        chai.request(URL_BASE)
        .post('/avaliacao/man')
        .send(man)
        .end((err,res) => {
           res.should.have.status(400)
           res.body.should.have.property('error').eql('Dados obrigatórios em branco,favor conferir')
           done()
        })
    })
    
    it('Avaliação MAN com paciente não informado',(done) => {
        const man = {
            cod_pac: '',
            av_global:{
                vive_propria_casa:'',
                qtd_medicamentos: '',
                escaras_lesoes_pele: '',
                qtd_refeicao_dia: '',
                consumo_leite_derivados: '',
                consumo_leguminosas_ovos: '',
                consumo_proteina: '',
                somatorio_consumo: '',
                consumo_frutas_hortalicas: '',
                consumo_liquidos: '',
                modo_alimentacao: '',
                problema_nutricional: '',
                comparacao_faixa_etaria: '',
                perimetro_braquial: '',
                perimetro_perna: ''
            },
            triagem:{
                diminuicao_ingestao_alimentar: '',
                perda_peso: '',
                mobilidade:'',
                stress_psicologico: '',
                doenca_neuropsic: '',
                imc: ''
            }
        }
        
        chai.request(URL_BASE)
        .post('/avaliacao/man')
        .send(man)
        .end((err,res) => {
           res.should.have.status(400)
           res.body.should.have.property('error').eql('Informe o paciente')
           done()
        })
    })
})