import * as Yup from 'yup';

export const store = (data) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    owner_id: Yup.string().required(),
    status: Yup.string().required(),
  });

  return schema.isValid(data);
};

export const a = 'a';
