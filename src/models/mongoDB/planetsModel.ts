import mongoose, { PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import { PlanetType } from "../../types"


const planetsCollection = "planets"

const planetsSchema = new mongoose.Schema<PlanetType>({
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
})

planetsSchema.plugin(mongoosePaginate)

planetsSchema.index({ url: 1 });

const planetsModel = mongoose.model<PlanetType, PaginateModel<PlanetType>>(planetsCollection, planetsSchema)

export { planetsModel }