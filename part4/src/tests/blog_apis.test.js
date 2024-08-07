const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Blog = require("../models/blog");
const config = require("../utils/config");

const api = supertest(app);

async function runTests() {
  try {
    await mongoose.connect(config.mongoUrl, {});
    console.log("Connected to the database");

    await Blog.deleteMany({});
    console.log("Cleared the test database");

    const blog1 = new Blog({
      title: "Test 1",
      author: "John Doe",
      url: "http://google.com/1",
      likes: 95,
    });

    const blog2 = new Blog({
      title: "Test 2",
      author: "Sara Smith",
      url: "http://google.com/2",
      likes: 2,
    });

    await blog1.save();
    await blog2.save();
    console.log("Saved test data");

    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = response.body;
    console.log("Blogs response was:", blogs);

    if (blogs.length === 2) {
      console.log("Length test passed: Correct number of blogs");
    } else {
      console.error("Length test failed: Incorrect number of blogs");
    }

    const testIdRes = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const testBlogs = testIdRes.body;

    testBlogs.forEach((blog) => {
      if (blog.id && !blog._id) {
        console.log(`${blog.id} Id test passed: Identifier is named id`);
      } else {
        console.error(`${blog.id} Id test failed: Identifier is not named id`);
      }
    });
  } catch (error) {
    console.error("a test failed:", error.message);
  } finally {
    try {
      await mongoose.connection.close();
      console.log("DB connection closed");
    } catch (dbError) {
      console.error("Error closing DB connection:", dbError.message);
    } finally {
      process.exit(0);
    }
  }
}

runTests();
