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
  crmmv: number;
  address: IAddressRequest;
}
