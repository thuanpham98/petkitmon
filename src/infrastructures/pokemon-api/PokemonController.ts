import axios from "axios";

export class PokemonController {
  public async getListPokemonType() {
    try {
      const resp = await axios.get("https://pokeapi.co/api/v2/type");

      return await resp.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async getListPokemonByType(type: string) {
    try {
      const resp = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      return resp.data.pokemon;
    } catch (error) {
      console.error(error);
    }
  }

  public async getPokemons({
    offset,
    pageSize,
  }: {
    offset: number;
    pageSize: number;
  }) {
    try {
      const resp = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`,
      );
      return resp.data;
    } catch (error) {
      console.error(error);
    }
  }
}
