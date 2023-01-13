import { IAnimals_TypesRequest } from "../../interfaces/animals_types.interface";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import AppDataSource from "../../data-source";

export const animals_TypesCategoryService = async (): Promise<IAnimals_TypesRequest[]> => {
    const animals_TypesRepository = AppDataSource.getRepository(Animal_types);
  
    const types = await animals_TypesRepository.find();
  
    return types;
  };