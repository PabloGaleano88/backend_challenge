const supertest = require("supertest");
const { expect } = require("chai");
const requester = supertest("http://localhost:8000");

describe("GET /starships", () => {
  it("debería responder con status 200 y devolver un array de planetas", async () => {
    const response = await requester.get("/starships");
    expect(response.status).to.equal(200);
    expect(response.body.docs).to.be.an("array");
  });

  it("debería filtrar naves por nombre, Millennium Falcon", async () => {
    const response = await requester.get("/starships?name=falcon");
    expect(response.status).to.equal(200);
    expect(response.body.docs[0]?.name.toLowerCase()).to.equal(
      "millennium falcon"
    );
  });

  it("debería manejar la paginación correctamente", async () => {
    const response = await requester.get(
      "/starships?page=1&limit=10&sort=desc"
    );
    expect(response.status).to.equal(200);
    expect(response.body.docs.length).to.be.at.most(10);
    expect(response.body.page).to.equal(1);
    expect(response.body.docs[0]?.name.toLowerCase()).to.equal("arc-170");
  });
});
