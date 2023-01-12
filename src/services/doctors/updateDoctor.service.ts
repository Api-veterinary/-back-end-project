import AppDataSource from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { IDoctorUpdate } from "../../interfaces/doctor.interface";
import { doctorWithoutPasswordSchema } from "../../schemas/doctors.schemas";

const updateDoctorService = async (body: IDoctorUpdate, doctorID: string) => {
  const doctorRepo = AppDataSource.getRepository(Doctors);

  const userToUpdate = await doctorRepo.findOne({
    where: { id: "doctorID" },
    relations: { address: true },
  });

  const updateDoctor = doctorRepo.create({
    ...userToUpdate,
    ...body,
    ...body.address
  });

  await doctorRepo.save(updateDoctor);

  const doctorWithoutPassord = await doctorWithoutPasswordSchema.validate(
    updateDoctor,
    {
      stripUnknown: true,
    }
  );

  return doctorWithoutPassord;
};

export default updateDoctorService;