import * as Yup from 'yup';

export const store = (data) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    // startup: Yup.date().required(),
    description: Yup.string().required(),
    userOwner: Yup.string().required(),
    status: Yup.string().required(),
  });

  return schema.isValid(data);
};

export const a = 'a';
