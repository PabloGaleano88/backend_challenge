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
const starshipsController_1 = require("../controllers/starshipsController");
const starshipsRouter = (0, express_1.Router)();
starshipsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query) {
            const { limit, page, sort, name } = req.query;
            const limitQuery = limit ? parseInt(limit, 10) : 10;
            const pageQuery = page ? parseInt(page, 10) : 1;
            let sortQuery = {};
            if (sort) {
                if (sort === "desc") {
                    sortQuery = { name: -1 };
                }
                else {
                    sortQuery = { name: 1 };
                }
            }
            if (typeof (name) === "string") {
                const info = yield (0, starshipsController_1.getStarship)(name, limitQuery, pageQuery, sortQuery);
                res.send(info);
            }
            else {
                const info = yield (0, starshipsController_1.getStarship)(null, limitQuery, pageQuery, sortQuery);
                res.send(info);
            }
        }
    }
    catch (e) {
        res.status(500).send("Error fetching starships data");
    }
}));
starshipsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params) {
            const id = req.params.id;
            const starship = yield (0, starshipsController_1.getStarshipById)(id);
            res.send(starship);
        }
    }
    catch (e) {
        res.status(500).send("Error fetching starship data");
    }
}));
exports.default = starshipsRouter;
