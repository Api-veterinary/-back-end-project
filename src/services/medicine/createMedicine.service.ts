import AppDataSource from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";

export const createMedicineService = async (data): Promise<Medicine[]> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);

  const newMedicine = medicineRepository.create(data);

  await medicineRepository.save(newMedicine);

  return newMedicine;
};
