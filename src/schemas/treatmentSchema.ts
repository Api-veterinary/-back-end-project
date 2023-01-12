import * as yup from "yup";

export const createTreatmentSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  doctor_id: yup.string().required(),
  medicines: yup.array(yup.string()).required(),
  procedures: yup.array(
    yup
      .object()
      .shape({
        date: yup.string().required(),
        hour: yup.string().required(),
        name: yup.string(),
        type: yup.string(),
        description: yup.string(),
      })
      .required()
  ),
});
