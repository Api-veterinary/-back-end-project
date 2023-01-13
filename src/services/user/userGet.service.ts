import AppDataSource from "../../data-source";
import { Users } from "../../entities/users/users.entity";

const getUserService = async () => {
  const usersRepo = AppDataSource.getRepository(Users);

  const doctors = await usersRepo.find({
    relations: {
      address: true,
    },
  });

  return doctors;
};

export default getUserService;
