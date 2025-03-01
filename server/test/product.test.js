const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Adjust if needed
const expect = chai.expect;

chai.use(chaiHttp);

describe("📦 Product API Tests", () => {
  let productId = null;

  // ✅ 1️⃣ Test: GET all products
  it("should get all products", (done) => {
    chai
      .request(app)
      .get("/api/products")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  // ✅ 2️⃣ Test: Create a new product
  it("should create a new product", (done) => {
    chai
      .request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send({
        company: "Jewels Inc.",
        title: "Gold Necklace",
        desc: "A beautiful 24K gold necklace",
        price: 500,
        discountPrice: 450,
        categories: JSON.stringify([ "Necklace"]),
        size: JSON.stringify(["Small", "Medium"]),
        slug: "gold-necklace",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("_id");
        productId = res.body._id; // Store the product ID for later tests
        done();
      });
  });

//   // ✅ 3️⃣ Test: GET single product
//   it("should fetch a product by ID", (done) => {
//     chai
//       .request(app)
//       .get(`/api/products/${productId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("title", "Gold Necklace");
//         done();
//       });
//   });

//   // ✅ 4️⃣ Test: Update product
//   it("should update an existing product", (done) => {
//     chai
//       .request(app)
//       .put(`/api/products/${productId}`)
//       .send({
//         title: "Updated Gold Necklace",
//         price: 550,
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("title", "Updated Gold Necklace");
//         done();
//       });
//   });

//   // ✅ 5️⃣ Test: PATCH product (partial update)
//   it("should partially update a product", (done) => {
//     chai
//       .request(app)
//       .patch(`/api/products/${productId}`)
//       .send({
//         price: 600,
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("price", 600);
//         done();
//       });
//   });

//   // ✅ 6️⃣ Test: DELETE product
//   it("should delete a product", (done) => {
//     chai
//       .request(app)
//       .delete(`/api/products/${productId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property("msg", "Product successfully deleted");
//         done();
//       });
//   });

//   // ✅ 7️⃣ Test: Get a non-existent product (should fail)
//   it("should return 400 when fetching a non-existent product", (done) => {
//     chai
//       .request(app)
//       .get(`/api/products/65f2e07d4b8d3a0012345678`) // Non-existent ID
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res.body.msg).to.equal("Product doesn't exist");
//         done();
//       });
//   });
});
