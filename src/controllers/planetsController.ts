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
        const people = await planetsModel.paginate((filter), {
            limit: limit,
            page: page,
            sort: sort,
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
        return people
    } catch (error) {
        throw error
    }

}
