jest.mock("../../models/UserModel.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const UserModel = require("../../models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  loginUser,
} = require("../../controllers/UserController.js");

// Helper untuk membuat mock response Express
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("UserController - createUser (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("berhasil membuat user baru ketika email belum terdaftar", async () => {
    const req = {
      body: {
        name: "Budi",
        email: "budi@mail.com",
        password: "rahasia123",
        role: "user",
      },
    };
    const res = mockRes();

    UserModel.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashed_password");
    UserModel.prototype.save = jest.fn().mockResolvedValue(true);

    await createUser(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: "budi@mail.com" });
    expect(bcrypt.hash).toHaveBeenCalledWith("rahasia123", 10);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ msg: "User created!" });
  });

  test("menolak registrasi ketika email sudah terdaftar", async () => {
    const req = {
      body: {
        name: "Budi",
        email: "budi@mail.com",
        password: "rahasia123",
        role: "user",
      },
    };
    const res = mockRes();

    UserModel.findOne.mockResolvedValue({
      _id: "existing-id",
      email: "budi@mail.com",
    });

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Email already exists, try another!",
    });
  });

  test("mengembalikan status 500 ketika terjadi error pada database", async () => {
    const req = {
      body: {
        name: "Budi",
        email: "budi@mail.com",
        password: "rahasia123",
        role: "user",
      },
    };
    const res = mockRes();

    UserModel.findOne.mockRejectedValue(new Error("DB connection lost"));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Server error" });
  });
});

describe("UserController - loginUser (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("berhasil login dengan email dan password yang benar", async () => {
    const req = { body: { email: "budi@mail.com", password: "rahasia123" } };
    const res = mockRes();

    const fakeUser = {
      _id: "user-1",
      email: "budi@mail.com",
      password: "hashed_password",
      role: "user",
    };
    UserModel.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-jwt-token");

    await loginUser(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "rahasia123",
      "hashed_password",
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: "Login successful",
        token: "fake-jwt-token",
      }),
    );
  });

  test("menolak login ketika email tidak ditemukan", async () => {
    const req = {
      body: { email: "tidakada@mail.com", password: "rahasia123" },
    };
    const res = mockRes();

    UserModel.findOne.mockResolvedValue(null);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Invalid email or password!",
    });
  });

  test("menolak login ketika password salah", async () => {
    const req = { body: { email: "budi@mail.com", password: "passwordSalah" } };
    const res = mockRes();

    const fakeUser = {
      _id: "user-1",
      email: "budi@mail.com",
      password: "hashed_password",
      role: "user",
    };
    UserModel.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(false);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Invalid email or password!",
    });
  });
});
