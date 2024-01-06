import { PokemonItemEntity, pokemonTypeColor } from "@/domains/pokemons";
import { FC } from "react";
import "./style.less";
import { RdImage, useRdApp, useRdQuery } from "@radts/reactjs";
import { AppRepository } from "@/applications/services/app-repository";
import axios from "axios";

interface ItemPokemonProps {
  pokemon: PokemonItemEntity;
  selectedType: Array<string>;
}

export const ItemPokemon: FC<ItemPokemonProps> = ({
  pokemon,
  selectedType,
}) => {
  const { data, isLoading, isError } = useRdQuery({
    queryKey: ["get-pokemon", selectedType.length, pokemon.name],
    queryFn: async () => {
      const rest = (await axios.get(`${pokemon.url}`)).data;
      if (selectedType.length) {
        const _types: string[] = rest.types.filter((e: any) => {
          const _type: string = e.type.name;
          return selectedType.includes(_type);
        });
        if (_types.length && selectedType.length === _types.length) {
          return rest;
        } else {
          throw "error";
        }
      } else {
        return rest;
      }
    },
  });

  if (isLoading || isError) {
    return <></>;
  }

  console.log(data);

  return (
    <div onClick={() => {}} className="item-pokemon" key={pokemon.name}>
      {data.sprites.other.showdown.front_shiny ||
      data.sprites.other.official_artwork ? (
        <img
          src={
            data.sprites.other.showdown.front_shiny ??
            data.sprites.other.official_artwork
          }
        />
      ) : (
        <svg
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="360" height="360" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_436_202765" transform="scale(0.015625)" />
            </pattern>
            <image
              id="image0_436_202765"
              width="64"
              height="64"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA40lEQVR4Xu3bQQ6EQAhEUbj/oXsO8Sdh4XOvJAi/qkF3Zt6E6710++xuiD6T40uACtACqYlzD2IACFKBkoHcgmSQDJJBMngKIT6ADygF6DSYfcCLTzg/z0eGrASogDbT0gKxB2MB5pkiBoBgrEEMwIBjLx9fAAiCIAhygmkkRgYjhWMHditsL2AvYC+QIHjdwzk+BmAABmBAWc1kCF0bKRAEQRAEQRAMGaACbaCUz/P5BRiKxhQaiV07uRjfYgQDMKDpGAhGCMUCzD4CBEEw1iAGYIBPZMJh+g8/P8cKpAJfV4EfMee/sLtaEFIAAAAASUVORK5CYII="
            />
          </defs>
        </svg>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {data.types.map((d: any) => {
          return (
            <span
              key={d.type.name}
              style={{
                backgroundColor: `${pokemonTypeColor.get(d.type.name)}`,
                padding: "4px",
                borderRadius: "24px",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {d.type.name}
            </span>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "600" }}>{pokemon.name}</span>
        <span style={{ fontWeight: "400" }}>{` (${data.weight / 10}kg/${
          data.height / 10
        }m)`}</span>
      </div>
    </div>
  );
};
