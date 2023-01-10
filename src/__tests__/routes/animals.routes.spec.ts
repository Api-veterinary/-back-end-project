import { DataSource, Repository, TableForeignKey } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import request from "supertest";
import { Users } from "../../entities/users/users.entity";
import { mockedUserRequest, mockedUserResponse } from "../mocks/user.mocks";

describe("Testing animals routes", () => {
  let connection: DataSource;
  const baseUrl: string = "/animals";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be to create a user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserRequest);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("weight");
    expect(response.body).toHaveProperty("size");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("owner_id");
    expect(response.body.name).toEqual(mockedUserRequest.name);
    expect(response.body.email).toEqual(mockedUserRequest.email);
    expect(response.status).toBe(201);
  });
});
