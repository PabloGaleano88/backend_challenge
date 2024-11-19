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
exports.getplanet = getplanet;
exports.getPlanetById = getPlanetById;
const planetsModel_1 = require("../models/mongoDB/planetsModel");
function getplanet(name, limit, page, sort) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = {};
        if (name) {
            let formatName = name.trim().replace(/\s+/g, ' ');
            filter = { name: { $regex: formatName, $options: 'i' } };
        }
        try {
            const planet = yield planetsModel_1.planetsModel.paginate((filter), {
                limit: limit,
                page: page,
                sort: sort,
                collation: { locale: "en", strength: 1 },
                lean: true,
                populate: [{
                        path: 'residents',
                        model: 'peoples',
                        foreignField: 'url',
                        select: 'name -url -_id'
                    }, {
                        path: 'films',
                        model: 'films',
                        foreignField: 'url',
                        select: 'title -url -_id'
                    },]
            });
            return planet;
        }
        catch (error) {
            throw error;
        }
    });
}
function getPlanetById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const planet = yield planetsModel_1.planetsModel.findById(id)
                .populate({
                path: 'residents',
                model: 'peoples',
                foreignField: 'url',
                select: 'name -url -_id'
            })
                .populate({
                path: 'films',
                model: 'films',
                foreignField: 'url',
                select: 'title -url -_id'
            });
            if (planet) {
                return planet;
            }
            else {
                throw new Error(`Planet with ID ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error fetching Planet`);
        }
    });
}
