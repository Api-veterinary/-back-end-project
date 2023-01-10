import { Request, Response } from "express";
import { userCreateService } from "../../services/user/userCreate.service";
import { IUserRequest } from "../../interfaces/users.Interface";

export const userCreateController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;

  const newUser = await userCreateService(userData);

  return res.status(201).json(newUser);
};
