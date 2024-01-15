import { IPokemon, PokemonItemEntity, PokemonsType } from "@/domains/pokemons";
import { PokemonController } from "@/infrastructures/pokemon-api/PokemonController";

export class PokemonRepository implements IPokemon {
  private _client: PokemonController;

  constructor() {
    this._client = new PokemonController();
  }
  public async listPokemonTypes(): Promise<Array<PokemonsType>> {
    const resp = await this._client.getListPokemonType();
    return resp.results.map((d: { name: string; url: string }) => {
      return {
        name: d.name,
        url: d.url,
      };
    });
  }

  public async listPokemonsByType(type: string): Promise<PokemonItemEntity[]> {
    const resp = await this._client.getListPokemonByType(type);
    return resp.map((d: { pokemon: { name: string; url: string } }) => {
      return {
        name: d.pokemon.name,
        url: d.pokemon.url,
      };
    });
  }

  public async listPokemons({
    offset,
    pageSize,
  }: {
    offset: number;
    pageSize: number;
  }): Promise<{
    total: number;
    data: Array<PokemonItemEntity>;
  }> {
    const resp = await this._client.getPokemons({
      offset: offset,
      pageSize: pageSize,
    });
    return {
      data: resp.results,
      total: resp.count,
    };
  }
}
