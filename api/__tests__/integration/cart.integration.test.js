const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../app.js");
const dbHandler = require("../setup/dbHandler.js");
const UserModel = require("../../models/UserModel.js");
const ProductModel = require("../../models/ProductModel.js");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const makeAuthedUser = async () => {
  const user = await new UserModel({
    name: "Andi",
    email: "andi@mail.com",
    password: "hashed-not-relevant-here",
    role: "user",
  }).save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  return { user, token };
};

const seedProduct = async () =>
  new ProductModel({
    name: "Jaket Denim",
    description: "Jaket denim unisex",
    price: 250000,
    image: ["https://example.com/jaket.jpg"],
    category: "Unisex",
    subCategory: "Jaket",
    sizes: ["M", "L"],
  }).save();

describe("Integration Test - Alur Keranjang Belanja (Cart)", () => {
  test("menolak akses cart tanpa token (unauthorized)", async () => {
    const res = await request(app).get("/get-cart");
    expect(res.status).toBe(401);
  });

  test("user terautentikasi dapat menambah produk ke cart dan melihatnya kembali", async () => {
    const { token } = await makeAuthedUser();
    const product = await seedProduct();

    const addRes = await request(app)
      .post("/add-cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: product._id.toString(), quantity: 2, size: "M" });

    expect(addRes.status).toBe(200);
    expect(addRes.body.cartData).toHaveLength(1);

    const getRes = await request(app)
      .get("/get-cart")
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.cartItems).toHaveLength(1);
    expect(getRes.body.cartItems[0].name).toBe("Jaket Denim");
    expect(getRes.body.cartItems[0].quantity).toBe(2);
  });

  test("menghapus item dari cart mengembalikan cart yang sudah kosong", async () => {
    const { token } = await makeAuthedUser();
    const product = await seedProduct();

    await request(app)
      .post("/add-cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: product._id.toString(), quantity: 1, size: "L" });

    const delRes = await request(app)
      .delete(`/cart/${product._id.toString()}`)
      .query({ size: "L" })
      .set("Authorization", `Bearer ${token}`);

    expect(delRes.status).toBe(200);
    expect(delRes.body.cartData).toHaveLength(0);
  });
});
