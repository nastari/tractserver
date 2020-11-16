// import mongoose from 'mongoose';
import Unit from '../models/Unit';
import Company from '../models/Company';

export const store = async (req, res) => {
  // validations

  // store
  const unit = new Unit(req.body);
  await unit.save();
  return res.status(200).json(unit);
};

export const index = async (req, res) => {
  const { company_id } = req.query;

  if (!company_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json('Identificador inválido');
  }

  const company = await Company.findById(company_id);

  if (!company) {
    return res.status(400).json('Companhia não encontrada.');
  }

  Unit.find({ company: company_id }).then((data, e) => {
    if (e) {
      return res.status(400).json({ Erro: e });
    }

    const names = data.map((unit) => {
      return {
        id: unit._id,
        name: unit.name,
      };
    });

    return res.status(200).json(names);
  });
};
