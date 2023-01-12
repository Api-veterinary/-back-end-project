import AppDataSource from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { doctorWithoutPasswordSchema } from "../../schemas/doctors.schemas";

const getDoctorsService = async ()=> {
  const doctorsRepo = AppDataSource.getRepository(Doctors);

  const doctors = await doctorsRepo.find({
    withDeleted: true,
  });

  const returnedData = doctorWithoutPasswordSchema.validate(doctors, {
    stripUnknown: true,
  });

  return returnedData;
};

export default getDoctorsService;