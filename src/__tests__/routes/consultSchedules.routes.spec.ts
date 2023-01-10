import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import request from "supertest";
import { mockedUserRequest } from "../mocks/user.mocks";
import { mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedAnimalRequest } from "../mocks/animal.mocks";
import { mockedConsult } from "../mocks/consults.mocks";
import { mockedMedicine } from "../mocks/medice.mocks";
import { animal_type } from "../mocks/animal_type.mocks";

describe("Testing consults routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/consults";
  let owner = null;
  let doctor = null;
  let animal = null;
  let vaccine = null;
  let type = null;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    doctor = await request(app).post("/doctors").send(mockedDoctorRequest);
    owner = await request(app).post("/users").send(mockedUserRequest);
    vaccine = await request(app).post("/medicine").send(mockedMedicine);
    type = await request(app).post("/animal_types").send(animal_type);
    animal = await request(app)
      .post("/animals")
      .send({
        ...mockedAnimalRequest,
        vaccines: [vaccine.body.id],
        type: type.body.id,
        owner_id: owner.body.id,
      });
    await request(app).post("/animals").send(mockedAnimalRequest);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to schedule a consult", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send({
        ...mockedConsult,
        doctor_id: doctor.body.id,
        animal_id: animal.body.id,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("animal");
    expect(response.body).toHaveProperty("doctor");
    expect(response.body).toHaveProperty("treatment");
    expect(response.body).toHaveProperty("owner_id");

    expect(response.body.treatment).toHaveProperty("medicines");
    expect(response.body.name).toEqual(mockedUserRequest.name);
    expect(response.body.email).toEqual(mockedUserRequest.email);
    expect(response.status).toBe(201);
  });

  test("Should not be able to register a consult without animal", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send({
        ...mockedConsult,
        doctor_id: doctor.body.id,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("animal");
    expect(response.body).toHaveProperty("doctor");
    expect(response.body).toHaveProperty("treatment");
    expect(response.body).toHaveProperty("owner_id");

    expect(response.body.treatment).toHaveProperty("medicines");
    expect(response.body.name).toEqual(mockedUserRequest.name);
    expect(response.body.email).toEqual(mockedUserRequest.email);
    expect(response.status).toBe(201);
  });

  test("Should not be able to register a consult without doctor", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send({
        ...mockedConsult,
        animal_id: animal.body.id,
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("animal");
    expect(response.body).toHaveProperty("doctor");
    expect(response.body).toHaveProperty("treatment");
    expect(response.body).toHaveProperty("owner_id");

    expect(response.body.treatment).toHaveProperty("medicines");
    expect(response.body.name).toEqual(mockedUserRequest.name);
    expect(response.body.email).toEqual(mockedUserRequest.email);
    expect(response.status).toBe(201);
  });
});
