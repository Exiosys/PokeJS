import axios from 'axios'

export default class DAO {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://pokeapi.co/api/v2/',
            timeout: 10000,
        })
    }

    async getPokemons(offset, limit) {
        let rep = {};
        await this.axios.get('pokemon/',{
            params: {
                offset: offset,
                limit: limit,
            }})
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getPokemonInfo(pokemon) {
        let rep = {};
        await this.axios.get('pokemon/' + pokemon)
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getType() {
        let rep = {};
        await this.axios.get('type')
            .then((response) => {
                rep = response.data;
            });
        return rep;
    }

    async getMove(number) {
        let rep = {};
        await this.axios.get('move/' + number)
            .then((response) => {
                rep = response.data;
            });
        return rep;
    }

    async getPokemonByType(theType) {
        let rep = {};
        await this.axios.get('type/' + theType)
            .then((response) => {
                rep = response.data;
            });
        return rep;
    }

    async getPokemonByID(id) {
        let rep = {};
        await this.axios.get('pokemon/' + id)
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getCharacteristicByID(id) {
        let rep = {};
        await this.axios.get('characteristic/' + id)
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getSpeciesByID(id) {
        let rep = {};
        await this.axios.get('pokemon-species/' + id)
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getEvolutionByURL(url) {
        let rep = {};
        await this.axios.get(url.url.split("/").slice(5,-1).join("/"))
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getPokemonByURL(url) {
        let rep = {};
        await this.axios.get(url.split("/").slice(5,-1).join("/"))
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getPokemonMovesByURL(url) {
        let rep = {};
        await this.axios.get(url.split("/").slice(5,-1).join("/"))
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getItemInfoByURL(url) {
        let rep = {};
        await this.axios.get(url.split("/").slice(5,-1).join("/"))
            .then((response) =>  {
                rep = response.data;
            });
        return rep;
    }

    async getAllRegion() {
        let rep = {};
        await this.axios.get("region")
            .then((response) => {
                rep = response.data;
            })
            return rep;
    }

}
