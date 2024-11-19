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
exports.getpeople = getpeople;
exports.getCharacterById = getCharacterById;
const peopleModel_1 = require("../models/mongoDB/peopleModel");
function getpeople(name, limit, page, sort) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = {};
        if (name) {
            let formatName = name.trim().replace(/\s+/g, ' ');
            filter = { name: { $regex: formatName, $options: 'i' } };
        }
        try {
            const people = yield peopleModel_1.peopleModel.paginate((filter), {
                limit: limit,
                page: page,
                sort: sort,
                collation: { locale: "en", strength: 1 },
                lean: true,
                populate: [{
                        path: 'homeworld',
                        model: 'planets',
                        foreignField: 'url',
                        select: 'name -url -_id'
                    }, {
                        path: 'starships',
                        model: 'starships',
                        foreignField: 'url',
                        select: 'name -url -_id'
                    }, {
                        path: 'films',
                        model: 'films',
                        foreignField: 'url',
                        select: 'title -url -_id'
                    },
                ]
            });
            return people;
        }
        catch (error) {
            throw error;
        }
    });
}
function getCharacterById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const people = yield peopleModel_1.peopleModel.findById(id)
                .populate({
                path: 'homeworld',
                model: 'planets',
                foreignField: 'url',
                select: 'name -url -_id'
            })
                .populate({
                path: 'starships',
                model: 'starships',
                foreignField: 'url',
                select: 'name -url -_id'
            })
                .populate({
                path: 'films',
                model: 'films',
                foreignField: 'url',
                select: 'title -url -_id'
            });
            if (people) {
                return people;
            }
            else {
                throw new Error(`Character with ID ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error fetching character`);
        }
    });
}
