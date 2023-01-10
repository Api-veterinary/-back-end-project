import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { doctorWithoutPasswordSchema } from "../../schemas/usersSchema";
import { IUserRequest } from "../../interfaces/users.Interface";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";

export const doctorCreateService = async (userData: IUserRequest) => {
  const doctorRepository = AppDataSource.getRepository(Doctors);
  const addressRepository = AppDataSource.getRepository(Address);

  if (userData.email in doctorRepository) {
    throw new AppError("Doctor, already registered", 409);
  }

  const newAddress = addressRepository.create(userData.address);
  const address = await addressRepository.save(newAddress);

  const user = await doctorRepository.save({ ...userData, address: address });
  console.log(user);

  const userWithoutPassord = await doctorWithoutPasswordSchema.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};
