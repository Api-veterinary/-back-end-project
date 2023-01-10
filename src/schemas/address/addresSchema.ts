import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest } from "../../interfaces/address.interface";

export const addressSchema: SchemaOf<IAddressRequest> = yup.object().shape({
  city: yup.string().required(),
  district: yup.string().required(),
  state: yup.string().required(),
  number: yup.string().required(),
  zipCode: yup.string().required(),
});
