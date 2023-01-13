import AppDataSource from "../../data-source";
import { Users } from "../../entities/users/users.entity";

const deleteUserService = async (userID: string) => {
  const usersRepo = AppDataSource.getRepository(Users);

  await usersRepo
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: userID })
    .execute();
};

export default deleteUserService;
