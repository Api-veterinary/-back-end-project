import AppDataSource from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";
import AppError from "../../errors/appError";

const deleteConsultsService = async (id: string): Promise<void> => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const findConsult = await consultsRepository.findOneBy({ id: id });
  if (!findConsult) {
    throw new AppError("consult not found", 404);
  }
  consultsRepository.remove(findConsult);
};

export default deleteConsultsService;
