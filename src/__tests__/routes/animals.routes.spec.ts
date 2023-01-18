import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import request from "supertest";
import { mockedUserLogin, mockedUserRequest } from "../mocks/user.mocks";
import { mockedAnimalRequest, mockedAnimalUpdate } from "../mocks/animal.mocks";
import { animal_type } from "../mocks/animal_type.mocks";
import { mockedMedicine } from "../mocks/medicine.mocks";
import { mockedDoctorLogin, mockedDoctorRequest } from "../mocks/doctor.mocks";

describe("Testing animals/medicine routes", () => {
  let connection: DataSource;
  const animalRoutes: string = "/animals";
  const medicineRoute: string = "/medicine";
  const typeRoute: string = "/animal_types";
  let typeID = "";
  let vaccineID = "";
  let animal_id = "";
  let doctor_token = "";
  let user_token = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/doctors").send(mockedDoctorRequest);
    await request(app).post("/users").send(mockedUserRequest);

    let docLoginRes = await request(app).post("/login").send(mockedDoctorLogin);

    let userLoginRes = await request(app).post("/login").send(mockedUserLogin);

    user_token = userLoginRes.body.token;
    doctor_token = docLoginRes.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a animal_type", async () => {
    const response = await request(app)
      .post(typeRoute)
      .set("Authorization", `Bearer ${doctor_token}`)
      .send(animal_type);

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
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(mockedMedicine);

    vaccineID = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("class");
    expect(response.body).toHaveProperty("description");
    expect(response.status).toBe(201);
  });
});
