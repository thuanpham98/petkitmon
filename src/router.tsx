import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { NavlinkPath } from "./applications/services/router-config";
import { Environment } from "./applications/services/environment";

const App = lazy(() => import("@/App"));

const PokemonsPage = lazy(() => import("@/pages/pokemons"));
const PokemonDetailPage = lazy(() => import("@/pages/detail-pokemon"));

export function appRouterConfig() {
  return createBrowserRouter(
    [
      {
        path: NavlinkPath.root,
        element: (
          <Suspense>
            <App />
          </Suspense>
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
    { basename: Environment.basePath.toString() },
  );
}
