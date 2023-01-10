import "express-async-errors";
import express from "express";
import userRoutes from "./routers/user.routes";
import handleError from "./errors/handleError";
import doctorRoutes from "./routers/doctor.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use("/doctors", doctorRoutes);

export default app;
