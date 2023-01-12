import * as yup from "yup";

export const animalsSchema = yup.object().shape({
  owner: yup.string().required(),
  name: yup.string().required(),
  birth_date: yup.date().required(),
  type: yup.string().required(),
  breed: yup.string().required(),
  weight: yup.string().required(),
  size: yup.string().required(),
  vaccines: yup.string().required(),
});

export const animalsWithoutPasswordSchema = yup.object().shape({
  vaccines_aplications: yup
    .array(
      yup.object({
        date_aplied: yup.string(),
        vaccine: yup.array(
          yup.object({
            id: yup.string(),
            name: yup.string(),
            class: yup.string(),
            description: yup.string(),
          })
        ),
      })
    )
    .nullable(),
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

export const getAnimalsSchema = yup.array(animalsWithoutPasswordSchema);
