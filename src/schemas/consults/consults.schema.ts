import * as yup from "yup";

export const createConsultsSchema = yup.object().shape({
  date: yup.string().required(),
  hour: yup.string().required(),
  doctor: yup.string().required(),
  animal: yup.string().required(),
  treatment_name: yup.string().notRequired(),
  treatment_description: yup.string().notRequired(),
  medicines: yup.array().notRequired(),
  procedures: yup.array().notRequired(),
});

export const updateConsultsSchema = yup.object().shape({
  date: yup.string().notRequired(),
  hour: yup.string().notRequired(),
});

export const responseGetConsultsSchema = yup.object().shape({
  id: yup.string().notRequired(),
  date: yup.string().notRequired(),
  hour: yup.string().notRequired(),
  doctor: yup
    .object()
    .shape({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().email().notRequired(),
      crmv: yup.number().notRequired(),
      createdAt: yup.date().notRequired(),
      updatedAt: yup.date().notRequired(),
    })
    .notRequired(),
  animal: yup.object().shape({
    last_visit: yup.date().required(),
    weigth: yup.string().nullable(),
    birth_date: yup.date().nullable(),
    name: yup.string().nullable(),
    id: yup.string().required(),
  }),
});
