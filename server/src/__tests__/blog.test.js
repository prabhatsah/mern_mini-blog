const request = require("supertest");
const app = require("../app");

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

jest.mock("../model/BlogSchema", () => ({
  create: jest.fn().mockResolvedValue({
    _id: "blog-id",
  }),
  findById: jest.fn().mockResolvedValue({
    _id: "blog-id",
  }),
  find: jest.fn().mockResolvedValue([
    {
      _id: "blog-id",
    },
  ]),
}));

describe("Blog APIs", () => {
  it("POST /blog → should create blog", async () => {
    const res = await request(app).post("/api/v1/blog").send({
      title: "New blog for jest test",
      excerpt: "Test excerpt",
      content: "Test content",
      category: "Architecture",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
      read_time: 1,
    });

    expect(res.statusCode).toBe(201);
  });

  it("GET /blog → should fetch user blogs", async () => {
    const res = await request(app).get("/api/v1/blog");

    expect(res.statusCode).toBe(202);
  });

  it("GET /blog/other → should fetch other users blogs", async () => {
    const res = await request(app).get("/api/v1/blog/other");

    expect(res.statusCode).toBe(202);
  });

  it("GET /blog/:id → should fetch blog by id", async () => {
    const res = await request(app).get("/api/v1/blog/123");

    expect(res.statusCode).toBe(202);
  });
});
