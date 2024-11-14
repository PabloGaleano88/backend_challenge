import { PersonType } from "../types";
import { peopleModel } from "../models/mongoDB/peopleModel";
import { PaginateResult } from "mongoose";

export async function getpeople(name: string | null, limit: number, page: number, sort: { [key: string]: number }): Promise<PaginateResult<PersonType> | PersonType[]> {
    let filter = {}
    if (name) {
        let formatName = name.trim().replace(/\s+/g, ' ');
        filter = { name: { $regex: formatName, $options: 'i' } };
    }
    try {
        const people = await peopleModel.paginate((filter), {
            limit: limit,
            page: page,
            sort: sort,
            lean: true,
            populate: [{
                path: 'homeworld',
                model: 'planets',
                foreignField: 'url',
                select: 'name -url -_id'
            }, {
                path: 'starships',
                model: 'starships',
                foreignField: 'url',
                select: 'name -url -_id'
            }, {
                path: 'films',
                model: 'films',
                foreignField: 'url',
                select: 'title -url -_id'
            },
            ]
        })
        return people
    }
    catch (error) {
        throw error
    }

}

