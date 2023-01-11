import "express-async-errors";
import express from "express";
import doctorsRoutes from "./routers/doctors.routes";
import userRoutes from "./routers/user.routes";
import handleError from "./errors/handleError";
import medicineRoutes from "./routers/medicine.routes";
import consultsRoutes from "./routers/consults.routes";

const app = express();
app.use(express.json());

app.use("/doctors", doctorsRoutes);
app.use("/users", userRoutes);
app.use("/medicine", medicineRoutes);
app.use("/consults", consultsRoutes);

app.use(handleError);

export default app;
