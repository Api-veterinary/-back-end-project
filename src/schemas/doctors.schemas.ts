import * as yup from "yup";

export const doctorSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  crmv: yup.number().notRequired(),
  address: yup
    .object()
    .required()
    .shape({
      district: yup.string(),
      zipCode: yup.string().max(8),
      number: yup.string().notRequired(),
      city: yup.string(),
      state: yup.string().max(2),
    }),
});

export const doctorWithoutPasswordSchema = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  crmv: yup.number().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  address: yup
    .object()
    .notRequired()
    .shape({
      district: yup.string(),
      zipCode: yup.string().max(8),
      number: yup.string().notRequired(),
      city: yup.string(),
      state: yup.string().max(2),
    }),
});
