import { Users } from "../../entities/users/users.entity";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { userWithoutPasswordSchema } from "../../schemas/usersSchema";
import { IUserRequest } from "../../interfaces/users.Interface";

export const userCreateService = async (userData: IUserRequest) => {
    const userRepository = AppDataSource.getRepository(Users);

  if (userData.email in userRepository) {
    throw new AppError("User, already registered", 409)
  }

  const createdUser = userRepository.create(userData);
  await userRepository.save(createdUser);

  const userWithoutPassord = await userWithoutPasswordSchema.validate(
    createdUser,
    {
      stripUnknown: true,
    }
  );
  return userWithoutPassord;
};
