import { FindOperator } from "typeorm";
import { Users } from "../../entities/users/users.entity";

export interface IAnimalsRequest {
  owner: string;
  name: string;
  birth_date: string;
  type: string;
  breed: string;
  weight: string;
  size: string;
  vaccines: [ICreateVaccines];
}

export interface IAnimalUpdate {
  owner?: any;
  name?: string;
  birth_date?: string;
  type?: any;
  breed?: string;
  weight?: string;
  size?: any;
  vaccines?: [ICreateVaccines];
}

interface ICreateVaccines {
  id: Array<string>;
  date: string;
}

export interface IVaccinesRequest {
  name: string;
  class: string;
}
export interface IAnimalTypesRequest {
  type: string;
}

export interface IAnimalSizeRequest {
  size: string;
}
