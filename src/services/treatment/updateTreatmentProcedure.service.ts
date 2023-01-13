import AppDataSource from "../../data-source";
import { ProcedureSchedule } from "../../entities/procedure_schedule/procedure_schedule.entity";

const updatetreatmentProcedureService = async (procedureId: string, data) => {
  const proceduresScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);
  const findScheduleProcedure = await proceduresScheduleRepository.findOneBy({
    id: procedureId,
  });

  await proceduresScheduleRepository.update({ id: procedureId }, { ...data });
  const updatedProcedure = Object.assign(findScheduleProcedure, data);

  return updatedProcedure;
};

export default updatetreatmentProcedureService;
