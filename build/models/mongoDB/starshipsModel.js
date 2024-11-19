"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.starshipsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const starshipsCollection = "starships";
const starshipsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    cost_in_credits: { type: String, required: true },
    length: { type: String, required: true },
    max_atmosphering_speed: { type: String, required: true },
    crew: { type: String, required: true },
    passengers: { type: String },
    cargo_capacity: { type: String, required: true },
    consumables: { type: String, required: true },
    hyperdrive_rating: { type: String, required: true },
    MGLT: { type: String, required: true },
    starship_class: { type: String, required: true },
    pilots: [{ type: String, ref: 'peoples' }],
    films: [{ type: String, ref: 'films' }],
    created: { type: String, required: true },
    edited: { type: String, required: true },
    url: { type: String, required: true, unique: true },
});
starshipsSchema.plugin(mongoose_paginate_v2_1.default);
starshipsSchema.index({ url: 1 });
const starshipsModel = mongoose_1.default.model(starshipsCollection, starshipsSchema);
exports.starshipsModel = starshipsModel;
