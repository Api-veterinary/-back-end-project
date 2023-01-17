import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import request from "supertest";
import { mockedUserRequest } from "../mocks/user.mocks";
import { mockedDoctorLogin, mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedAnimalRequest } from "../mocks/animal.mocks";
import { mockedConsult } from "../mocks/consults.mocks";

describe("Testing consults routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/consults";
  let doctor = "";
  let animal = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    const doctorData = await request(app)
      .post("/doctors")
      .send(mockedDoctorRequest);

    const animalData = await request(app).post("/animals").send({
      name: "Dog",
      birth_date: "05/05/2005",
      type: "cachorro",
      weigth: "5kg",
      size: "pequeno",
      owner: "385760d6-77f6-4776-9b79-2d255bb892ea",
      vaccines: [],
    });
    animal = animalData.body.id;
    doctor = doctorData.body.id;
    await request(app).post("/animals").send(mockedAnimalRequest);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to schedule a consult", async () => {
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send({
        ...mockedConsult,
        doctor: doctor,
        animal: animal,
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
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send({
        ...mockedConsult,
        doctor_id: doctor,
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
    let doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send({
        ...mockedConsult,
        animal_id: animal,
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
