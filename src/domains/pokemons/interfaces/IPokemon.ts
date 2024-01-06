import { PokemonItemEntity, PokemonsType } from "..";

export interface IPokemon {
  listPokemonTypes(): Promise<Array<PokemonsType>>;
  listPokemonsByType(type: string): Promise<Array<PokemonItemEntity>>;
  listPokemons({
    offset,
    pageSize,
  }: {
    offset: number;
    pageSize: number;
  }): Promise<{
    total: number;
    data: Array<PokemonItemEntity>;
  }>;
}
