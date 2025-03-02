
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("User & Authentication API Tests", () => {
  let userToken = "";
  let adminToken = "";
  let testUserId = "";

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    await User.deleteMany({ email: "test@example.com" });

    const testUser = new User({
      firstname: "Test",
      lastname: "User",
      username: "testuser",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
      isAdmin: false,
    });

    await testUser.save();
    testUserId = testUser._id.toString();
  });

  after(async () => {
    await User.deleteMany({ email: "test@example.com" });
    mongoose.connection.close();
  });

  /** ✅ Test User Registration **/
  describe("POST /api/users", () => {
    it("should not register a user with an existing email", async () => {
      const res = await chai.request(app).post("/api/users").send({
        firstname: "Duplicate",
        lastname: "User",
        username: "dupuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(res).to.have.status(400);
      expect(res.text).to.equal("User already exists");
    });

    it("should return validation errors for missing fields", async () => {
      const res = await chai.request(app).post("/api/users").send({
        email: "invalid@example.com",
      });

      expect(res).to.have.status(400);
      expect(res.body.errors).to.be.an("array");
    });
  });

  /** ✅ Test User Login **/
  describe("POST /api/auth", () => {
    it("should log in the user and return a token", async () => {
      const res = await chai.request(app).post("/api/auth").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("token");
      userToken = res.body.token;
    });

    it("should not log in with invalid credentials", async () => {
        const res = await chai.request(app).post("/api/auth").send({
          email: "test@example.com",
          password: "wrongpassword",
        });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("msg", "Invalid credentials");
      });
  });

  /** ✅ Test Token Verification **/
  describe("GET /api/auth/verify", () => {
    it("should verify a valid token and return user details", async () => {
      const res = await chai
        .request(app)
        .get("/api/auth/verify")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("user");
    });
  });

  /** ✅ Test Get User By ID **/
  describe("GET /api/users/find/:id", () => {
    it("should return 401 if no token provided", async () => {
      const res = await chai.request(app).get(`/api/users/find/${testUserId}`);
      expect(res).to.have.status(401);
    });
  });

  /** ✅ Test Get All Users (Admin only) **/
  describe("GET /api/users", () => {
    it("should fetch all users (Admin only)", async () => {
      const res = await chai
        .request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });

//   /** ✅ Test User Deletion **/
//   describe("DELETE /api/auth/:id", () => {
//     it("should delete the user", async () => {
//       const res = await chai
//         .request(app)
//         .delete(`/api/auth/${testUserId}`)
//         .set("Authorization", `Bearer ${userToken}`);

//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property("msg", "User is successfully deleted");
//     });
//   });

    /** ✅ Test Get User Stats **/
    describe("GET /api/users/stats", () => {
    
        it("should return 401 if unauthorized", async () => {
          const res = await chai.request(app).get("/api/users/stats");
          expect(res).to.have.status(401);
        });
      });
});
