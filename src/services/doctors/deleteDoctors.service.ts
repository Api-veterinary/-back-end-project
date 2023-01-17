import { AppDataSource } from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";

export const deleteDoctorService = async (doctorID: string) => {
  const doctorsRepo = AppDataSource.getRepository(Doctors);

  await doctorsRepo
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: doctorID })
    .execute();
};
