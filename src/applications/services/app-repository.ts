import { RdModule } from "@radts/reactjs";
import axios from "axios";
import { PokemonRepository } from "../repositories/PokemonRepository";

export class AppRepository extends RdModule {
  public readonly key: symbol;

  public readonly poke: PokemonRepository;

  constructor() {
    super();
    this.key = Symbol("AppRepository");

    // core bank
    this.poke = new PokemonRepository();

    // asios
    axios.defaults.timeout = 120 * 1000;
  }

  public getName(): string {
    return this.key.description ?? "AppRepository";
  }
}
