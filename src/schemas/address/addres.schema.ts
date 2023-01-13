import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest } from "../../interfaces/address.interface";

export const addressSchema: SchemaOf<IAddressRequest> = yup.object().shape({
  zipCode: yup.string().required(),
  complement: yup.string().required(),
  state: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  number: yup.string().required(),
  street: yup.string().required(),
});
