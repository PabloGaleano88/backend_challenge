"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const planetsCollection = "planets";
const planetsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    rotation_period: { type: String, required: true },
    orbital_period: { type: String, required: true },
    diameter: { type: String, required: true },
    climate: { type: String, required: true },
    gravity: { type: String, required: true },
    terrain: { type: String, required: true },
    surface_water: { type: String },
    population: { type: String, required: true },
    residents: [{ type: String, ref: 'peoples' }],
    films: [{ type: String, ref: 'films' }],
    created: { type: String, required: true },
    edited: { type: String, required: true },
    url: { type: String, required: true, unique: true },
});
planetsSchema.plugin(mongoose_paginate_v2_1.default);
planetsSchema.index({ url: 1 });
const planetsModel = mongoose_1.default.model(planetsCollection, planetsSchema);
exports.planetsModel = planetsModel;
