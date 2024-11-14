const supertest = require("supertest");
const { expect } = require("chai");
const requester = supertest("http://localhost:8000");

describe("GET /people", () => {
  it("debería responder con status 200 y devolver un array de personas", async () => {
    const response = await requester.get("/people");
    expect(response.status).to.equal(200);
    expect(response.body.docs).to.be.an("array");
  });

  it("debería filtrar personas por nombre, Luke Skywalker", async () => {
    const response = await requester.get("/people?name=Luke");
    expect(response.status).to.equal(200);
    expect(response.body.docs[0]?.name.toLowerCase()).to.equal(
      "luke skywalker"
    );
  });

  it("debería manejar la paginación correctamente", async () => {
    const response = await requester.get("/people?page=1&limit=5");
    expect(response.status).to.equal(200);
    expect(response.body.docs.length).to.be.at.most(5);
  });
});
