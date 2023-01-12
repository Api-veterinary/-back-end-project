import AppDataSource from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { doctorWithoutPasswordSchema } from "../../schemas/doctors.schemas";

const getDoctorsService = async () => {
  const doctorsRepo = AppDataSource.getRepository(Doctors);

  const doctors = await doctorsRepo.find({
    relations: {
      address: true,
    },
    withDeleted: true,
  });

  return doctors;
};

export default getDoctorsService;
