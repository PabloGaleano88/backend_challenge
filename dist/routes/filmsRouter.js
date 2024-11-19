"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filmsController_1 = require("../controllers/filmsController");
const filmsRouter = (0, express_1.Router)();
filmsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query) {
            const { limit, page, sort, title } = req.query;
            const limitQuery = limit ? parseInt(limit, 10) : 10;
            const pageQuery = page ? parseInt(page, 10) : 1;
            let sortQuery = {};
            if (sort) {
                if (sort === "desc") {
                    sortQuery = { title: -1 };
                }
                else {
                    sortQuery = { title: 1 };
                }
            }
            if (typeof (title) === "string") {
                const info = yield (0, filmsController_1.getfilms)(title, limitQuery, pageQuery, sortQuery);
                res.send(info);
            }
            else {
                const info = yield (0, filmsController_1.getfilms)(null, limitQuery, pageQuery, sortQuery);
                res.send(info);
            }
        }
    }
    catch (e) {
        res.status(500).send("Error fetching films data");
    }
}));
filmsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params) {
            const id = req.params.id;
            const film = yield (0, filmsController_1.getFilmByid)(id);
            res.send(film);
        }
    }
    catch (e) {
        res.status(500).send("Error fetching film data");
    }
}));
exports.default = filmsRouter;
