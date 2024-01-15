import { createRouter, createWebHistory } from "vue-router";
import { NavlinkPath } from "@/applications/services/router-config";
const PokemonsPage = () => import("@/pages/pokemons/PokemonsPage.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.PETKITMON_BASE_PATH),
  routes: [
    {
      path: NavlinkPath.root,
      component: PokemonsPage,
    },
  ],
});

export default router;
