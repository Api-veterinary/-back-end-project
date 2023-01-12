import AppDataSource from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { Consults } from "../../entities/consults/consults.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { Procedure } from "../../entities/procedure/procedure.entity";
import { Treatment } from "../../entities/treatment/treatment.entity";
import AppError from "../../errors/appError";
import { IConsultsRequest } from "../../interfaces/consults.interface";

const createConsultsService = async (consultsData) => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const treatmentRepository = AppDataSource.getRepository(Treatment);
  const proceduresRepository = AppDataSource.getRepository(Procedure);
  const doctorsRepository = AppDataSource.getRepository(Doctors);
  const animalRepository = AppDataSource.getRepository(Animals);

  if (
    consultsData.treatment_name ||
    consultsData.treatment_description ||
    consultsData.procedures
  ) {
    var newProcedure = await proceduresRepository
      .createQueryBuilder()
      .insert()
      .values(consultsData.procedures)
      .returning("*")
      .execute();

    const description = consultsData.treatment_description;
    const name = consultsData.treatment_name;
    const createTreatment = treatmentRepository.create({
      description: description,
      name: name,
      procedures: newProcedure.raw,
    });

    var newTreatment = await treatmentRepository.save(createTreatment);
  }

  const doctor = await doctorsRepository.findOneBy({
    id: consultsData.doctor,
  });

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const animal = await animalRepository.findOneBy({
    id: consultsData.animal,
  });

  if (!animal) {
    throw new AppError("Animal not found", 404);
  }

  const createConsults = consultsRepository.create(consultsData);

  const newConsults = await consultsRepository.save({
    ...createConsults,
    animal: animal,
    treatment: { ...newTreatment, procedures: newProcedure.raw },
    doctor: doctor,
  });

  return newConsults;
};
export default createConsultsService;
