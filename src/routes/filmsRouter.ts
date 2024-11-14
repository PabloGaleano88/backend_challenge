import { Router } from "express";
import { getfilms } from "../controllers/filmsController";

const filmsRouter = Router();

filmsRouter.get("/", async (req, res) => {
    try {
        if (req.query) {
            const { limit, page, sort, title } = req.query
            const limitQuery = limit ? parseInt(limit as string, 10) : 10;
            const pageQuery = page ? parseInt(page as string, 10) : 1;
            let sortQuery = {};
            if (sort) {
                if (sort === "desc") {
                    sortQuery = { title: -1 };
                } else {
                    sortQuery = { title: 1 };
                }
            }
            if (typeof (title) === "string") {
                const info = await getfilms(title, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }
            else {
                const info = await getfilms(null, limitQuery, pageQuery, sortQuery)
                res.send(info)
            }
        }

    } catch (e) {
        res.status(500).send("Error fetching films data")
    }
})

export default filmsRouter