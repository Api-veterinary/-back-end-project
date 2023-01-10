import "express-async-errors";
import express from "express";
import doctorsRoutes from "./routers/doctors.routes";

const app = express();
app.use(express.json());

app.use("/doctors", doctorsRoutes);

export default app;
