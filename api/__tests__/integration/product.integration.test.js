const request = require("supertest");
const app = require("../../app.js");
const dbHandler = require("../setup/dbHandler.js");
const ProductModel = require("../../models/ProductModel.js");

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

const seedProduct = async (overrides = {}) => {
  const product = new ProductModel({
    name: "Kemeja Flanel Kotak",
    description: "Kemeja flanel lengan panjang bahan katun",
    price: 150000,
    image: ["https://example.com/img1.jpg"],
    category: "Pria",
    subCategory: "Kemeja",
    sizes: ["M", "L", "XL"],
    bestSeller: false,
    ...overrides,
  });
  return product.save();
};

describe("Integration Test - Katalog Produk", () => {
  test("GET /list mengembalikan daftar produk yang tersimpan di database", async () => {
    await seedProduct();
    await seedProduct({
      name: "Kaos Polos Hitam",
      category: "Pria",
      subCategory: "Kaos",
    });

    const res = await request(app).get("/list");

    expect(res.status).toBe(200);
    expect(res.body.listProduct).toHaveLength(2);
  });

  test("GET /single/:id mengembalikan detail satu produk", async () => {
    const product = await seedProduct();

    const res = await request(app).get(`/single/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.singleProduct.name).toBe("Kemeja Flanel Kotak");
  });

  test("GET /single/:id mengembalikan 404 untuk ID yang tidak ada", async () => {
    const fakeId = "64a000000000000000000000";
    const res = await request(app).get(`/single/${fakeId}`);

    expect(res.status).toBe(404);
  });

  test("GET /products mengembalikan produk terkait berdasarkan kategori, mengecualikan produk itu sendiri", async () => {
    const mainProduct = await seedProduct({ category: "Wanita" });
    await seedProduct({ name: "Dress Casual", category: "Wanita" });
    await seedProduct({ name: "Celana Jeans", category: "Pria" });

    const res = await request(app)
      .get("/products")
      .query({ category: "Wanita", excludeId: mainProduct._id.toString() });

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(1);
    expect(res.body.products[0].name).toBe("Dress Casual");
  });
});
