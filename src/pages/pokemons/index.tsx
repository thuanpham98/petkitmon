import "./style.less";
import { rdLoading, useRdApp, useRdBloc, useRdQuery } from "@radts/reactjs";
import { AppRepository } from "@/applications/services/app-repository";
import { Environment } from "@/applications/services/environment";
import { pokemonTypeColor } from "@/domains/pokemons";
import { ItemPokemon } from "./components/ItemPokemon";
import { Pagination } from "antd";

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

  // const { data: dataPokemonByType, isLoading: loadingPokemonByType } =
  //   useRdQuery({
  //     queryKey: ["list-pokemon-by-type", state.selectedType],
  //     enabled: !loadingType,
  //     queryFn: async () => {
  //       if (state.selectedType.length > 0) {
  //         const ret = await modules
  //           ?.get<AppRepository>("AppRepository")
  //           .poke.listPokemonsByType(state.selectedType[0]);
  //         return ret ?? [];
  //       } else {
  //         state.pokemons.clear();
  //         setState();
  //         return [];
  //       }
  //     },
  //   });

  const {
    data: dataPokemons,
    isLoading: loadingPokemons,
    isRefetching: fetchingPokemons,
    refetch: refetchPokemons,
  } = useRdQuery({
    queryKey: ["list-pokemon-page-size", state.selectedType.length],
    queryFn: async () => {
      const ret = await modules
        ?.get<AppRepository>("AppRepository")
        .poke.listPokemons({
          offset: state.page * state.pageSize,
          pageSize: state.pageSize,
        });
      return ret ?? null;
    },
  });

  function onReset() {
    state.selectedType = [];
    setState();
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
              <div
                onClick={() => {
                  if (state.selectedType.includes(d.name)) {
                    state.selectedType = state.selectedType.filter(
                      (e) => e !== d.name,
                    );
                  } else {
                    state.selectedType.push(d.name);
                  }
                  setState();
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
              </div>
            );
          })}
        <div
          className="item"
          style={{
            transition: "none",
            transform: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            cursor: "auto",
          }}
        >
          <img
            onClick={() => {
              onReset();
            }}
            style={{ width: "48px", height: "48px", cursor: "pointer" }}
            src={`${Environment.host}/icons/ic-reset.svg`}
          />
        </div>
      </div>

      {!loadingPokemons && dataPokemons && (
        <Pagination
          onChange={async (p, ps) => {
            state.page = p - 1;
            state.pageSize = ps;
            await refetchPokemons();
          }}
          defaultCurrent={1}
          defaultPageSize={50}
          total={dataPokemons.total}
        />
      )}

      <div className="pokemon-page__list-pokemons ">
        {/* {loadingPokemonByType && !dataPokemonByType ? (
          <></>
        ) : (
          <>
            {dataPokemonByType?.map((pokemon) => {
              return <ItemPokemon pokemon={pokemon} key={pokemon.name} />;
            })}
          </>
        )} */}
        {(loadingPokemons || fetchingPokemons) && !dataPokemons ? (
          <></>
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
