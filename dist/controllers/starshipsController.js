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
exports.getStarship = getStarship;
exports.getStarshipById = getStarshipById;
const starshipsModel_1 = require("../models/mongoDB/starshipsModel");
function getStarship(name, limit, page, sort) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = {};
        if (name) {
            let formatName = name.trim().replace(/\s+/g, ' ');
            filter = { name: { $regex: formatName, $options: 'i' } };
        }
        try {
            const starship = yield starshipsModel_1.starshipsModel.paginate((filter), {
                limit: limit,
                page: page,
                sort: sort,
                collation: { locale: "en", strength: 1 },
                lean: true,
                populate: [{
                        path: 'pilots',
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
            return starship;
        }
        catch (error) {
            throw error;
        }
    });
}
function getStarshipById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const starship = yield starshipsModel_1.starshipsModel.findById(id)
                .populate({
                path: 'pilots',
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
            if (starship) {
                return starship;
            }
            else {
                throw new Error(`Starship with ID ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error fetching starship`);
        }
    });
}
