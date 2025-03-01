// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../server"); // Ensure this path is correct
// const { expect } = chai;
// const User = require("../models/User");
// const mongoose = require("mongoose");

// chai.use(chaiHttp);

// describe("User API Tests", () => {
//   let userToken = "";
//   let adminToken = "";
//   let testUserId = "";

//   before(async () => {
//     // Connect to database
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGO_URI);
//     }

//     // Create a test user
//     const testUser = new User({
//       firstname: "Test",
//       lastname: "User",
//       username: "testuser",
//       email: "test@example.com",
//       password: "password123",
//       isAdmin: false,
//     });

//     await testUser.save();
//     testUserId = testUser._id.toString();
//   });

//   after(async () => {
//     // Clean up test user
//     await User.deleteMany({ email: "test@example.com" });
//     mongoose.connection.close();
//   });

//   /** ✅ Test User Registration **/
//   describe("POST /api/users", () => {
//     it("should not register a user with an existing email", async function () {
//         this.timeout(5000);
      
//         const user = {
//           firstname: "Test",
//           lastname: "User",
//           username: "testuser",
//           email: "existinguser@example.com", // Make sure this email exists in DB
//           password: "password123",
//         };
      
//         // Register the user for the first time
//         await chai.request(app).post("/api/users").send(user);
      
//         // Try registering again with the same email
//         const res = await chai.request(app).post("/api/users").send(user);
      
//         console.log(res.body);  // Debugging: Ensure the response structure is correct
      
//         expect(res).to.have.status(400);
//         expect(res.body.msg).to.equal("User already exists");
//       });
      
      
    // it("should not register a user with an existing email", async () => {
    //   const res = await chai
    //     .request(app)
    //     .post("/api/users")
    //     .send({
    //       firstname: "Duplicate",
    //       lastname: "User",
    //       username: "dupuser",
    //       email: "test@example.com", // Already exists
    //       password: "password123",
    //     });

    //   expect(res).to.have.status(400);
    //   expect(res.text).to.equal("User already exists");
    // });

//     it("should return validation errors for missing fields", async () => {
//       const res = await chai.request(app).post("/api/users").send({
//         email: "invalid@example.com",
//       });

//       expect(res).to.have.status(400);
//       expect(res.body.errors).to.be.an("array");
//     });
//   });

//   /** ✅ Test Get User By ID **/
//   describe("GET /api/users/find/:id", () => {
//     it("should get user details (Admin only)", async () => {
//       const res = await chai
//         .request(app)
//         .get(`/api/users/find/${testUserId}`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property("username", "testuser");
//     });

//     it("should return 400 if user not found", async () => {
//       const res = await chai
//         .request(app)
//         .get("/api/users/find/invalidID")
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res).to.have.status(400);
//       expect(res.body).to.have.property("msg", "user doesn't exist");
//     });

//     it("should return 401 if no token provided", async () => {
//       const res = await chai.request(app).get(`/api/users/find/${testUserId}`);
//       expect(res).to.have.status(401);
//     });
//   });

//   /** ✅ Test Get All Users **/
//   describe("GET /api/users", () => {
//     it("should fetch all users (Admin only)", async () => {
//       const res = await chai
//         .request(app)
//         .get("/api/users")
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an("array");
//     });

//     it("should return 401 if unauthorized", async () => {
//       const res = await chai.request(app).get("/api/users");
//       expect(res).to.have.status(401);
//     });
//   });

//   /** ✅ Test Get User Stats **/
//   describe("GET /api/users/stats", () => {
//     it("should get user statistics (Admin only)", async () => {
//       const res = await chai
//         .request(app)
//         .get("/api/users/stats")
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res).to.have.status(200);
//       expect(res.body).to.be.an("array");
//     });

//     it("should return 401 if unauthorized", async () => {
//       const res = await chai.request(app).get("/api/users/stats");
//       expect(res).to.have.status(401);
//     });
//   });
// });
