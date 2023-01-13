import AppDataSource from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { Users } from "../../entities/users/users.entity";
import { doctorWithoutPasswordSchema } from "../../schemas/doctors/doctors.schemas";

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
