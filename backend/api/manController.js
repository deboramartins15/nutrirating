const MSG01 = "Dados obrigatórios em branco,favor conferir";
const MSG02 = "Informe o paciente";

module.exports = app => {
  const save = async (req, res) => {
    const man = {
      cod_pac: req.body.cod_pac,
      av_global: {
        vive_propria_casa: req.body.av_global.vive_propria_casa,
        qtd_medicamentos: req.body.av_global.qtd_medicamentos,
        escaras_lesoes_pele: req.body.av_global.escaras_lesoes_pele,
        qtd_refeicao_dia: req.body.av_global.qtd_refeicao_dia,
        consumo_leite_derivados: req.body.av_global.consumo_leite_derivados,
        consumo_leguminosas_ovos: req.body.av_global.consumo_leguminosas_ovos,
        consumo_proteina: req.body.av_global.consumo_proteina,
        somatorio_consumo: req.body.av_global.somatorio_consumo,
        consumo_frutas_hortalicas: req.body.av_global.consumo_frutas_hortalicas,
        consumo_liquidos: req.body.av_global.consumo_liquidos,
        modo_alimentacao: req.body.av_global.modo_alimentacao,
        problema_nutricional: req.body.av_global.problema_nutricional,
        comparacao_faixa_etaria: req.body.av_global.comparacao_faixa_etaria,
        perimetro_braquial: req.body.av_global.perimetro_braquial,
        perimetro_perna: req.body.av_global.perimetro_perna
      },
      triagem: {
        diminuicao_ingestao_alimentar:
          req.body.triagem.diminuicao_ingestao_alimentar,
        perda_peso: req.body.triagem.perda_peso,
        mobilidade: req.body.triagem.mobilidade,
        stress_psicologico: req.body.triagem.stress_psicologico,
        doenca_neuropsic: req.body.triagem.doenca_neuropsic,
        imc: req.body.triagem.imc
      }
    };

    const insereTriagem = async triagem => {
      const calculaResultado = () => {
        const result =
          parseInt(diminuicao_ingestao_alimentar) +
          parseInt(perda_peso) +
          parseInt(mobilidade) +
          parseInt(stress_psicologico) +
          parseInt(doenca_neuropsic) +
          parseInt(imc);

        return result;
      };

      if (
        triagem.diminuicao_ingestao_alimentar == "" ||
        triagem.perda_peso == "" ||
        triagem.mobilidade == "" ||
        triagem.stress_psicologico == "" ||
        triagem.doenca_neuropsic == "" ||
        triagem.imc == ""
      )
        return false;

      const {
        diminuicao_ingestao_alimentar,
        perda_peso,
        mobilidade,
        stress_psicologico,
        doenca_neuropsic,
        imc
      } = triagem;

      const isInserted = await app.db("triagem").insert({
        diminuicao_ingestao_alimentar,
        perda_peso,
        mobilidade,
        stress_psicologico,
        doenca_neuropsic,
        imc
      }).catch(err => res.status(500).send(err));

      if (isInserted) return calculaResultado();
    };

    const insereAvGlobal = async av_g => {
      const calculaResultado = () => {
        const result =
          parseInt(vive_propria_casa) +
          parseInt(qtd_medicamentos) +
          parseInt(escaras_lesoes_pele) +
          parseInt(qtd_refeicao_dia) +
          parseFloat(somatorio_consumo) +
          parseInt(consumo_frutas_hortalicas) +
          parseFloat(consumo_liquidos) +
          parseInt(modo_alimentacao) +
          parseInt(problema_nutricional) +
          parseFloat(comparacao_faixa_etaria) +
          parseFloat(perimetro_braquial) +
          parseInt(perimetro_perna);

        return result;
      };

      if (
        av_g.vive_propria_casa == "" ||
        av_g.qtd_medicamentos == "" ||
        av_g.escaras_lesoes_pele == "" ||
        av_g.qtd_refeicao_dia == "" ||
        av_g.consumo_leite_derivados == "" ||
        av_g.consumo_leguminosas_ovos == "" ||
        av_g.consumo_proteina == "" ||
        av_g.somatorio_consumo == "" ||
        av_g.consumo_frutas_hortalicas == "" ||
        av_g.consumo_liquidos == "" ||
        av_g.modo_alimentacao == "" ||
        av_g.problema_nutricional == "" ||
        av_g.comparacao_faixa_etaria == "" ||
        av_g.perimetro_braquial == "" ||
        av_g.perimetro_perna == ""
      )
        return false;

      const {
        vive_propria_casa,
        qtd_medicamentos,
        escaras_lesoes_pele,
        qtd_refeicao_dia,
        consumo_leite_derivados,
        consumo_leguminosas_ovos,
        consumo_proteina,
        somatorio_consumo,
        consumo_frutas_hortalicas,
        consumo_liquidos,
        modo_alimentacao,
        problema_nutricional,
        comparacao_faixa_etaria,
        perimetro_braquial,
        perimetro_perna
      } = av_g;

      const isInserted = await app
        .db("avaliacao_global")
        .insert({
          vive_propria_casa,
          qtd_medicamentos,
          escaras_lesoes_pele,
          qtd_refeicao_dia,
          consumo_leite_derivados,
          consumo_leguminosas_ovos,
          consumo_proteina,
          somatorio_consumo,
          consumo_frutas_hortalicas,
          consumo_liquidos,
          modo_alimentacao,
          problema_nutricional,
          comparacao_faixa_etaria,
          perimetro_braquial,
          perimetro_perna
        })
        .catch(err => res.status(500).send(err));

      if (isInserted) return calculaResultado();
    };

    // VERIFICAR SE O PACIENTE FOI INFORMADO
    if (!man.cod_pac) return res.status(400).send({ error: MSG02 });

    // VALIDAÇÕES TRIAGEM
    // INSERIR TRIAGEM
    const resultado_triagem = await insereTriagem(man.triagem);
    if (!resultado_triagem) return res.status(400).send({ error: MSG01 });

    // VERIFICAR PONTUAÇÃO DA TRIAGEM
    // SE PONTUAÇÃO <= 11, INSERE AVALIAÇÃO GLOBAL
    let result_man = "NUTRIDO";
    let resultado_total = 0;
    let resultado_avglobal = 0;
    if (resultado_triagem <= 11) {
      resultado_avglobal = await insereAvGlobal(man.av_global);
      // VERIFICAR PONTUAÇÃO DA AVALIAÇÃO GLOBAL
      // SE PONTUAÇÃO >= 17 AND PONTUAÇÃO <= 23.5 ENTÃO RISCO DE DESNUTRIÇÃO, CASO PONTUAÇÃO < 17 ENTÃO DESNUTRIDO, CASO CONTRARIO NUTRIDO
      if (!resultado_avglobal) return res.status(400).send({ error: MSG01 });
      
      resultado_total = resultado_triagem + resultado_avglobal;
      if (resultado_total >= 17 && resultado_total <= 23.5)
        result_man = "RISCO DE DESNUTRIÇÃO";
      if (resultado_total < 17) result_man = "DESNUTRIDO";
    }

    // INSERE MAN COM O RESULTADO
    const cod_pac = man.cod_pac;

    let cod_av_global = await app
      .db("avaliacao_global")
      .max("codigo")
      .first();
    cod_av_global = cod_av_global.max;

    let cod_triagem = await app
      .db("triagem")
      .max("codigo")
      .first();
    cod_triagem = cod_triagem.max;

    app
      .db("man")
      .insert({
        resultado_total,
        resultado_triagem,
        resultado_avglobal,
        cod_pac,
        cod_av_global,
        cod_triagem
      })
      .then(_ => res.status(200).send({ resultado: result_man }))
      .catch(err => res.status(500).send(err));
  };

  return { save };
};
