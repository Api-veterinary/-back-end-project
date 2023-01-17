import * as yup from "yup";
import { addressConsultsSchema, addressSchema } from "../address/addres.schema";
import { userWithoutPasswordSchema } from "../users/users.schema";

export const createConsultsSchema = yup.object().shape({
  date: yup.string().required(),
  hour: yup.string().required(),
  doctor: yup.string().required(),
  animal: yup.string().required(),
});

export const updateConsultsSchema = yup.object().shape({
  date: yup.string().notRequired(),
  hour: yup.string().notRequired(),
  doctor: yup.string().notRequired(),
  animal: yup.string().notRequired(),
});

const doctorConsultsSchema = yup
  .object()
  .shape({
    crmv: yup.number().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    id: yup.string().notRequired(),
  })
  .notRequired();

const ownerSchema = yup.object().shape({
  address: addressConsultsSchema.nullable(),
  email: yup.string().email(),
  name: yup.string(),
  id: yup.string(),
});

const animalConsultsSchema = yup.object().shape({
  owner: ownerSchema.nullable(),
  last_visit: yup.date().required(),
  weigth: yup.string().nullable(),
  birth_date: yup.date().nullable(),
  name: yup.string().nullable(),
  id: yup.string().required(),
});

const medicineSchema = yup.array(
  yup.object({
    id: yup.string().nullable(),
    name: yup.string().nullable(),
    class: yup.string().nullable(),
    description: yup.string().nullable(),
  })
);

const procedureSchema = yup.array(
  yup.object({
    procedure: yup.object({
      description: yup.string().nullable(),
      type: yup.string().nullable(),
      name: yup.string().nullable(),
      id: yup.string().nullable(),
    }),
    description: yup.string().nullable(),
    hour: yup.string().nullable(),
    date: yup.string().nullable(),
    id: yup.string().nullable(),
  })
);

const treatmentSchema = yup.object({
  medicines: medicineSchema,
  procedures: procedureSchema,
  description: yup.string().nullable(),
  name: yup.string().nullable(),
  id: yup.string().nullable(),
});

export const responseGetAllConsultsSchema = yup.array(
  yup.object().shape({
    treatment: treatmentSchema,
    animal: yup.object().shape({
      owner: userWithoutPasswordSchema.nullable(),
      last_visit: yup.date().required(),
      weigth: yup.string().nullable(),
      birth_date: yup.date().nullable(),
      name: yup.string().nullable(),
      id: yup.string().required(),
    }),
    doctor: yup
      .object()
      .shape({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        email: yup.string().email().notRequired(),
        crmv: yup.number().notRequired(),
      })
      .notRequired(),
    hour: yup.string().notRequired(),
    date: yup.string().notRequired(),
    id: yup.string().notRequired(),
  })
);

export const responseGetConsultsSchema = yup.object().shape({
  treatment: treatmentSchema,
  medicines: medicineSchema,
  doctor: doctorConsultsSchema,
  animal: animalConsultsSchema,
  hour: yup.string().notRequired(),
  date: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export const responseUpdateConsults = yup.object().shape({
  medicines: medicineSchema,
  doctor: doctorConsultsSchema,
  animal: animalConsultsSchema,
  hour: yup.string().notRequired(),
  date: yup.string().notRequired(),
  id: yup.string().notRequired(),
});
