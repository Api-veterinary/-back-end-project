import { IDoctorRequest } from "../../interfaces/doctor.interface";
import { IUserLogin, IUserResponse } from "../../interfaces/users.Interface";

export const mockedDoctorRequest: IDoctorRequest = {
  name: "mockedName",
  crmv: "65735283",
  email: "mockedDoctorEmail@MediaList.com",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "mockedState",
  },
};

export const mockedDoctorRequestCrmv: IDoctorRequest = {
  name: "mockedName",
  crmv: "65735283",
  email: "mockedDoctorEmailCrmv@MediaList.com",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "mockedState",
  },
};

export const mockedDoctorLogin: IUserLogin = {
  email: "mockedDoctorEmail@MediaList.com",
  password: "string",
};
