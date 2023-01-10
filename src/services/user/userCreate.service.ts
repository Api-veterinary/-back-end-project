import { Users } from "../../entities/users/users.entity";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { userWithoutPasswordSchema } from "../../schemas/usersSchema";
import { IUserRequest } from "../../interfaces/users.Interface";
import { Address } from "../../entities/address/address.entity";

export const userCreateService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(Address);

  if (userData.email in userRepository) {
    throw new AppError("User, already registered", 409);
  }

  const newAddress = addressRepository.create(userData.address);
  const address = await addressRepository.save(newAddress);

  const user = await userRepository.save({ ...userData, address: address });
  console.log(user);

  const userWithoutPassord = await userWithoutPasswordSchema.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};
