const supertest = require("supertest");
const { expect } = require("chai");
const requester = supertest("http://localhost:8000");

describe("GET /planets", () => {
  it("debería responder con status 200 y devolver un array de planetas", async () => {
    const response = await requester.get("/planets");
    expect(response.status).to.equal(200);
    expect(response.body.docs).to.be.an("array");
  });

  it("debería filtrar planeta por nombre, Tatooine", async () => {
    const response = await requester.get("/planets?name=Tatooine");
    expect(response.status).to.equal(200);
    expect(response.body.docs[0]?.name.toLowerCase()).to.equal("tatooine");
  });

  it("debería manejar la paginación correctamente", async () => {
    const response = await requester.get("/planets?page=2&limit=5");
    expect(response.status).to.equal(200);
    expect(response.body.docs.length).to.be.at.most(5);
    expect(response.body.page).to.equal(2);
  });
});
