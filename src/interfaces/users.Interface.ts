export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  address: object;
}

export interface IUserResponse {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: object;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
