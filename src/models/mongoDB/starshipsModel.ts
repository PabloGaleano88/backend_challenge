import mongoose, { PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import { StarshipType } from "../../types"


const starshipsCollection = "starships"

const starshipsSchema = new mongoose.Schema<StarshipType>({
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
})

starshipsSchema.plugin(mongoosePaginate)

starshipsSchema.index({ url: 1 });

const starshipsModel = mongoose.model<StarshipType, PaginateModel<StarshipType>>(starshipsCollection, starshipsSchema)


export { starshipsModel }