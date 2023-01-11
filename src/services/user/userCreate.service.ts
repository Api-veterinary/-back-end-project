import { Users } from "../../entities/users/users.entity";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { userWithoutPasswordSchema } from "../../schemas/usersSchema";
import { IUserRequest } from "../../interfaces/users.Interface";
import { Address } from "../../entities/address/address.entity";

export const userCreateService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(Address);

  console.log(userData);

  const exists = await userRepository.exist({
    where: { email: userData.email },
  });

  if (exists) {
    throw new AppError("User, already registered", 409);
  }

  const newAddress = addressRepository.create(userData.address);
  const address = await addressRepository.save(newAddress);

  console.log(address);

  const user = await userRepository.save({ ...userData, address: address });

  const userWithoutPassord = await userWithoutPasswordSchema.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};
