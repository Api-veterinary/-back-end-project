import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import AppDataSource from "../data-source";
import { Doctors } from "../entities/doctors/doctors.entity";

const ensureDoctorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const doctorRepository = AppDataSource.getRepository(Doctors);

  const doctor = await doctorRepository.findOneBy({
    id: req.user.id,
  });

  if (!doctor) {
    return res.status(400).json({ message: "You are not a Doctor" });
  }
  next();
};

export default ensureDoctorMiddleware;
