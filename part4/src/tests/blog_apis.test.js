const request = require("supertest");
const app = require("../../app"); // adjust the path to your Express app

describe("GET /api/blogs", () => {
  it("should return the correct number of blog posts", async () => {
    const response = await request(app).get("/api/blogs");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Adjust the expected number according to your seed data
    expect(response.body).toHaveLength(3);
  });
});
