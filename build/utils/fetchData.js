"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlanets = fetchPlanets;
exports.fetchFilms = fetchFilms;
exports.fetchPeople = fetchPeople;
exports.fetchStarships = fetchStarships;
const axios_1 = __importDefault(require("axios"));
//Fetching data from SWAPI
function fetchPlanets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let planets = [];
            let url = `https://swapi.dev/api/planets/?page=1`;
            while (url) {
                const response = yield axios_1.default.get(url);
                planets = planets.concat(response.data.results);
                url = response.data.next;
            }
            return planets;
        }
        catch (error) {
            throw error;
        }
    });
}
function fetchFilms() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let films = [];
            let url = `https://swapi.dev/api/films/?page=1`;
            while (url) {
                const response = yield axios_1.default.get(url);
                films = films.concat(response.data.results);
                url = response.data.next;
            }
            return films;
        }
        catch (error) {
            throw error;
        }
    });
}
function fetchPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let people = [];
            let url = `https://swapi.dev/api/people/?page=1`;
            while (url) {
                const response = yield axios_1.default.get(url);
                people = people.concat(response.data.results);
                url = response.data.next;
            }
            return people;
        }
        catch (error) {
            throw error;
        }
    });
}
function fetchStarships() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let starships = [];
            let url = `https://swapi.dev/api/starships/?page=1`;
            while (url) {
                const response = yield axios_1.default.get(url);
                starships = starships.concat(response.data.results);
                url = response.data.next;
            }
            return starships;
        }
        catch (error) {
            throw error;
        }
    });
}
