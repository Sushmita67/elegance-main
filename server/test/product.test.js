const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Adjust the path to your server file
const Product = require('../models/Product'); // Adjust the path to your Product model
const mongoose = require("mongoose");

chai.use(chaiHttp);
const { expect } = chai;

describe('Product Routes', () => {
  let productId;

  before(async () => {
    
          await mongoose.connect("mongodb://localhost:27017/elegance_db");
      
    // Clear the database before running tests
    await Product.deleteMany({});
  });

  after(async () => {
    // Clean up the database after tests
    await Product.deleteMany({});
  });

//   it("should create new product", async function (){
//     this.timeout(5000);
//     const res = await chai.request(app)
//   .post("/api/products")
//   .field("company", "Test Brand")
//   .field("title", "Test Product")
//   .field("desc", "This is a test description")
//   .field("price", 100)
//   .field("discountPrice", 80)
//   .field("categories", JSON.stringify(["J"]))
//   .field("size", JSON.stringify(["M"]))
//   .field("alt", "Test image")
//   .attach("picture", "test/test-image.jpg");

// console.log(res.body); // ✅ Log response to see actual error

// expect(res).to.have.status(201);
// expect(res.body).to.have.property("_id");
// expect(res.body).to.have.property("title", "Test Product");

// testProductId = res.body._id;
//    });
  

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const res = await chai.request(app).get('/api/products');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should get the latest 1 products when query param "new" is true', async () => {
      // Add test products with all required fields
      await Product.insertMany([
        {
          company: 'Company A',
          title: 'Product 1',
          desc: 'Description 1',
          price: 100,
          slug: 'product-1',
          discountPrice: 90,
          alt: 'Alt 1',
        },
        {
          company: 'Company B',
          title: 'Product 2',
          desc: 'Description 2',
          price: 200,
          slug: 'product-2',
          discountPrice: 180,
          alt: 'Alt 2',
        },
      ]);

      const res = await chai.request(app).get('/api/products');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.lengthOf.at.most(5);
    });

    it('should get products by collection when query param "collection" is provided', async () => {
      const res = await chai.request(app).get('/api/products?collection=Company A');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('company', 'Company A');
    });
  });


  describe('DELETE /api/products/:id', () => {
    // it('should delete a product', async () => {
    //   const res = await chai.request(app).delete(`/api/products/${productId}`);
    //   expect(res).to.have.status(200);
    //   expect(res.body).to.have.property('msg', 'Product successfully deleted');
    // });

    it('should return 400 if product does not exist', async () => {
      const res = await chai.request(app).delete('/api/products/invalidId');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('msg', "Product doesn't exist");
    });
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await chai
      .request(app)
      .post('/api/products')
      .send({});

    expect(res).to.have.status(400);
    expect(res.body.errors).to.be.an('array');
  });
});

