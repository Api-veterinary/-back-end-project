import { IConsult } from "../consults";
import { IMedicineUpdate } from "../medicines";
import { IProcedureScheduleTreatment } from "../procedureSchedule";

export interface ITreatmentRequest {
  name: string;
  description: string;
  doctor_id: string;
  consult_id: string;
  medicines: string[];
  procedures: object[];
}

export interface ITreatmentResponse {
  medicines: IMedicineUpdate[];
  procedures: IProcedureScheduleTreatment[];
  consults: IConsult;
  description: string;
  id: string;
  name: string;
}

export interface IUpdateTreatment {
  date: string;
  hour: string;
}
