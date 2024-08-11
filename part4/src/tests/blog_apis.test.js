const { test, before, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const config = require("../utils/config");
const Blog = require("../models/blogModel");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

const api = supertest(app);

let token;

before(async function () {
  console.log("Running tests for blog APIs");
  console.log(`Using environment: ${config.env}\n`);

  try {
    await mongoose.connect(config.mongoUrl, {
      serverSelectionTimeoutMS: 30000,
    });

    const passwordHash = await bcrypt.hash("password101", 10);
    const user = new User({
      username: `testUser_${Date.now()}`,
      name: "Test User",
      passwordHash,
    });

    await user.save();

    const loginResponse = await api
      .post("/api/login")
      .send({ username: user.username, password: "password101" })
      .expect(200);

    token = loginResponse.body.token;
    console.log("Login response:", loginResponse.body);

    if (!token) {
      throw new Error("Token not received. Login might have failed.");
    }

    console.log("Setup completed successfully. Token received:", token);
  } catch (error) {
    console.error("Setup failed:", error.message);
    throw error;
  }
});

// Clear the db content before each test
beforeEach(async () => {
  await Blog.deleteMany({});
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
test("Successfully created a new blog with POST", async () => {
  const blogsBefore = await Blog.find({});
  const blogsCountBefore = blogsBefore.length;

  const newBlog = {
    title: "Blog 4.10",
    author: "John Doe",
    url: "https://google.com",
    likes: 0,
  };

  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  console.log("Response body:", res.body);

  const blogsAfterPost = await Blog.find({});
  console.log("Blogs after post:", blogsAfterPost.length);

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
    .set("Authorization", `Bearer ${token}`)
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
test("400 status if blog title is missing from the request", async () => {
  const newBlog = {
    author: "John Doe",
    url: "https://google.com",
    likes: 15,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("400 status if blog URL is missing from the request", async () => {
  const newBlog = {
    title: "Blog 4.12",
    author: "Jane Doe",
    likes: 25,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

// 4.13
test("Delete a blog by ID", async () => {
  const newBlog = {
    title: "Bad blog",
    author: "Author 1",
    url: "https://google.com",
    likes: 0,
  };

  const createResponse = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const createdBlog = createResponse.body;

  assert.ok(createdBlog.id, "Blog ID is missing");

  let blogs = await Blog.find({});
  assert.strictEqual(blogs.length, 1, "Blog count should be 1");
  assert.strictEqual(
    blogs[0].title,
    newBlog.title,
    "Blog title does not match"
  );

  await api
    .delete(`/api/blogs/${createdBlog.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  blogs = await Blog.find({});
  assert.strictEqual(blogs.length, 0, "Blog was not deleted");
});

// 4.14
test("Update likes of a blog based on its ID", async () => {
  const newBlog = await new Blog({
    title: "Malformed blog",
    author: "Jane Smith",
    url: "https://google.com",
    likes: 55,
    user: (await User.findOne({}))._id,
  }).save();

  const updateLikes = { likes: 33 };

  const response = await api
    .put(`/api/blogs/${newBlog.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(updateLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, updateLikes.likes);
});

// 4.16*
test("creation fails with proper status code and message if username is too short", async () => {
  const newUser = {
    username: "ab",
    name: "John Doe",
    password: "validpassword",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    result.body.error,
    "Username must be at least 3 characters long"
  );
});

test("creation fails with proper status code and message if password is too short", async () => {
  const newUser = {
    username: "validusername",
    name: "Jane Doe",
    password: "pw",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    result.body.error,
    "Password must be at least 3 characters long"
  );
});

test("creation fails with proper status code and message if username already exists", async () => {
  await User.deleteMany({ username: "existinguser" });

  const existingUser = new User({
    username: "existinguser",
    name: "Existing User",
    passwordHash: await bcrypt.hash("password", 10),
  });

  await existingUser.save();

  const newUser = {
    username: "existinguser", // same username
    name: "New User",
    password: "validpassword",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.error, "Username must be unique");
});

test("creation succeeds with a fresh username", async () => {
  User.deleteMany({});

  const newUser = {
    username: `newUser_${Date.now()}`,
    name: "New User",
    password: "validpassword",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.username, newUser.username);
});

// Disconnect the DB after tests
after(async () => {
  await mongoose.disconnect();
  console.log("Testing completed, and DB connection is closed.");
});
