import "./style.less";
import { useRdApp, useRdBloc, useRdQuery } from "@radts/reactjs";
import { AppRepository } from "@/applications/services/app-repository";
import { Environment } from "@/applications/services/environment";
import { PokemonItemEntity, pokemonTypeColor } from "@/domains/pokemons";
import { ItemPokemon } from "./components/ItemPokemon";
import { Pagination } from "antd";
import Loader from "@/components/loader/Loader";

interface PokemonsPageState {
  selectedType: Array<string>;
  pokemons: Set<string>;
  page: number;
  pageSize: number;
}

const PokemonsPage = () => {
  const { modules } = useRdApp();
  const [state, setState] = useRdBloc<PokemonsPageState>({
    selectedType: [],
    pokemons: new Set<string>([]),
    page: 0,
    pageSize: 50,
  });

  const { data: dataType, isLoading: loadingType } = useRdQuery({
    queryKey: ["list-type-pokemon"],
    queryFn: async () => {
      const rest =
        (await modules
          ?.get<AppRepository>("AppRepository")
          .poke.listPokemonTypes()) ?? [];
      return rest
        .filter((e) => e.name !== "unknown" && e.name !== "shadow")
        .sort((a, b) => (a.name > b.name ? 1 : -1));
    },
  });

  const {
    data: dataPokemons,
    isLoading: loadingPokemons,
    isRefetching: fetchingPokemons,
    refetch: refetchPokemons,
  } = useRdQuery({
    queryKey: ["list-pokemon-page-size", state.selectedType.length],
    queryFn: async () => {
      if (state.selectedType.length > 0) {
        const _callbacks = state.selectedType.map((url) => {
          return modules
            ?.get<AppRepository>("AppRepository")
            .poke.listPokemonsByType(url);
        });
        const ret = await Promise.all(_callbacks);
        const temp: PokemonItemEntity[] = Array.prototype.concat(...ret);
        const uniquePokemons: PokemonItemEntity[] = [
          ...new Set(temp.map((obj) => JSON.stringify(obj))),
        ].map((str) => JSON.parse(str));

        return {
          total: temp.length,
          data: uniquePokemons.splice(
            state.page * state.pageSize,
            state.pageSize,
          ),
        };
      }
      const ret = await modules
        ?.get<AppRepository>("AppRepository")
        .poke.listPokemons({
          offset: state.page * state.pageSize,
          pageSize: state.pageSize,
        });
      return ret ?? null;
    },
  });

  function onSelecType(name: string) {
    if (state.selectedType.includes(name)) {
      state.selectedType = state.selectedType.filter((e) => e !== name);
      state.page = 0;
      setState();
    } else if (state.selectedType.length < 2) {
      state.selectedType.push(name);
      state.page = 0;
      setState();
    }
  }

  if (loadingType) {
    return <></>;
  }

  return (
    <div className="pokemon-page">
      <div className="pokemon-page__list-type">
        {dataType &&
          dataType.map((d) => {
            return (
              <button
                onClick={() => {
                  onSelecType(d.name);
                }}
                style={{
                  borderColor: state.selectedType.includes(d.name)
                    ? `${pokemonTypeColor.get(d.name)}`
                    : undefined,
                }}
                className="item"
                key={d.name}
              >
                <img
                  src={`${Environment.host}/icons/pokemon-types/${d.name}.svg`}
                />
                <span
                  style={{
                    color: `${pokemonTypeColor.get(d.name)}`,
                  }}
                >
                  {d.name}
                </span>
              </button>
            );
          })}
      </div>

      {!loadingPokemons && dataPokemons && (
        <Pagination
          onChange={async (p, ps) => {
            state.page = p - 1;
            state.pageSize = ps;
            await refetchPokemons();
          }}
          defaultCurrent={state.page}
          defaultPageSize={state.pageSize}
          total={dataPokemons.total}
        />
      )}

      <div className="pokemon-page__list-pokemons ">
        {loadingPokemons || fetchingPokemons ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {dataPokemons?.data.map((pokemon) => {
              return (
                <ItemPokemon
                  selectedType={state.selectedType}
                  pokemon={pokemon}
                  key={pokemon.name}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonsPage;
