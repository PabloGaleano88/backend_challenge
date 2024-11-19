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
            collation: { locale: "en", strength: 1 },
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

export async function getStarshipById(id: string): Promise<StarshipType> {
    try {
        const starship = await starshipsModel.findById(id)
            .populate({
                path: 'pilots',
                model: 'peoples',
                foreignField: 'url',
                select: 'name -url -_id'
            })
            .populate({
                path: 'films',
                model: 'films',
                foreignField: 'url',
                select: 'title -url -_id'
            });
        if (starship) {
            return starship;
        } else {
            throw new Error(`Starship with ID ${id} not found`);
        }
    }
    catch (error) {
        throw new Error(`Error fetching starship`);
    }
}