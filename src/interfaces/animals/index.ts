export interface IAnimalsRequest {
  owner_id: string;
  name: string;
  birth_date: string;
  type: IAnimal_typesRequest;
  breed: string;
  weight: string;
  size: string;
  vaccines: IVaccinesRequest;
  last_visit: string;
}

export interface IVaccinesRequest {
  name: string;
  class: string;
}
export interface IAnimal_typesRequest {
  type: string;
}
