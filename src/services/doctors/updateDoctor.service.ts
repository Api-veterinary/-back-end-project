import AppDataSource from "../../data-source";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { IDoctorUpdate } from "../../interfaces/doctor.interface";
import {
  doctorUpdateSchema,
  doctorWithoutPasswordSchema,
} from "../../schemas/doctors.schemas";

const updateDoctorService = async (body: IDoctorUpdate, doctorID: string) => {
  const doctorRepo = AppDataSource.getRepository(Doctors);
  const addressRepo = AppDataSource.getRepository(Address);

  if (Object.keys(body).includes("address")) {
    const address = await addressRepo.findOneBy({ id: body.address.id });

    addressRepo.save({ ...body.address });

    delete body.address;
  }

  await doctorRepo.save({ id: doctorID, ...body });

  const userToreturn = await doctorRepo.findOne({
    where: { id: doctorID },
    relations: { address: true },
  });

  const doctorWithoutPassord = await doctorUpdateSchema.validate(userToreturn, {
    stripUnknown: true,
  });

  return doctorWithoutPassord;
};

export default updateDoctorService;
