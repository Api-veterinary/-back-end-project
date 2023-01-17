import { AppDataSource } from "../../data-source";
import { Treatment } from "../../entities/treatment/treatment.entity";
import { AppError } from "../../errors/appError";

export const deleteTreatmentService = async (
  treatmentId: string
): Promise<void> => {
  const treatmentRepository = AppDataSource.getRepository(Treatment);

  const findTreatment = await treatmentRepository.findOneBy({
    id: treatmentId,
  });

  if (!findTreatment) {
    throw new AppError("Treatment not found!", 404);
  }
  await treatmentRepository.remove(findTreatment);
};
