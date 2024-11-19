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
exports.getfilms = getfilms;
exports.getFilmByid = getFilmByid;
const filmsModel_1 = require("../models/mongoDB/filmsModel");
function getfilms(title, limit, page, sort) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = {};
        if (title) {
            let formatTitle = title.trim().replace(/\s+/g, ' ');
            filter = { title: { $regex: formatTitle, $options: 'i' } };
        }
        try {
            const film = yield filmsModel_1.filmsModel.paginate(filter, {
                limit: limit,
                page: page,
                sort: sort,
                collation: { locale: "en", strength: 1 },
                lean: true,
                populate: [{
                        path: 'characters',
                        model: 'peoples',
                        foreignField: 'url',
                        select: 'name -url -_id'
                    }, {
                        path: 'planets',
                        model: 'planets',
                        foreignField: 'url',
                        select: 'name -url -_id'
                    }, {
                        path: 'starships',
                        model: 'starships',
                        foreignField: 'url',
                        select: 'name -url -_id'
                    }]
            });
            return film;
        }
        catch (error) {
            throw error;
        }
    });
}
function getFilmByid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const film = yield filmsModel_1.filmsModel.findById(id)
                .populate({
                path: 'characters',
                model: 'peoples',
                foreignField: 'url',
                select: 'name -url -_id'
            })
                .populate({
                path: 'planets',
                model: 'planets',
                foreignField: 'url',
                select: 'name -url -_id'
            })
                .populate({
                path: 'starships',
                model: 'starships',
                foreignField: 'url',
                select: 'name -url -_id'
            });
            if (film) {
                return film;
            }
            else {
                throw new Error(`Film with ID ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error fetching film`);
        }
    });
}
