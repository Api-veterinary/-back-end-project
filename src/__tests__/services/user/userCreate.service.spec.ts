import { userCreateService } from "../../../services/user/userCreate.service";

describe("Create an user", async () => {
  test("Should insert the information of the new user in the database", async () => {
    const email = "patrick@mail.com";
    const name = "name";
    const age = 20;

    const userData = { email, name, age };

    const newUser = await userCreateService(userData);

    expect(newUser).toEqual(
      expect.objectContaining({
        id: 1,
        email,
        name,
        age,
      })
    );
  });
});
