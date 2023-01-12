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
