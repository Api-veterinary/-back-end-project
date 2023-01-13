import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { Consults } from "../../entities/consults/consults.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import AppError from "../../errors/appError";
import { responseGetConsultsSchema } from "../../schemas/consults/consults.schema";

const updateConsultsService = async (data, id: string) => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const animalRepository = AppDataSource.getRepository(Animals);
  const doctorRepository = AppDataSource.getRepository(Doctors);

  let req = data;

  const findConsult = await consultsRepository.findOne({
    where: { id: id },
    relations: { animal: true, doctor: true },
  });

  if (!findConsult) {
    throw new AppError("Consult not found", 404);
  }
  if (data.doctor) {
    const findDoctor = await doctorRepository.findOneBy({
      id: data.doctor,
    });

    if (!findDoctor) {
      throw new AppError("Doctor not found", 404);
    }

    req = { ...req, doctor: findDoctor };
  }

  if (data.animal) {
    const findAnimal = await animalRepository.findOneBy({
      id: data.animal,
    });

    if (!findAnimal) {
      throw new AppError("Animal not found", 404);
    }

    req = { ...req, doctor: findAnimal };
  }

  const updatedConsults = Object.assign(findConsult, req);
  const createConsult = consultsRepository.create({
    ...updatedConsults,
  });

  const newConsult = await consultsRepository.save(createConsult);

  const validatedData = await responseGetConsultsSchema.validate(newConsult, {
    stripUnknown: true,
  });
  return validatedData;
};
export default updateConsultsService;
