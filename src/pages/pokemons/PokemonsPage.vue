<script setup lang="ts">
import { AppRepository } from '@/applications/services/app-repository';
import { Environment } from '@/applications/services/environment';
import { PokemonItemEntity, pokemonTypeColor } from '@/domains/pokemons';
import { modManager } from '@/main';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const selectedTypePoke = ref<string[]>([]);
const paging = ref<{
  page: number;
  pageSize: number;
}>({
  page: 0,
  pageSize: 50
});

// quey pokemon type
const queryPokeType = useQuery({
  queryKey: ['list-pokemon-type'], queryFn: async () => {
    const ret = await modManager.get<AppRepository>('AppRepository').poke.listPokemonTypes();
    return ret
      .filter((e) => e.name !== "unknown" && e.name !== "shadow")
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }
});

// query pokemon data
const queryPokemon = useQuery({
  queryKey: ['list-pokemons', queryPokeType.data.value?.length], queryFn: async () => {
    if (selectedTypePoke.value.length > 0) {
      const _callbacks = selectedTypePoke.value.map((url) => {
        return modManager
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
          paging.value.page * paging.value.pageSize,
          paging.value.pageSize,
        ),
      };
    }
    const ret = await modManager
      ?.get<AppRepository>("AppRepository")
      .poke.listPokemons({
        offset: paging.value.page * paging.value.pageSize,
        pageSize: paging.value.pageSize,
      });
    return ret ?? null;
  }
});

function onSelecType(name: string) {
  if (selectedTypePoke.value.includes(name)) {
    selectedTypePoke.value = selectedTypePoke.value.filter((e) => e !== name);
    paging.value.page = 0;
  } else if (selectedTypePoke.value.length < 2) {
    selectedTypePoke.value.push(name);
    paging.value.page = 0;

  }
}
</script>

<template>
  <div class="pokemon-page">
    <div class="pokemon-page__list-type">
      <div @click="onSelecType(typePoke.name)" class="item" :style="{
        borderColor: selectedTypePoke.includes(typePoke.name)
          ? `${pokemonTypeColor.get(typePoke.name)}`
          : undefined
      }" v-for="typePoke in queryPokeType.data.value">
        <img :src="Environment.host + `/icons/pokemon-types/${typePoke.name}.svg`" />
        <span :style="pokemonTypeColor.get(typePoke.name)">
          {{ typePoke.name }}
        </span>
      </div>
    </div>
  </div>
  <div className="pokemon-page__list-pokemons ">

    {{ queryPokemon.data.value?.data }}

  </div>
</template>

<style scoped lang="less">
.pokemon-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 16px;
  gap: 48px;
}

.pokemon-page__list-type {
  display: grid;
  width: 100%;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(96px, 96px));
  place-content: center;

  .item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    border: 2px solid;
    border-radius: 4px;
    border-color: transparent;
    padding: 8px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    justify-content: center;
    // height: 100%;

    img {
      aspect-ratio: 1;
    }

    span {
      text-transform: capitalize;
      color: #333333;
      font-size: 16px;
      font-weight: 500;
    }

    &:hover {
      cursor: pointer;
      transform: translateY(-8px);
      transition: all 300ms;
    }
  }
}

.pokemon-page__list-pokemons {
  display: grid;
  width: 100%;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 160px));
  place-content: center;
}
</style>
