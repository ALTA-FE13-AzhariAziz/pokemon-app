import Layout from "@/components/Layout";
import { FC, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface pokemonType {
  name: string;
  img: string;
}
const Home: FC = () => {
  const [dataPokemon, setDataPokemon] = useState<pokemonType[]>([]);
  const allPokemon: pokemonType[] = [];
  let offset = 0;

  useEffect(() => {
    fetchData();
    offset = 0;
    localStorage.removeItem("offset");
    console.log(offset);
  }, []);

  function fetchData() {
    const myString: string | null = localStorage.getItem("offset");
    if (myString !== null) {
      offset = JSON.parse(myString);
    } else {
      offset = 0;
    }
    axios
      .get(`pokemon?limit=20&offset=${offset}`)
      .then((response) => {
        // Akan resolve ketika server memberikan response OK ke Frontend
        const { results } = response.data;
        console.log(results);
        results.map((data: any) => {
          fetchPokemonData(data);
        });
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        // console.log(error);
        alert(error.toString());
      });
  }

  function fetchPokemonData(pokemon: any) {
    axios(pokemon.url).then((response) => {
      const data = response.data;
      const { sprites } = response.data;
      console.log(response.data.name);
      const p = document.getElementById("name");
      // setDatas(response.data);
      console.log(sprites.front_shiny);
      allPokemon.push({
        name: response.data.name,
        img: sprites.other.home.front_default,
      });
      if (allPokemon.length == 20) {
        setDataPokemon(allPokemon);
        console.log(sprites.other.home.front_default);
      }
      console.log(allPokemon);
    });
  }

  function handleOffsetRight() {
    const myString: string | null = localStorage.getItem("offset");
    if (myString !== null) {
      offset = JSON.parse(myString);
    } else {
      offset = 0;
    }
    offset += 20;
    localStorage.setItem("offset", JSON.stringify(offset));
    allPokemon.length = 0;
    fetchData();
    console.log("offsethandle", offset);
  }
  function handleOffsetLeft() {
    const myString: string | null = localStorage.getItem("offset");
    if (myString !== null) {
      offset = JSON.parse(myString);
    } else {
      offset = 0;
    }
    offset -= 20;
    localStorage.setItem("offset", JSON.stringify(offset));
    allPokemon.length = 0;
    fetchData();
    console.log(offset);
  }

  return (
    <Layout>
      <div className="h-full w-full  overflow-auto grid grid-cols-2 gap-2  p-5">
        {dataPokemon.map((poke) => {
          return (
            <div className="card border-zinc-800 dark:border-slate-200 justify-center items-center border-4 rounded-xl ">
              <Link to={`pokemon/${poke.name}`}>
                <img id="img" src={poke.img} alt="" className=" object-fill" />
                <p
                  className=" text-xs uppercase text-center bg-black rounded-md p-2"
                  id="name"
                >
                  {poke.name}
                </p>
              </Link>
              {/* <img id="display" src={handleImage(data.url)} alt="" /> */}
            </div>
          );
        })}
        <button
          onClick={(event) => {
            handleOffsetLeft();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 dark:text-slate-200 text-zinc-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className=" mt-6"
          onClick={(event) => {
            handleOffsetRight();
          }}
        >
          <div className="relative dark:text-slate-200 text-zinc-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 absolute  bottom-0 right-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
