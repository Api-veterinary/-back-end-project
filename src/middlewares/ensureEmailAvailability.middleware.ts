import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import AppDataSource from "../data-source";
import { Doctors } from "../entities/doctors/doctors.entity";

const ensureEmailAvailabilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(Doctors);

  const userAlreadyExists = await userRepository.findOneBy({
    email: email,
  });

  if (userAlreadyExists) {
    return res
      .status(409)
      .json({ message: "This email adress is already being used" });
  }
  next();
};

export default ensureEmailAvailabilityMiddleware;
