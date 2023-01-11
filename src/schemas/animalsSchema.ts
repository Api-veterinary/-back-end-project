import * as yup from "yup";
import { SchemaOf } from "yup";

export const animalsSchema = yup.object().shape({ 
    owner_id: yup.string().required(),
    name: yup.string().required(), 
    birth_date: yup.date().required(), 
    type: yup.string().required(), 
    breed: yup.string().required(), 
    weight: yup.string().required(), 
    size: yup.string().required(), 
    vaccines: yup.string().required(),
})


export const animalsWithoutPasswordSchema = yup.object().shape({
    id: yup.string().required(), 
    owner_id: yup.string().required(),
    name: yup.string().required(), 
    birth_date: yup.date().required(), 
    type: yup.string().required(), 
    breed: yup.string().required(), 
    weight: yup.string().required(), 
    size: yup.string().required(), 
    vaccines: yup.string().required(),
    last_visit: yup.date().required()
  });