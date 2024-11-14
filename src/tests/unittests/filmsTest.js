const supertest = require("supertest");
const { expect } = require("chai");
const requester = supertest("http://localhost:8000");

describe("GET /films", () => {
  it("debería responder con status 200 y devolver un array de peliculas", async () => {
    const response = await requester.get("/films");
    expect(response.status).to.equal(200);
    expect(response.body.docs).to.be.an("array");
  });

  it("debería filtrar pelicula por titulo, The Phantom Menace", async () => {
    const response = await requester.get("/films?title=phantom");
    expect(response.status).to.equal(200);
    expect(response.body.docs[0]?.title.toLowerCase()).to.equal(
      "the phantom menace"
    );
  });

  it("debería manejar la paginación correctamente", async () => {
    const response = await requester.get("/films?page=1&limit=2");
    expect(response.status).to.equal(200);
    expect(response.body.docs.length).to.be.at.most(2);
  });
});
