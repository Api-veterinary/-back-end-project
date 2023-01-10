import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import request from "supertest";
import { mockedUserRequest } from "../mocks/user.mocks";
import { mockedAnimalRequest, mockedAnimalUpdate } from "../mocks/animal.mocks";
import { animal_type } from "../mocks/animal_type.mocks";
import { mockedMedicine } from "../mocks/medice.mocks";
import { mockedDoctorLogin, mockedDoctorRequest } from "../mocks/doctor.mocks";

describe("Testing animals/medicine routes", () => {
  let connection: DataSource;
  const animalRoutes: string = "/animals";
  const medicineRoute: string = "/medicines";
  const typeRoute: string = "/animal_types";
  let typeID = "";
  let vaccineID = "";
  let animal_id = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/doctors").send(mockedDoctorRequest);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a animal_type", async () => {
    const response = await request(app).post(typeRoute).send(animal_type);

    typeID = response.body.id;

    expect(response.body).toHaveProperty("type");
    expect(response.status).toBe(201);
  });

  test("Should be able to create a medicine", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const response = await request(app)
      .post(medicineRoute)
      .send(mockedMedicine);

    vaccineID = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("class");
    expect(response.body).toHaveProperty("description");
    expect(response.status).toBe(201);
  });

  test("Should be able to create a animal", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const owner = await request(app).post("/animals").send(mockedUserRequest);
    const newMockAnimal = {
      ...mockedAnimalRequest,
      vaccines: [vaccineID],
      type: typeID,
      owner_id: owner.body.id,
    };
    const response = await request(app).post(animalRoutes).send(newMockAnimal);

    animal_id = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("weight");
    expect(response.body).toHaveProperty("size");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("owner_id");
    expect(response.body).toHaveProperty("vaccines");
    expect(response.body.owner_id).toEqual(owner.body.id);
    expect(response.status).toBe(201);
  });

  test("Should be able to patch a animal", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const path = "/animals/" + animal_id;
    const owner = await request(app).patch(path).send();
    const response = await request(app)
      .post(animalRoutes)

      .send(mockedAnimalUpdate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("weight");
    expect(response.body).toHaveProperty("size");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("owner_id");
    expect(response.body).toHaveProperty("vaccines");
    expect(response.body.owner_id).toEqual(owner.body.id);
    expect(response.status).toBe(201);
  });

  test("Should be able to delete a animal", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const path = "/animals/" + animal_id;
    const response = await request(app)
      .delete(path)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    expect(response.status).toBe(200);
  });

  test("Should be able to delete a animal", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const path = "/animals/" + animal_id;
    const response = await request(app)
      .delete(path)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    expect(response.status).toBe(200);
  });
});
