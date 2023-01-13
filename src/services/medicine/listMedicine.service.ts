import AppDataSource from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";

const listMedicineService = async (): Promise<Medicine[]> => {
  const medicinerRepository = AppDataSource.getRepository(Medicine);

  const medicineList = await medicinerRepository.find();

  return medicineList;
};

export default listMedicineService;
