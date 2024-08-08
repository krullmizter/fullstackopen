const { test, before, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const config = require("../utils/config");
const Blog = require("../models/blog");

const api = supertest(app);

before(async () => {
  console.log("Running tests for Blog APIs");
  console.log(`Using environment: ${config.env}\n`);
});

// Connect and clear the DB test content
beforeEach(async () => {
  const url = config.mongoUrl;
  await mongoose.connect(url, {});
  await Blog.deleteMany({}); // Clear the db content before each test
});

// Tests

// 4.8
test("Blogs count is correct, and uses JSON", async () => {
  await new Blog({
    title: "Blog 4.8",
    author: "Samuel Granvik",
    url: "https://google.com",
    likes: 0,
  }).save();

  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    response.body.length,
    1,
    "The amount of blogs returned is incorrect"
  );
});

// 4.9
test("Unique _id is named id", async () => {
  const newBlog = new Blog({
    title: "Blog 4.9",
    author: "Leumas Kivnarg",
    url: "https://google.com",
    likes: 0,
  });
  await newBlog.save();

  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogFromResponse = response.body.find(
    (blog) => blog.title === "Blog 4.9"
  );

  assert.ok(blogFromResponse, "Blog was not found in the response");
  assert.ok(blogFromResponse.id, "The blog does not have an 'id' field");
  assert.strictEqual(
    blogFromResponse.id,
    newBlog.id.toString(),
    "Blog 'id' does not match"
  );
});

// 4.10
test("Successfully using POST to create a new blog", async () => {
  const initialBlogs = await Blog.find({});
  const initialCount = initialBlogs.length;

  const newBlog = {
    title: "Blog 4.10",
    author: "John Doe",
    url: "https://google.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfterPost = await Blog.find({});
  assert.strictEqual(
    blogsAfterPost.length,
    initialCount + 1,
    "Blog count did not increase"
  );

  const titles = blogsAfterPost.map((blog) => blog.title);
  assert.ok(titles.includes(newBlog.title), "No new blog title was found");
});

// CLose the DB connection after all tests
after(async () => {
  await mongoose.connection.close();
});
