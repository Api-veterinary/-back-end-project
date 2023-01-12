import AppDataSource from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";

const updateConsultsService = async (data, id: string) => {
  const consultsRepository = AppDataSource.getRepository(Consults);

  const findConsult = await consultsRepository.findOneBy({
    id: id,
  });

  await consultsRepository.update({ id: id }, data);
  const updatedConsults = Object.assign(findConsult, data);

  return updatedConsults;
};
export default updateConsultsService;
