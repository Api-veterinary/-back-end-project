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
  crmv: number;
}

export interface IDoctorUpdate {
  name?: string;
  email?: string;
  address?: IAddressUpdate;
  crmv?: number;
}
