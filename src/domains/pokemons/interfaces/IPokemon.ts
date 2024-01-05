import { PokemonsType } from "..";

export interface IPokemon {
  listPokemonTypes(): Promise<PokemonsType[]>;
}
