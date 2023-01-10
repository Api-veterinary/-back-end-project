import AppDataSource from "../../data-source";
import { Procedure } from "../../entities/procedure/procedure.entity";

export const createProcedureService = async (data) : Promise<Procedure[]> => {
  const procedureRepository = AppDataSource.getRepository(Procedure);

  const newProcedure = procedureRepository.create(data);

  await procedureRepository.save(newProcedure);

  return newProcedure
};
