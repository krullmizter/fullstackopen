const { test, before, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const config = require("../utils/config");
const Blog = require("../models/blog");

const api = supertest(app);

before(async () => {
  console.log("Running tests for blog APIs");
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

  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(res.body.length, 1, "The number of blogs are incorrect");
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

  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogFromRes = res.body.find((blog) => blog.title === "Blog 4.9");

  assert.ok(blogFromRes, "Blog was not found in the response");
  assert.ok(blogFromRes.id, "The blog does not have an 'id' field");
  assert.strictEqual(
    blogFromRes.id,
    newBlog.id.toString(),
    "Blog 'id' does not match"
  );
});

// 4.10
test("Successfully crated a new blog with POST", async () => {
  const blogsBefore = await Blog.find({});
  const blogsCountBefore = blogsBefore.length;

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
    blogsCountBefore + 1,
    "Blog count did NOT increase"
  );

  const titles = blogsAfterPost.map((blog) => blog.title);
  assert.ok(titles.includes(newBlog.title), "No new title was found");
});

// 4.11
test("If the likes value is missing, it should be set to 0", async () => {
  const newBlog = {
    title: "Blog 4.11",
    author: "Jane Doe",
    url: "https://google.com",
  };

  const res = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  console.log(res.body);

  assert.strictEqual(
    res.body.likes,
    0,
    "The value of 'likes' was NOT set to 0"
  );
});

// 4.12
test("400 status if blog title is missing from the response", async () => {
  const newBlog = {
    author: "John Doe",
    url: "https://google.com",
    likes: 15,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("400 status if blog URL is missing from the response", async () => {
  const newBlog = {
    title: "Blog 4.12",
    author: "Jane Doe",
    likes: 25,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

// CLose the DB connection after all tests
after(async () => {
  await mongoose.connection.close();
});
