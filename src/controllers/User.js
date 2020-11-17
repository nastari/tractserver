import User from '../models/User';
import Company from '../models/Company';

export const store = async (req, res) => {
  const { company_id } = req.query;

  const { name, job } = req.body;

  if (!company_id) {
    return res.status(400).json({ message: 'Nenhuma companhia vinculada.' });
  }

  const user = new User({ name, job, company: company_id });

  Company.findByIdAndUpdate(
    company_id,
    { $push: { collaborators: user._id } },
    { new: true, useFindAndModify: true, upsert: true },
    (e) => {
      if (e) {
        return res
          .status(400)
          .json({ Erro: `Falha ao cadastrar usuário: ${e}` });
      }

      return user.save();
    }
  );
  return res.status(200).json('Usuário cadastrado com sucesso.');
};

export const update = async (req, res) => {
  const { user_id } = req.query;
  const { name, job } = req.body;

  // validações

  // update

  return User.findByIdAndUpdate(
    user_id,
    {
      name,
      job,
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

export const index = async (req, res) => {
  const { company_id } = req.query;

  if (!company_id) {
    return res.status(400).json({ Erro: 'Companhia não vinculada' });
  }

  return User.find({ company_id: company_id }, async (e, data) => {
    if (e) {
      return res
        .status(400)
        .json({ message: `Falha ao encontrar colaboradores: ${e}` });
    }
    return res.status(200).json(data);
  });
};
