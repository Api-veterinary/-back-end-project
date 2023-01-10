import { Request, Response } from "express";
import { userCreateService } from "../../services/user/userCreate.service";
import { IUserRequest } from "../../interfaces/users.Interface";
import { doctorCreateService } from "../../services/doctor/doctorCreate.service";

export const doctorCreateController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;

  const newUser = await doctorCreateService(userData);

  return res.status(201).json(newUser);
};
