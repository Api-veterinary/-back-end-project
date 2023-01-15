import * as yup from "yup";

const vaccinesAplicationsSchema = yup.array(
  yup.object({
    date_aplied: yup.string(),
    vaccine: yup
      .array(
        yup.object({
          id: yup.string(),
          name: yup.string(),
          class: yup.string(),
          description: yup.string(),
        })
      )
      .nullable(),
  })
);

export const animalsSchema = yup.object().shape({
  vaccines_aplications: vaccinesAplicationsSchema.nullable(),
  last_visit: yup.date().required(),
  weigth: yup.string().nullable(),
  size: yup.object({ id: yup.string(), size: yup.string() }).nullable(),
  breed: yup.string().nullable(),
  type: yup.object({ id: yup.string(), type: yup.string() }).nullable(),
  birth_date: yup.date().nullable(),
  owner: yup
    .object({
      name: yup.string(),
      email: yup.string(),
      id: yup.string(),
    })
    .nullable(),
  name: yup.string().nullable(),
  id: yup.string().required(),
});

export const createAnimalsSchema = yup.object().shape({
  aplications: vaccinesAplicationsSchema.nullable(),
  last_visit: yup.date().required(),
  weigth: yup.string().nullable(),
  size: yup.object({ id: yup.string(), size: yup.string() }).nullable(),
  breed: yup.string().nullable(),
  type: yup.object({ id: yup.string(), type: yup.string() }).nullable(),
  birth_date: yup.date().nullable(),
  owner: yup
    .object({
      name: yup.string(),
      email: yup.string(),
      id: yup.string(),
    })
    .nullable(),
  name: yup.string().nullable(),
  id: yup.string().required(),
});

export const getAnimalsSchema = yup.array(animalsSchema);
