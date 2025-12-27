const request = require("supertest");
const app = require("../app");
const User = require("../model/UserSchema");

jest.mock("../middleware/authMiddleware", () => {
  return (req, res, next) => {
    req.user = {
      _id: "test-user-id",
      name: "Test user",
      email: "test@mail.com",
    };
    next();
  };
});

jest.mock("../model/UserSchema");

describe("User APIs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /register -> should register user", async () => {
    User.findOne.mockResolvedValueOnce(null); // user not exists
    User.create.mockResolvedValueOnce({ _id: "user-id" });

    const res = await request(app).post("/api/v1/user/register").send({
      name: "Test User",
      email: "test@mail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
  });

  it("POST /login -> should login user", async () => {
    User.findOne.mockResolvedValueOnce({
      _id: "user-id",
      name: "Test user",
      email: "test@mail.com",
      password: "hashed-password",
    });

    const res = await request(app).post("/api/v1/user/login").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
  });

  it("GET /me → should return logged in user", async () => {
    const res = await request(app).get("/api/v1/user/me");

    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe("test@mail.com");
  });
});
