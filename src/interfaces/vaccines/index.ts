export interface IVaccine {
  id: string;
  name: string;
  class: string;
  description: string;
}

export interface IVaccinesAplications {
  id: string[];
  date: string;
  vaccine: IVaccine[];
}
