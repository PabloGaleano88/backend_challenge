import { PaginateResult } from "mongoose";
import { filmsModel } from "../models/mongoDB/filmsModel";
import { FilmType } from "../types";

export async function getfilms(title: string | null, limit: number, page: number, sort: { [key: string]: number }): Promise<PaginateResult<FilmType> | FilmType[]> {
    let filter = {}
    if (title) {
        let formatTitle = title.trim().replace(/\s+/g, ' ');
        filter = { title: { $regex: formatTitle, $options: 'i' } };
    }
    try {
        const film = await filmsModel.paginate(filter, {
            limit: limit,
            page: page,
            sort: sort,
            lean: true,
            populate: [{
                path: 'characters',
                model: 'peoples',
                foreignField: 'url',
                select: 'name -url -_id'
            }, {
                path: 'planets',
                model: 'planets',
                foreignField: 'url',
                select: 'name -url -_id'
            }, {
                path: 'starships',
                model: 'starships',
                foreignField: 'url',
                select: 'name -url -_id'
            }]
        });

        return film;
    } catch (error) {
        throw error;
    }
}
