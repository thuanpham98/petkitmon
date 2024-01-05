import { IPokemon, PokemonsType } from "@/domains/pokemons";
import { PokemonController } from "@/infrastructures/pokemon-api/PokemonController";

export class PokemonRepository implements IPokemon {
  private _client: PokemonController;

  constructor() {
    this._client = new PokemonController();
  }
  public async listPokemonTypes(): Promise<PokemonsType[]> {
    const resp = await this._client.getListPokemonType();
    console.log(resp);
    return [];
  }
}
