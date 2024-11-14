import mongoose, { PaginateModel } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import { PersonType } from "../../types"


const peopleCollection = "peoples"

const peopleSchema = new mongoose.Schema<PersonType>({
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
})

peopleSchema.plugin(mongoosePaginate)

peopleSchema.index({ url: 1 });

const peopleModel = mongoose.model<PersonType, PaginateModel<PersonType>>(peopleCollection, peopleSchema)

export { peopleModel }

