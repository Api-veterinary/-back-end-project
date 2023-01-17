import { mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedUserRequest } from "../mocks/user.mocks";
import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { mockedAnimalSize } from "../mocks/animalSize.mocks";
import { mockedDoctorLogin } from "../mocks/doctor.mocks";
import { mockedUserLogin } from "../mocks/user.mocks";
import { animalsRoute } from "../../routers/animals.routes";

describe("Testing animals size", () => {
  let connection: DataSource;
  const sizeRoute: string = "/animal_sizes";
  let doctor_token = "";
  let size_id = "";
  let user_token = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/doctors").send(mockedDoctorRequest);
    await request(app).post("/users").send(mockedUserRequest);

    const docLoginRes = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const userLoginRes = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    user_token = userLoginRes.body.token;
    doctor_token = docLoginRes.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Sould be able to create a animal_size", async () => {
    const response = await request(app)
      .post(sizeRoute)
      .set("Authorization", `Bearer ${doctor_token}`)
      .send(mockedAnimalSize);

    expect(response.body).toHaveProperty("size");
    expect(response.status).toBe(201);
  });
});
