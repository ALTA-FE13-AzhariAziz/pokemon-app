import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import axios from "axios";

import Home from "@/pages";
import Pokemon from "@/pages/Pokemon";
import { ThemeContext } from "@/utils/context";
import MyPokemon from "@/pages/MyPokemon";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("dark");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pokemon/:name",
      element: <Pokemon />,
    },
    {
      path: "/my-pokemon",
      element: <MyPokemon />,
    },
  ]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
