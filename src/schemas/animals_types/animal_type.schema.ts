import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAnimals_TypesRequest } from "../../interfaces/animals_types.interface";

export const animals_TypeSchema: SchemaOf<IAnimals_TypesRequest>  = yup.object().shape({ 
    type: yup.string().required(),
})