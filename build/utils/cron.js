"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePlanetsToMongoDB = savePlanetsToMongoDB;
exports.savePeopleToMongoDB = savePeopleToMongoDB;
exports.saveStarshipsToMongoDB = saveStarshipsToMongoDB;
exports.saveFilmsToMongoDB = saveFilmsToMongoDB;
const fetchData = __importStar(require("./fetchData"));
const planetsModel_1 = require("../models/mongoDB/planetsModel");
const peopleModel_1 = require("../models/mongoDB/peopleModel");
const starshipsModel_1 = require("../models/mongoDB/starshipsModel");
const filmsModel_1 = require("../models/mongoDB/filmsModel");
function savePlanetsToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const planets = yield fetchData.fetchPlanets();
            for (const planet of planets) {
                const existingPlanet = yield planetsModel_1.planetsModel.findOne({ url: planet.url });
                if (existingPlanet) {
                    yield planetsModel_1.planetsModel.updateOne({ url: planet.url }, {
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
                    });
                }
                else {
                    yield planetsModel_1.planetsModel.create({
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
            yield planetsModel_1.planetsModel.deleteMany({ url: { $nin: apiUrls } });
            return "Planets data synchronized with MongoDB";
        }
        catch (error) {
            return `An error occurred while trying to save Planets data to MongoDB: ${error}`;
        }
    });
}
function savePeopleToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const people = yield fetchData.fetchPeople();
            for (const person of people) {
                const existingPerson = yield peopleModel_1.peopleModel.findOne({ url: person.url });
                if (existingPerson) {
                    yield peopleModel_1.peopleModel.updateOne({ url: person.url }, {
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
                    });
                }
                else {
                    yield peopleModel_1.peopleModel.create({
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
            yield peopleModel_1.peopleModel.deleteMany({ url: { $nin: apiUrls } });
            return "People data synchronized with MongoDB";
        }
        catch (error) {
            return `Error while syncing people data: ${error}`;
        }
    });
}
function saveStarshipsToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const starships = yield fetchData.fetchStarships();
            for (const starship of starships) {
                const existingStarship = yield starshipsModel_1.starshipsModel.findOne({ url: starship.url });
                if (existingStarship) {
                    yield starshipsModel_1.starshipsModel.updateOne({ url: starship.url }, {
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
                    });
                }
                else {
                    yield starshipsModel_1.starshipsModel.create({
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
            yield starshipsModel_1.starshipsModel.deleteMany({ url: { $nin: apiUrls } });
            return "Starships data synchronized with MongoDB";
        }
        catch (error) {
            return `Error while syncing starships data: ${error}`;
        }
    });
}
function saveFilmsToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const films = yield fetchData.fetchFilms();
            for (const film of films) {
                const existingFilm = yield filmsModel_1.filmsModel.findOne({ url: film.url });
                if (existingFilm) {
                    yield filmsModel_1.filmsModel.updateOne({ url: film.url }, {
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
                    });
                }
                else {
                    yield filmsModel_1.filmsModel.create({
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
            yield filmsModel_1.filmsModel.deleteMany({ url: { $nin: apiUrls } });
            return "Films data synchronized with MongoDB";
        }
        catch (error) {
            return `Error while syncing films data: ${error}`;
        }
    });
}
