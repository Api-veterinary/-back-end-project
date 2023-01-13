import AppDataSource from "../../data-source";
import { Address } from "../../entities/address/address.entity";

import { Users } from "../../entities/users/users.entity";
import AppError from "../../errors/appError";

import { IUserUpdate } from "../../interfaces/users.Interface";

import { userUpdateSchema } from "../../schemas/users/users.schema";

const updateUserService = async (body: IUserUpdate, userID: string) => {
  const userRepo = AppDataSource.getRepository(Users);
  const addressRepo = AppDataSource.getRepository(Address);

  let address = {};

  if (Object.keys(body).includes("address")) {
    console.log("oi");
    if (!body.address.id) {
      throw new AppError("Imposible to update user address without address id");
    }
    const addressFind = await addressRepo.findOneBy({ id: body.address.id });

    console.log(addressFind);

    address = await addressRepo.save({ ...addressFind, ...body.address });

    delete body.address;
  }

  if (Object.keys(body).includes("email")) {
    const user = await userRepo.findOneBy({ email: body.email });
    if (user.id !== userID) {
      throw new AppError("email already on use", 409);
    }

    if (Object.keys(body).includes("password")) {
      if (user.id !== userID) {
        throw new AppError(
          "You don't own this user, can't change password",
          400
        );
      }
    }
  }
  await userRepo.save({ id: userID, ...body });

  const userToReturn = await userRepo.findOne({
    where: { id: userID },
    relations: { address: true },
  });

  const userWithoutPassord = await userUpdateSchema.validate(userToReturn, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};

export default updateUserService;
