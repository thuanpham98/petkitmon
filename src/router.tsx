import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { NavlinkPath } from "./applications/services/router-config";
import { Environment } from "./applications/services/environment";
import { RdAppExtends, RdModule, RdModulesManager } from "@radts/reactjs";

const App = lazy(() => import("@/App"));

const PokemonsPage = lazy(() => import("@/pages/pokemons"));
const PokemonDetailPage = lazy(() => import("@/pages/detail-pokemon"));

export function appRouterConfig(modules: RdModulesManager<RdModule>) {
  return createBrowserRouter(
    [
      {
        path: NavlinkPath.root,
        element: (
          <RdAppExtends appProps={{ modules: modules }}>
            <Suspense>
              <App />
            </Suspense>
          </RdAppExtends>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <PokemonsPage />
              </Suspense>
            ),
          },
          {
            path: NavlinkPath.detailPokemon,
            element: (
              <Suspense>
                <PokemonDetailPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
    { basename: Environment.basePath },
  );
}
