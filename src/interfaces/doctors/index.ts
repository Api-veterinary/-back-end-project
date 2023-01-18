export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

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
  crmv: number;
  id: string;
  address?: IAddressRequest;
}
