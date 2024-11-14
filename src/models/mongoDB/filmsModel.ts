import mongoose, { PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import { FilmType } from "../../types"


const filmsCollection = "films"

const filmsSchema = new mongoose.Schema<FilmType>({
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
})

filmsSchema.plugin(mongoosePaginate)


filmsSchema.index({ url: 1 });

const filmsModel = mongoose.model<FilmType, PaginateModel<FilmType>>(filmsCollection, filmsSchema)

export { filmsModel }