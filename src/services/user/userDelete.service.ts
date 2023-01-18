import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users/users.entity";

export const deleteUserService = async (userID: string) => {
  const usersRepo = AppDataSource.getRepository(Users);

  console.log(userID);

  const res = await usersRepo
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: userID })
    .execute();
  console.log(res);
};
