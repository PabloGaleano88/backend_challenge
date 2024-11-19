import { Router } from "express";
import { getStarship, getStarshipById } from "../controllers/starshipsController";

const starshipsRouter = Router();

starshipsRouter.get("/", async (req, res) => {
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
                const info = await getStarship(name, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }
            else {
                const info = await getStarship(null, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }

        }

    } catch (e) {
        res.status(500).send("Error fetching starships data")
    }
})

starshipsRouter.get("/:id", async (req, res) => {
    try {
        if (req.params) {
            const id = req.params.id
            const starship = await getStarshipById(id)
            res.send(starship)
        }
    }
    catch (e) { res.status(500).send("Error fetching starship data") }
})

export default starshipsRouter