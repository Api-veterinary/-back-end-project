import { DataSource, Repository, TableForeignKey } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import request from "supertest";
import { mockedMedicine } from "../mocks/medicine.mocks";
import { mockedDoctorLogin, mockedDoctorRequest } from "../mocks/doctor.mocks";
import { mockedUserLogin, mockedUserRequest } from "../mocks/user.mocks";

describe("Testing medicine routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/medicine";

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

  test("Should be able to create a medicine", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`)
      .send(mockedMedicine);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("class");
    expect(response.status).toBe(201);
  });

  test("Should not be able to create a medicine without doctor permission", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedMedicine);

    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("name");
    expect(response.status).toBe(400);
  });
});
