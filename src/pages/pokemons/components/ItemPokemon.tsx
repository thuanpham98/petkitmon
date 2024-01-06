import { PokemonItemEntity } from "@/domains/pokemons";
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
        if (_types.length) {
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
      <span>{pokemon.name}</span>
    </div>
  );
};

