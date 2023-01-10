export interface IDoctorRequest {
  name: string;
  email: string;
  password: string;
  crmv: string;
  address: object;
}

export interface IDoctorResponse {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: object;
  crmv: string;
}
