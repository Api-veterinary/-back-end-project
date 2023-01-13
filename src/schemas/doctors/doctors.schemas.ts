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
    .object({
      zipCode: yup.string().max(8).nullable(),
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
  name: yup.string().notRequired(),
  crmv: yup.number().notRequired(),
  id: yup.string().notRequired(),
});

export const getDoctorsSchema = yup.array(doctorUpdateSchema);
