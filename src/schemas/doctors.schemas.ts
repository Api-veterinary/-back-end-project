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
      street: yup.string().required(),
      complement: yup.string().required(),
    }),
});

export const doctorWithoutPasswordSchema = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  crmv: yup.number().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  delete_date: yup.string().nullable(),
  address: yup
    .object()
    .notRequired()
    .shape({
      id: yup.string(),
      district: yup.string(),
      zipCode: yup.string().max(8),
      number: yup.string().notRequired(),
      city: yup.string(),
      state: yup.string().max(2),
      street: yup.string().required(),
      complement: yup.string().required(),
    }),
});

export const doctorUpdateSchema = yup.object().shape({
  address: yup
    .object()
    .notRequired()
    .shape({
      zipCode: yup.string().max(8),
      complement: yup.string(),
      number: yup.string().notRequired(),
      street: yup.string(),
      district: yup.string(),
      city: yup.string(),
      state: yup.string().max(2),
      id: yup.string(),
    }),
  delete_date: yup.string().nullable(),
  updatedAt: yup.date().notRequired(),
  createdAt: yup.date().notRequired(),
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  crmv: yup.number().notRequired(),
  id: yup.string().notRequired(),
});
