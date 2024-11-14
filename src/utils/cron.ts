import * as fetchData from "./fetchData"
import { planetsModel } from "../models/mongoDB/planetsModel";
import { peopleModel } from "../models/mongoDB/peopleModel";
import { starshipsModel } from "../models/mongoDB/starshipsModel";
import { filmsModel } from "../models/mongoDB/filmsModel";

export async function savePlanetsToMongoDB() {
    try {
        const planets = await fetchData.fetchPlanets();

        for (const planet of planets) {
            const existingPlanet = await planetsModel.findOne({ url: planet.url });

            if (existingPlanet) {
                await planetsModel.updateOne(
                    { url: planet.url },
                    {
                        $set: {
                            name: planet.name,
                            rotation_period: planet.rotation_period,
                            orbital_period: planet.orbital_period,
                            diameter: planet.diameter,
                            climate: planet.climate,
                            gravity: planet.gravity,
                            terrain: planet.terrain,
                            surface_water: planet.surface_water,
                            population: planet.population,
                            residents: planet.residents,
                            films: planet.films,
                            created: planet.created,
                            edited: planet.edited
                        }
                    }
                );
            } else {
                await planetsModel.create({
                    name: planet.name,
                    rotation_period: planet.rotation_period,
                    orbital_period: planet.orbital_period,
                    diameter: planet.diameter,
                    climate: planet.climate,
                    gravity: planet.gravity,
                    terrain: planet.terrain,
                    surface_water: planet.surface_water,
                    population: planet.population,
                    residents: planet.residents,
                    films: planet.films,
                    created: planet.created,
                    edited: planet.edited,
                    url: planet.url,
                });
            }
        }

        const apiUrls = planets.map(p => p.url);
        await planetsModel.deleteMany({ url: { $nin: apiUrls } });

        return "Planets data synchronized with MongoDB";

    } catch (error) {
        return `An error occurred while trying to save Planets data to MongoDB: ${error}`;
    }
}

export async function savePeopleToMongoDB() {
    try {
        const people = await fetchData.fetchPeople();

        for (const person of people) {
            const existingPerson = await peopleModel.findOne({ url: person.url });

            if (existingPerson) {
                await peopleModel.updateOne(
                    { url: person.url },
                    {
                        $set: {
                            name: person.name,
                            height: person.height,
                            mass: person.mass,
                            hair_color: person.hair_color,
                            skin_color: person.skin_color,
                            eye_color: person.eye_color,
                            birth_year: person.birth_year,
                            gender: person.gender,
                            homeworld: person.homeworld,
                            films: person.films,
                            species: person.species,
                            vehicles: person.vehicles,
                            starships: person.starships,
                            created: person.created,
                            edited: person.edited
                        }
                    }
                );
            } else {
                await peopleModel.create({
                    name: person.name,
                    height: person.height,
                    mass: person.mass,
                    hair_color: person.hair_color,
                    skin_color: person.skin_color,
                    eye_color: person.eye_color,
                    birth_year: person.birth_year,
                    gender: person.gender,
                    homeworld: person.homeworld,
                    films: person.films,
                    species: person.species,
                    vehicles: person.vehicles,
                    starships: person.starships,
                    created: person.created,
                    edited: person.edited,
                    url: person.url,
                });
            }
        }

        const apiUrls = people.map(p => p.url);
        await peopleModel.deleteMany({ url: { $nin: apiUrls } });

        return "People data synchronized with MongoDB";

    } catch (error) {
        return `Error while syncing people data: ${error}`;
    }
}


export async function saveStarshipsToMongoDB() {
    try {
        const starships = await fetchData.fetchStarships();

        for (const starship of starships) {
            const existingStarship = await starshipsModel.findOne({ url: starship.url });

            if (existingStarship) {
                await starshipsModel.updateOne(
                    { url: starship.url },
                    {
                        $set: {
                            name: starship.name,
                            model: starship.model,
                            manufacturer: starship.manufacturer,
                            cost_in_credits: starship.cost_in_credits,
                            length: starship.length,
                            max_atmosphering_speed: starship.max_atmosphering_speed,
                            crew: starship.crew,
                            passengers: starship.passengers,
                            cargo_capacity: starship.cargo_capacity,
                            consumables: starship.consumables,
                            hyperdrive_rating: starship.hyperdrive_rating,
                            MGLT: starship.MGLT,
                            starship_class: starship.starship_class,
                            pilots: starship.pilots,
                            films: starship.films,
                            created: starship.created,
                            edited: starship.edited
                        }
                    }
                );
            } else {
                await starshipsModel.create({
                    name: starship.name,
                    model: starship.model,
                    manufacturer: starship.manufacturer,
                    cost_in_credits: starship.cost_in_credits,
                    length: starship.length,
                    max_atmosphering_speed: starship.max_atmosphering_speed,
                    crew: starship.crew,
                    passengers: starship.passengers,
                    cargo_capacity: starship.cargo_capacity,
                    consumables: starship.consumables,
                    hyperdrive_rating: starship.hyperdrive_rating,
                    MGLT: starship.MGLT,
                    starship_class: starship.starship_class,
                    pilots: starship.pilots,
                    films: starship.films,
                    created: starship.created,
                    edited: starship.edited,
                    url: starship.url,
                });
            }
        }

        const apiUrls = starships.map(s => s.url);
        await starshipsModel.deleteMany({ url: { $nin: apiUrls } });

        return "Starships data synchronized with MongoDB";

    } catch (error) {
        return `Error while syncing starships data: ${error}`;
    }
}

export async function saveFilmsToMongoDB() {
    try {
        const films = await fetchData.fetchFilms();

        for (const film of films) {
            const existingFilm = await filmsModel.findOne({ url: film.url });

            if (existingFilm) {
                await filmsModel.updateOne(
                    { url: film.url },
                    {
                        $set: {
                            title: film.title,
                            episode_id: film.episode_id,
                            opening_crawl: film.opening_crawl,
                            director: film.director,
                            producer: film.producer,
                            release_date: film.release_date,
                            characters: film.characters,
                            planets: film.planets,
                            starships: film.starships,
                            vehicles: film.vehicles,
                            species: film.species,
                            created: film.created,
                            edited: film.edited
                        }
                    }
                );
            } else {
                await filmsModel.create({
                    title: film.title,
                    episode_id: film.episode_id,
                    opening_crawl: film.opening_crawl,
                    director: film.director,
                    producer: film.producer,
                    release_date: film.release_date,
                    characters: film.characters,
                    planets: film.planets,
                    starships: film.starships,
                    vehicles: film.vehicles,
                    species: film.species,
                    created: film.created,
                    edited: film.edited,
                    url: film.url,
                });
            }
        }

        const apiUrls = films.map(f => f.url);
        await filmsModel.deleteMany({ url: { $nin: apiUrls } });

        return "Films data synchronized with MongoDB";

    } catch (error) {
        return `Error while syncing films data: ${error}`;
    }
}
