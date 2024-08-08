const { test, before, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const config = require("../utils/config");
const Blog = require("../models/blog");

const api = supertest(app);

before(async () => {
  console.log(`Using environment: ${config.env}\n`);
  const url = config.mongoUrl;
  await mongoose.connect(url, {});
  await Blog.deleteMany({}); // Clear the db content before
});

test("Blogs count is correct, and uses JSON", async () => {
  await new Blog({
    title: "Blog 4.8",
    author: "Test Author",
    url: "https://google.com",
    likes: 0,
  }).save();

  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, 1);
});

after(async () => {
  await mongoose.connection.close();
});
