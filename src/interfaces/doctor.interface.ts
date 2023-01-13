import { IAddressRequest, IAddressUpdate } from "./address.interface";

export interface IDoctorRequest {
  name: string;
  email: string;
  password: string;
  crmv: number;
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
  name?: string;
  email?: string;
  address?: IAddressUpdate;
  crmv?: number;
}
