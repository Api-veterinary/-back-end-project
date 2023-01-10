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

export const mockedUserResponse: IUserResponse = {
  name: "mockedName",
  email: "mockedEmail@MediaList.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "mockedState",
  },
};
