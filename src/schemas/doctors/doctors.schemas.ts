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
  address: yup
    .object()
    .notRequired()
    .shape({
      zipCode: yup.string().max(8),
      state: yup.string().max(2),
      city: yup.string(),
      complement: yup.string().required(),
      district: yup.string(),
      number: yup.string().notRequired(),
      street: yup.string().required(),
      id: yup.string(),
    }),
  delete_date: yup.string().nullable(),
  updatedAt: yup.date().notRequired(),
  createdAt: yup.date().notRequired(),
  crmv: yup.number().notRequired(),
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export const doctorUpdateSchema = yup.object().shape({
  address: yup
    .object({
      zipCode: yup.string().nullable(),
      complement: yup.string().nullable(),
      number: yup.string().nullable(),
      street: yup.string().nullable(),
      district: yup.string().nullable(),
      city: yup.string().nullable(),
      state: yup.string().max(2).nullable(),
      id: yup.string().nullable(),
    })
    .nullable()
    .notRequired(),
  delete_date: yup.string().nullable(),
  updatedAt: yup.date().notRequired(),
  createdAt: yup.date().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  name: yup.string().notRequired(),
  crmv: yup.number().notRequired(),
  id: yup.string().notRequired(),
});

export const getDoctorsSchema = yup.array(doctorUpdateSchema);
