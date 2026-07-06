const request = require("supertest");
const app = require("../../app.js");
const dbHandler = require("../setup/dbHandler.js");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Integration Test - Alur Registrasi dan Login User", () => {
  const newUser = {
    name: "Siti Rahma",
    email: "siti@mail.com",
    password: "passwordAman123",
    role: "user",
  };

  test("POST /users berhasil mendaftarkan user baru ke database", async () => {
    const res = await request(app).post("/users").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.msg).toBe("User created!");
  });

  test("POST /users menolak pendaftaran dengan email yang sama dua kali", async () => {
    await request(app).post("/users").send(newUser);
    const res = await request(app).post("/users").send(newUser);

    expect(res.status).toBe(400);
    expect(res.body.msg).toMatch(/sudah|already/i);
  });

  test("POST /auth berhasil login setelah registrasi dan mengembalikan token JWT", async () => {
    await request(app).post("/users").send(newUser);

    const res = await request(app).post("/auth").send({
      email: newUser.email,
      password: newUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(newUser.email);
  });

  test("POST /auth menolak login dengan password yang salah", async () => {
    await request(app).post("/users").send(newUser);

    const res = await request(app).post("/auth").send({
      email: newUser.email,
      password: "passwordSalah",
    });

    expect(res.status).toBe(400);
  });
});
