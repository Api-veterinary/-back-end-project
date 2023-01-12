import AppDataSource from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { Procedure } from "../../entities/procedure/procedure.entity";
import { ProcedureSchedule } from "../../entities/procedure_schedule/procedure_schedule.entity";
import { Treatment } from "../../entities/treatment/treatment.entity";
import AppError from "../../errors/appError";
import { ITewatmentRequest } from "../../interfaces/Procedure_Schedule";

const createTreatmentService = async (data) => {
  const treatmentRepository = AppDataSource.getRepository(Treatment);
  const proceduresRepository = AppDataSource.getRepository(Procedure);
  const proceduresScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const doctorRepository = AppDataSource.getRepository(Doctors);

  const doctor = await doctorRepository.findOneBy({ id: data.doctor_id });

  if (!doctor) {
    throw new AppError("Doctor not found!", 404);
  }

  const createdProcedures = await Promise.all(
    data.procedures.map(async (index) => {
      const createProcedure = proceduresRepository.create(index);
      const newProcedure = await proceduresRepository.save(createProcedure);

      return newProcedure;
    })
  );

  const medicines = await Promise.all(
    data.medicines.map(async (medicineId: string) => {
      const findMedicine = await medicineRepository.findOneBy({
        id: medicineId,
      });
      if (!findMedicine) {
        throw new AppError("Medicine not found!", 404);
      }

      return findMedicine;
    })
  );

  const createTreatment = treatmentRepository.create({
    ...data,
    medicines: medicines,
  });

  const newTreatment = await treatmentRepository.save(createTreatment);

  const createProcedureSchedule = await Promise.all(
    createdProcedures.map(async (index) => {
      const procedureSchedule = await Promise.all(
        data.procedures.map(async (procedure) => {
          const createProcedure = proceduresScheduleRepository.create({
            ...procedure,
            doctor: doctor,
            procedure: index,
            treatment: newTreatment,
          });
          const res = await proceduresScheduleRepository.save(createProcedure);

          return res;
        })
      );
      return procedureSchedule;
    })
  );

  const findProcedureSchedule = await proceduresScheduleRepository.find({
    where: { treatment: newTreatment },
    relations: { doctor: true, treatment: true, procedure: true },
  });

  const res = { ...newTreatment, procedures: findProcedureSchedule };

  return res;
};

export default createTreatmentService;
