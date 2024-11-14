import { StarshipType } from "../types";
import { starshipsModel } from "../models/mongoDB/starshipsModel";
import { PaginateResult } from "mongoose";

export async function getStarship(name: string | null, limit: number, page: number, sort: { [key: string]: number }): Promise<PaginateResult<StarshipType> | StarshipType[]> {
    let filter = {}
    if (name) {
        let formatName = name.trim().replace(/\s+/g, ' ');
        filter = { name: { $regex: formatName, $options: 'i' } };
    }
    try {
        const starship = await starshipsModel.paginate((filter), {
            limit: limit,
            page: page,
            sort: sort,
            lean: true,
            populate: [{
                path: 'pilots',
                model: 'peoples',
                foreignField: 'url',
                select: 'name -url -_id'
            }, {
                path: 'films',
                model: 'films',
                foreignField: 'url',
                select: 'title -url -_id'
            },]
        })
        return starship
    }
    catch (error) {
        throw error
    }
}