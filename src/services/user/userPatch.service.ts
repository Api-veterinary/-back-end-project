import AppDataSource from "../../data-source";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { AppError } from "../../errors/error";
import { IDoctorUpdate } from "../../interfaces/doctor.interface";
import { doctorUpdateSchema } from "../../schemas/doctors/doctors.schemas";

const updateUserService = async (body: IDoctorUpdate, userID: string) => {
  const userRepo = AppDataSource.getRepository(Doctors);
  const addressRepo = AppDataSource.getRepository(Address);

  if (Object.keys(body).includes("address")) {
    const address = await addressRepo.findOneBy({ id: body.address.id });

    if (address === null) {
      throw new AppError("Imposible to update user addres without address id");
    }

    addressRepo.save({ ...body.address });

    delete body.address;
  }

  await userRepo.save({ id: userID, ...body });

  const userToReturn = await userRepo.findOne({
    where: { id: userID },
    relations: { address: true },
  });

  const doctorWithoutPassord = await doctorUpdateSchema.validate(userToReturn, {
    stripUnknown: true,
  });

  return doctorWithoutPassord;
};

export default updateUserService;
