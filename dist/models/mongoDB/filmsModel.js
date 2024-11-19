"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const filmsCollection = "films";
const filmsSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    episode_id: { type: Number, required: true },
    opening_crawl: { type: String, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
    release_date: { type: String, required: true },
    characters: [{ type: String, ref: 'peoples' }],
    planets: [{ type: String, ref: 'planets' }],
    starships: [{ type: String, ref: 'starships' }],
    vehicles: { type: [String], required: true },
    species: { type: [String], required: true },
    created: { type: String, required: true },
    edited: { type: String, required: true },
    url: { type: String, required: true, unique: true },
});
filmsSchema.plugin(mongoose_paginate_v2_1.default);
filmsSchema.index({ url: 1 });
const filmsModel = mongoose_1.default.model(filmsCollection, filmsSchema);
exports.filmsModel = filmsModel;
