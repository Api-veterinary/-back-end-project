export interface IProcedureScheduleRequest {
  date: string;
  hour: string;
  doctor_id: string;
  procedure_name: string;
  procedures_type: string;
  procedure_description: string;
}

export interface ITewatmentRequest {
  name: string;
  description: string;
  medicines_id: IMEdicineRequest;
  procedures_id: IProcedureScheduleRequest;
}

export interface IMEdicineRequest {
  name: string;
  class: string;
}
