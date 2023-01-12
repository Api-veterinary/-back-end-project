import "express-async-errors";
import express from "express";
import doctorsRoutes from "./routers/doctors.routes";
import userRoutes from "./routers/user.routes";
import handleError from "./errors/handleError";
import { animalsRoute } from "./routers/animals.routes";
import medicineRoutes from "./routers/medicine.routes";
import consultsRoutes from "./routers/consults.routes";
import animalTypesRoutes from "./routers/animals_types.routes";
import loginRoutes from "./routers/login.routes";
import { animalSizesRoutes } from "./routers/animals_sizes.routes";

import treatmentRoutes from "./routers/treatment.routes";


const app = express();
app.use(express.json());

app.use("/doctors", doctorsRoutes);
app.use("/users", userRoutes);
app.use("/animals", animalsRoute);
app.use("/medicine", medicineRoutes);
app.use("/consults", consultsRoutes);
app.use("/animal_types", animalTypesRoutes);
app.use("/login", loginRoutes);
app.use("/animal_sizes", animalSizesRoutes);
app.use("/treatment", treatmentRoutes);


app.use(handleError);

export default app;
