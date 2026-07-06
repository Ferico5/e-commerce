jest.mock("../../models/ProductModel.js");
jest.mock("../../config/cloudinary.js");

const ProductModel = require("../../models/ProductModel.js");
const cloudinary = require("../../config/cloudinary.js");
const {
  removeProduct,
  listProduct,
  singleProduct,
  relatedProduct,
} = require("../../controllers/ProductController.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("ProductController - listProduct (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("mengembalikan daftar seluruh produk", async () => {
    const req = {};
    const res = mockRes();
    const fakeProducts = [{ name: "Kemeja Flanel" }, { name: "Kaos Polos" }];

    ProductModel.find.mockResolvedValue(fakeProducts);

    await listProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ listProduct: fakeProducts }),
    );
  });

  test("mengembalikan 500 ketika database error", async () => {
    const req = {};
    const res = mockRes();
    ProductModel.find.mockRejectedValue(new Error("DB error"));

    await listProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("ProductController - singleProduct (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("mengembalikan produk ketika ID ditemukan", async () => {
    const req = { params: { id: "prod-1" } };
    const res = mockRes();
    const fakeProduct = { _id: "prod-1", name: "Kemeja Flanel" };

    ProductModel.findById.mockResolvedValue(fakeProduct);

    await singleProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ singleProduct: fakeProduct }),
    );
  });

  test("mengembalikan 404 ketika produk tidak ditemukan", async () => {
    const req = { params: { id: "tidak-ada" } };
    const res = mockRes();

    ProductModel.findById.mockResolvedValue(null);

    await singleProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Product not found!" });
  });
});

describe("ProductController - removeProduct (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("berhasil menghapus produk yang ada", async () => {
    const req = { params: { id: "prod-1" } };
    const res = mockRes();

    ProductModel.findByIdAndDelete.mockResolvedValue({ _id: "prod-1" });

    await removeProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Product removed!" });
  });

  test("mengembalikan 404 ketika produk yang ingin dihapus tidak ada", async () => {
    const req = { params: { id: "tidak-ada" } };
    const res = mockRes();

    ProductModel.findByIdAndDelete.mockResolvedValue(null);

    await removeProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Product not found!" });
  });
});

describe("ProductController - relatedProduct (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("menolak permintaan tanpa parameter category", async () => {
    const req = { query: {} };
    const res = mockRes();

    await relatedProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Category is required" });
  });

  test("mengembalikan produk terkait berdasarkan kategori, mengecualikan produk itu sendiri", async () => {
    const req = { query: { category: "Pria", excludeId: "prod-1" } };
    const res = mockRes();
    const fakeRelated = [{ _id: "prod-2", category: "Pria" }];

    const limitMock = jest.fn().mockResolvedValue(fakeRelated);
    ProductModel.find.mockReturnValue({ limit: limitMock });

    await relatedProduct(req, res);

    expect(ProductModel.find).toHaveBeenCalledWith({
      category: "Pria",
      _id: { $ne: "prod-1" },
    });
    expect(limitMock).toHaveBeenCalledWith(5);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
