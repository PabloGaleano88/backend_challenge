import { Router, Request, Response } from "express";
import { getplanet, getPlanetById } from "../controllers/planetsController";

const planetsRouter = Router();

planetsRouter.get("/", async (req: Request, res: Response) => {
    try {
        if (req.query) {
            const { limit, page, sort, name } = req.query
            const limitQuery = limit ? parseInt(limit as string, 10) : 10;
            const pageQuery = page ? parseInt(page as string, 10) : 1;
            let sortQuery = {};
            if (sort) {
                if (sort === "desc") {
                    sortQuery = { name: -1 };
                } else {
                    sortQuery = { name: 1 };
                }
            }
            if (typeof (name) === "string") {
                const info = await getplanet(name, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }
            else {
                const info = await getplanet(null, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }

        }

    } catch (e) {
        res.status(500).send("Error fetching planets data")
    }
})

planetsRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        if (req.params) {
            const id = req.params.id
            const planet = await getPlanetById(id)
            res.send(planet)
        }
    }
    catch (e) { res.status(500).send("Error fetching planet data") }
})

export default planetsRouter