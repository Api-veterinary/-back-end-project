import AppDataSource from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";
import AppError from "../../errors/appError";

const listConsultService = async () => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const findConsults = await consultsRepository.find({
    relations: { animal: true, doctor: true },
  });
  if (!findConsults.length) {
    throw new AppError("Consults not exists", 404);
  }
  return findConsults;
};

export default listConsultService;
