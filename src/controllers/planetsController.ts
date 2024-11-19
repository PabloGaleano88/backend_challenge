import { PlanetType } from "../types";
import { planetsModel } from "../models/mongoDB/planetsModel"
import { PaginateResult } from "mongoose";

export async function getplanet(name: string | null, limit: number, page: number, sort: { [key: string]: number }): Promise<PaginateResult<PlanetType> | PlanetType[]> {
    let filter = {}
    if (name) {
        let formatName = name.trim().replace(/\s+/g, ' ');
        filter = { name: { $regex: formatName, $options: 'i' } };
    }
    try {
        const planet = await planetsModel.paginate((filter), {
            limit: limit,
            page: page,
            sort: sort,
            collation: { locale: "en", strength: 1 },
            lean: true,
            populate: [{
                path: 'residents',
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
        return planet
    } catch (error) {
        throw error
    }

}

export async function getPlanetById(id: string): Promise<PlanetType> {
    try {
        const planet = await planetsModel.findById(id)
            .populate({
                path: 'residents',
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
        if (planet) {
            return planet;
        } else {
            throw new Error(`Planet with ID ${id} not found`);
        }
    }
    catch (error) {
        throw new Error(`Error fetching Planet`);
    }
}