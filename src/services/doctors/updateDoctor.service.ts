import AppDataSource from "../../data-source";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import AppError from "../../errors/appError";
import { IDoctorUpdate } from "../../interfaces/doctor.interface";
import { doctorUpdateSchema } from "../../schemas/doctors/doctors.schemas";

const updateDoctorService = async (body: IDoctorUpdate, doctorID: string) => {
  const doctorRepo = AppDataSource.getRepository(Doctors);
  const addressRepo = AppDataSource.getRepository(Address);
  let address = {};

  if (Object.keys(body).includes("address")) {
    if (!body.address.id) {
      throw new AppError("Imposible to update user addres without address id");
    }
    const addressFind = await addressRepo.findOneBy({ id: body.address.id });

    address = await addressRepo.save({ ...addressFind, ...body.address });

    delete body.address;
  }

  if (Object.keys(body).includes("email")) {
    const doctor = await doctorRepo.findOneBy({ email: body.email });
    if (doctor.id !== doctorID) {
      throw new AppError("email already on use", 409);
    }

    if (Object.keys(body).includes("password")) {
      if (doctor.id !== doctorID) {
        throw new AppError(
          "You don't own this user, can't change password",
          400
        );
      }
    }
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
