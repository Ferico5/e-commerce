jest.mock("../../models/UserModel.js");
jest.mock("../../models/ProductModel.js");

const UserModel = require("../../models/UserModel.js");
const ProductModel = require("../../models/ProductModel.js");
const {
  addCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../../controllers/CartController.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("CartController - addCart (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("menambahkan produk baru ke cart yang masih kosong", async () => {
    const req = {
      user: { id: "user-1" },
      body: { productId: "prod-1", quantity: 2, size: "M" },
    };
    const res = mockRes();
    const fakeUser = { cartData: [], save: jest.fn().mockResolvedValue(true) };

    UserModel.findById.mockResolvedValue(fakeUser);

    await addCart(req, res);

    expect(fakeUser.cartData).toHaveLength(1);
    expect(fakeUser.cartData[0]).toEqual({
      productId: "prod-1",
      quantity: 2,
      size: "M",
    });
    expect(fakeUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("menambah quantity jika produk dengan size sama sudah ada di cart", async () => {
    const req = {
      user: { id: "user-1" },
      body: { productId: "prod-1", quantity: 1, size: "M" },
    };
    const res = mockRes();
    const fakeUser = {
      cartData: [
        { productId: { toString: () => "prod-1" }, quantity: 2, size: "M" },
      ],
      save: jest.fn().mockResolvedValue(true),
    };

    UserModel.findById.mockResolvedValue(fakeUser);

    await addCart(req, res);

    expect(fakeUser.cartData[0].quantity).toBe(3);
    expect(fakeUser.cartData).toHaveLength(1);
  });
});

describe("CartController - getCart (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("mengembalikan detail produk yang sesuai dengan isi cart user", async () => {
    const req = { user: { id: "user-1" } };
    const res = mockRes();
    const fakeUser = {
      cartData: [{ productId: "prod-1", quantity: 2, size: "M" }],
    };
    const fakeProduct = {
      _id: { toString: () => "prod-1" },
      toObject: () => ({ _id: "prod-1", name: "Kaos Polos", price: 100000 }),
    };

    UserModel.findById.mockResolvedValue(fakeUser);
    ProductModel.find.mockResolvedValue([fakeProduct]);

    await getCart(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      cartItems: [
        expect.objectContaining({ name: "Kaos Polos", quantity: 2, size: "M" }),
      ],
    });
  });
});

describe("CartController - updateCart (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("mengembalikan 404 ketika item cart tidak ditemukan", async () => {
    const req = {
      user: { id: "user-1" },
      params: { productId: "prod-x" },
      body: { quantity: 3, size: "L" },
    };
    const res = mockRes();
    const fakeUser = { cartData: [] };

    UserModel.findById.mockResolvedValue(fakeUser);

    await updateCart(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Item not found in cart",
    });
  });
});

describe("CartController - deleteCart (Unit Test)", () => {
  afterEach(() => jest.clearAllMocks());

  test("menghapus item tertentu dari cart berdasarkan productId dan size", async () => {
    const req = {
      user: { id: "user-1" },
      params: { productId: "prod-1" },
      query: { size: "M" },
    };
    const res = mockRes();
    const fakeUser = {
      cartData: [
        { productId: { toString: () => "prod-1" }, size: "M", quantity: 1 },
        { productId: { toString: () => "prod-2" }, size: "L", quantity: 1 },
      ],
      save: jest.fn().mockResolvedValue(true),
    };

    UserModel.findById.mockResolvedValue(fakeUser);

    await deleteCart(req, res);

    expect(fakeUser.cartData).toHaveLength(1);
    expect(fakeUser.cartData[0].productId.toString()).toBe("prod-2");
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
