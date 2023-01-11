import { Request, Response } from "express";
import { createMedicineService } from "../../services/medicine/createMedicine.service";

export const createMedicineController = async (req: Request, res: Response) => {
  const data = req.body;
  const newProcedure = await createMedicineService(data);

  return res.status(201).json(newProcedure);
};
