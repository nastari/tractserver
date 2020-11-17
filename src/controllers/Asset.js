import Asset from '../models/Asset';
import Unit from '../models/Unit';
import * as AssetValidation from '../validations/asset';

export const store = async (req, res) => {
  const { company_id, unit_id } = req.body;

  if (!company_id || !unit_id) {
    return res.status(400).json({ Erro: 'Companhia ou Unidade não inserido.' });
  }

  // validacao 1

  const isValid = await AssetValidation.store(req.body);

  if (!isValid) {
    return res.status(400).json({ Erro: 'Dados inválidos' });
  }

  // validacao 2

  // store
  const { name, description, avatar_url, owner_id, status } = req.body;

  const asset = new Asset({
    name,
    description,
    avatar_url,
    owner_id,
    status,
    healthscore: Math.floor(Math.random() * 101),
    unit_id,
    company_id,
  });

  await asset.save().then(() => {
    Unit.findOneAndUpdate(
      { _id: unit_id },
      {
        $inc: { countAssets: 1 },
      }
    ).then(() => {});
  });

  return res.status(200).json({ Mensagem: 'Ativo cadastrado com sucesso.' });
};

//

export const update = async (req, res) => {
  const { asset_id } = req.query;

  // validações

  // update
  const { name, description, owner_id, status, avatar_url } = req.body;

  return Asset.findByIdAndUpdate(
    asset_id,
    {
      name,
      avatar_url,
      description,
      owner_id,
      status,
    },
    { new: true, useFindAndModify: true },
    async (e, data) => {
      if (e) {
        return res
          .status(400)
          .json({ Erro: `Falha ao atualizar ativo: ${e}.` });
      }
      return res.status(200).json(data);
    }
  );
};

export const delet = async (req, res) => {
  const { asset_id } = req.query;

  if (!asset_id) {
    return res.status(400).json('Identificador de ativo ausente.');
  }

  return Asset.findByIdAndRemove(asset_id, (e) => {
    if (e) {
      return res.status(400).json({ Erro: `Falha ao excluir ativo: ${e}.` });
    }
    return res.status(200).json({ Mensagem: 'Ativo excluído com sucesso.' });
  });
};

export const index = async (req, res) => {
  const { company_id, unit_id, status, healthscore } = req.query;

  if (!company_id && !unit_id) {
    return res.status(400).json('Forneça um identificador.');
  }

  // validar se é objectId é valido

  // query

  const query = {};

  if (company_id) {
    query.company_id = company_id;
  } else {
    query.unit_id = unit_id;
  }

  if (status) {
    query.status = status;
  }

  if (healthscore) {
    if (healthscore === 'STABLE') {
      query.healthscore = { $gt: 80 };
    }
    if (healthscore === 'ALERT') {
      query.healthscore = { $gt: 60, $lt: 79 };
    }
    if (healthscore === 'CRITIC') {
      query.healthscore = { $gt: 0, $lt: 59 };
    }
  }

  if (company_id) {
    Asset.find(query).then((data, e) => {
      if (e) {
        return res.status(400).json({ Erro: e });
      }

      return res.json(data);
    });
  }

  if (unit_id) {
    Asset.find(query).then((data, e) => {
      if (e) {
        return res.status(400).json({ Erro: e });
      }

      return res.json(data);
    });
  }
};

//

export const readOne = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ Erro: 'Identificador ausente.' });
  }
  // verify valid objectId

  Asset.find({ _id: id }).then((data, e) => {
    if (e) {
      return res.status(400).json({ Erro: e });
    }

    return res.json(data);
  });
};
