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
            collation: { locale: "en", strength: 1 },
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

export async function getCharacterById(id: string): Promise<PersonType> {
    try {
        const people = await peopleModel.findById(id)
            .populate({
                path: 'homeworld',
                model: 'planets',
                foreignField: 'url',
                select: 'name -url -_id'
            })
            .populate({
                path: 'starships',
                model: 'starships',
                foreignField: 'url',
                select: 'name -url -_id'
            })
            .populate({
                path: 'films',
                model: 'films',
                foreignField: 'url',
                select: 'title -url -_id'
            });
        if (people) {
            return people;
        } else {
            throw new Error(`Character with ID ${id} not found`);
        }
    }
    catch (error) {
        throw new Error(`Error fetching character`);
    }
}