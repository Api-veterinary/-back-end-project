import { IAddressRequest, IAddressUpdate } from "./address.interface";

export interface IDoctorRequest {
  name: string;
  email: string;
  password: string;
  crmv: string;
  address: IAddressRequest;
}

export interface IDoctorResponse {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: object;
  crmv: string;
}

export interface IDoctorUpdate {
  email?: string;
  address?: IAddressUpdate;
  createdAt?: Date;
  updatedAt?: Date;
}
