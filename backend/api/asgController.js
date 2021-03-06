const MSG01 = "Dados obrigatórios em branco,favor conferir";
const MSG02 = "Informe o paciente";

module.exports = app => {
  const save = async (req, res) => {
    const asg = {
      cod_pac: req.body.cod_pac,
      resultado: req.body.resultado,
      peso: {
        peso_anterior: req.body.peso.peso_anterior,
        peso_atual: req.body.peso.peso_atual,
        perda_peso: req.body.peso.perda_peso,
        mudanca_peso: req.body.peso.mudanca_peso
      },
      ingestao_alimentar: {
        mudanca: req.body.ingestao_alimentar.mudanca,
        tempo_mudanca: req.body.ingestao_alimentar.tempo_mudanca,
        tipo_dieta: req.body.ingestao_alimentar.tipo_dieta
      },
      sint_gastroint: {
        sintoma: req.body.sint_gastroint.sintoma,
        frequencia: req.body.sint_gastroint.frequencia,
        duracao: req.body.sint_gastroint.duracao
      },
      capac_func: {        
        alteracao: req.body.capac_func.alteracao,        
        duracao: req.body.capac_func.duracao
      },
      doenc_comorb: {
        diag_principal: req.body.doenc_comorb.diag_principal,
        comorbidades: req.body.doenc_comorb.comorbidades,
        requerimento: req.body.doenc_comorb.requerimento,
        stress_metabol: req.body.doenc_comorb.stress_metabol
      },
      exame_fisico: {
        red_gord_subcut: req.body.exame_fisico.red_gord_subcut,
        perda_muscular: req.body.exame_fisico.perda_muscular,
        edema: req.body.exame_fisico.edema
      }
    };

    const insereP = p => {
      if (
        p.peso_anterior == "" ||
        p.peso_atual == "" ||
        p.perda_peso == "" ||
        p.mudanca_peso == ""
      )
        return false;

      const { peso_anterior, peso_atual, perda_peso, mudanca_peso } = p;

      app
        .db("peso")
        .insert({ peso_anterior, peso_atual, perda_peso, mudanca_peso });

      return true;
    };

    const insereIA = IA => {
      if (        
        IA.mudanca == "" ||
        IA.tempo_mudanca == "" ||
        IA.tipo_dieta == ""
      )
        return false;

      const { mudanca, tempo_mudanca, tipo_dieta } = IA;

      app
        .db("ingestao_alimentar")
        .insert({ mudanca, tempo_mudanca, tipo_dieta });

      return true;
    };

    const insereSG = SG => {
      if (
        SG.sintoma == "" ||
        SG.frequencia == "" ||
        SG.duracao === ""
      )
        return false;

      const { sintoma, frequencia, duracao } = SG;

      app
        .db("sintomas_gastroint")
        .insert({ sintoma, frequencia, duracao});

      return true;
    };

    const insereCF = CF => {
      if (        
        CF.alteracao == "" ||        
        CF.duracao === ""
      )
        return false;

      const { alteracao, duracao } = CF;

      app
        .db("cap_funcional")
        .insert({  alteracao, duracao });

      return true;
    };

    const insereDC = DC => {
      if (
        DC.diag_principal == "" ||
        DC.requerimento == "" ||
        DC.comorbidades == "" ||
        DC.stress_metabol == ""
      )
        return false;

      const { diag_principal, requerimento, comorbidades, stress_metabol } = DC;

      app
        .db("doencas_comorbidades")
        .insert({ diag_principal, requerimento, comorbidades, stress_metabol });

      return true;
    };

    const insereEF = EF => {
      if (
        EF.red_gord_subcut == "" ||
        EF.perda_muscular == "" ||
        EF.edema == ""
      )
        return false;

      const { red_gord_subcut, perda_muscular, edema } = EF;

      app
        .db("exame_fisico")
        .insert({ red_gord_subcut, perda_muscular, edema });

      return true;
    };

    try {
      if (!asg.cod_pac) return res.status(400).send({ error: MSG02 });
      if (!asg.resultado) return res.status(400).send({ error: MSG01 });

      if (
        insereP(asg.peso) &&
        insereIA(asg.ingestao_alimentar) &&
        insereSG(asg.sint_gastroint) &&
        insereCF(asg.capac_func) &&
        insereDC(asg.doenc_comorb) &&
        insereEF(asg.exame_fisico)
      ) {
        let resultado = asg.resultado;
        let cod_pac = asg.cod_pac;

        let cod_peso = await app
          .db("peso")
          .max("codigo")
          .first();
        cod_peso = cod_peso.max;

        let cod_ia = await app
          .db("ingestao_alimentar")
          .max("codigo")
          .first();
        cod_ia = cod_ia.max;

        let cod_sg = await app
          .db("sintomas_gastroint")
          .max("codigo")
          .first();
        cod_sg = cod_sg.max;

        let cod_cf = await app
          .db("cap_funcional")
          .max("codigo")
          .first();
        cod_cf = cod_cf.max;

        let cod_ef = await app
          .db("exame_fisico")
          .max("codigo")
          .first();
        cod_ef = cod_ef.max;

        let cod_dc = await app
          .db("doencas_comorbidades")
          .max("codigo")
          .first();
        cod_dc = cod_dc.max;

        app
          .db("asg")
          .insert({
            resultado,
            cod_pac,
            cod_peso,
            cod_ia,
            cod_sg,
            cod_cf,
            cod_ef,
            cod_dc
          })
          .then(_ => res.status(200).send({ resultado }))
          .catch(err => res.status(500).send(err));
      } else return res.status(400).send({ error: MSG01 });
    } catch (err) {
      console.log(err);
    }
  };

  return { save };
};
