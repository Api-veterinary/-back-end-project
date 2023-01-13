import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserUpdate } from "../../interfaces/users.Interface";
import { addressSchema } from "../address/addres.schema";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required().max(70),
  email: yup.string().email().required().max(70),
  password: yup.string().required().max(120),
  address: addressSchema,
});

export const userWithoutPasswordSchema = yup.object().shape({
  address: addressSchema,
  updatedAt: yup.date().notRequired(),
  createdAt: yup.date().notRequired(),
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export const userUpdateSchema = yup.object().shape({
  addres: yup
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
  id: yup.string().notRequired(),
});