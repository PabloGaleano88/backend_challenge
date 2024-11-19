import axios from "axios"
import { PlanetType, PersonType, FilmType, StarshipType, ApiResponse } from "../types";

//Fetching data from SWAPI

export async function fetchPlanets(): Promise<PlanetType[]> {
    try {

        let planets: PlanetType[] = []
        let url: string | null = `https://swapi.dev/api/planets/?page=1`

        while (url) {
            const response: { data: ApiResponse<PlanetType> } = await axios.get<ApiResponse<PlanetType>>(url);
            planets = planets.concat(response.data.results);
            url = response.data.next;
        }

        return planets;
    } catch (error) {
        throw error
    }
}

export async function fetchFilms(): Promise<FilmType[]> {
    try {

        let films: FilmType[] = []
        let url: string | null = `https://swapi.dev/api/films/?page=1`

        while (url) {
            const response: { data: ApiResponse<FilmType> } = await axios.get<ApiResponse<FilmType>>(url);
            films = films.concat(response.data.results);
            url = response.data.next;
        }

        return films;
    } catch (error) {
        throw error
    }
}

export async function fetchPeople(): Promise<PersonType[]> {
    try {

        let people: PersonType[] = []
        let url: string | null = `https://swapi.dev/api/people/?page=1`

        while (url) {
            const response: { data: ApiResponse<PersonType> } = await axios.get<ApiResponse<PersonType>>(url);
            people = people.concat(response.data.results);
            url = response.data.next;
        }

        return people;
    } catch (error) {
        throw error
    }
}

export async function fetchStarships(): Promise<StarshipType[]> {
    try {

        let starships: StarshipType[] = []
        let url: string | null = `https://swapi.dev/api/starships/?page=1`

        while (url) {
            const response: { data: ApiResponse<StarshipType> } = await axios.get<ApiResponse<StarshipType>>(url);
            starships = starships.concat(response.data.results);
            url = response.data.next;
        }

        return starships;
    } catch (error) {
        throw error
    }
}