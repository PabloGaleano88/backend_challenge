import { Router } from "express";
import { getpeople, getCharacterById } from "../controllers/peopleController";
const peopleRouter = Router();

peopleRouter.get("/", async (req, res) => {
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
                const info = await getpeople(name, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }
            else {
                const info = await getpeople(null, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }

        }

    } catch (e) {
        res.status(500).send("Error fetching people data")
    }
})

peopleRouter.get("/:id", async (req, res) => {
    try {
        if (req.params) {
            const id = req.params.id
            const character = await getCharacterById(id)
            res.send(character)
        }
    }
    catch (e) { res.status(500).send("Error fetching character data") }
})

export default peopleRouter