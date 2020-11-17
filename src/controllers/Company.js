import mongoose from 'mongoose';
import Company from '../models/Company';
import User from '../models/User';

export const store = async (req, res) => {
  const id = mongoose.Types.ObjectId();

  const { nameCompany, nameCollaborator } = req.body;

  const company = new Company({
    name: nameCompany,
    collaborators: [id],
  });

  const user = new User({
    _id: id,
    name: nameCollaborator,
    company_id: company._id,
    admin: true,
  });

  await company
    .save()
    .then((data) => {
      user.save();
      return res.status(200).json(data);
    })
    .catch((e) =>
      res.status(400).json({ Erro: `Falha ao criar Companhia.${e}` })
    );
};

export const update = async (req, res) => {
  const { company_id } = req.query;

  const { name } = req.body;

  // validations

  // update

  return Company.findByIdAndUpdate(
    company_id,
    {
      name,
    },
    { new: true, useFindAndModify: true },
    async (e, data) => {
      if (e) {
        return res
          .status(400)
          .json({ Erro: `Falha ao atualizar usuário: ${e}` });
      }
      return res.status(200).json(data);
    }
  );
};

export const access = async (req, res) => {
  const { company_id } = req.query;

  // id valid
  if (!company_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ auth: false });
  }

  const company = await Company.findById(company_id);

  // id dont existis in db
  if (!company) {
    return res.status(400).json({ auth: false });
  }

  // id existis in db, valid company
  return res.status(200).json(company);
};
