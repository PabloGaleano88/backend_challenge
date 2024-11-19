"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peopleModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const peopleCollection = "peoples";
const peopleSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    height: { type: String, required: true },
    mass: { type: String, required: true },
    hair_color: { type: String, required: true },
    skin_color: { type: String, required: true },
    eye_color: { type: String, required: true },
    birth_year: { type: String, required: true },
    gender: { type: String },
    homeworld: [{ type: String, ref: 'planets' }],
    films: [{ type: String, ref: 'films' }],
    species: { type: [String], required: true },
    vehicles: { type: [String], required: true },
    starships: [{ type: String, ref: 'starships' }],
    created: { type: String, required: true },
    edited: { type: String, required: true },
    url: { type: String, required: true, unique: true },
});
peopleSchema.plugin(mongoose_paginate_v2_1.default);
peopleSchema.index({ url: 1 });
const peopleModel = mongoose_1.default.model(peopleCollection, peopleSchema);
exports.peopleModel = peopleModel;
