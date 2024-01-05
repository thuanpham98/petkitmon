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
}
