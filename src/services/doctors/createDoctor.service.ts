import AppDataSource from "../../data-source";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { IDoctorRequest } from "../../interfaces/doctors";
import { doctorWithoutPasswordSchema } from "../../schemas/doctors.schemas";

const createDoctorService = async (doctorData: IDoctorRequest) => {
  const doctorRepository = AppDataSource.getRepository(Doctors);

  const addressRepository = AppDataSource.getRepository(Address);

  const address = addressRepository.create(doctorData.address);

  await addressRepository.save(address);

  const doctor = doctorRepository.create(doctorData);

  const newDoctor = await doctorRepository.save({
    ...doctor,
    address: address,
  });

  const doctorWithoutPassord = await doctorWithoutPasswordSchema.validate(
    newDoctor,
    {
      stripUnknown: true,
    }
  );

  return doctorWithoutPassord;
};

export default createDoctorService;
