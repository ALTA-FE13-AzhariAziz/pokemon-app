import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

interface pokemonType {
  weight: number;
  height: number;
}

interface statsType {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface types {
  type: {
    name: string;
  };
}

interface abilitiesType {
  is_hidden: boolean;
  ability: {
    name: string;
  };
}

interface movesType {
  move: {
    name: string;
  };
}

interface myPokemonsType {
  name?: string;
  image?: string;
  nickName?: string;
}

import Layout from "@/components/Layout";
const Pokemon: FC = () => {
  const [char, setChar] = useState<pokemonType>();
  const [image, setImage] = useState<string>();
  const [stats, setStats] = useState<statsType[]>([]);
  const [types, setTypes] = useState<types[]>([]);
  const [abilities, setAbilities] = useState<abilitiesType[]>([]);
  const [moves, setMoves] = useState<movesType[]>([]);
  const [objSubmit, setObjSubmit] = useState<string>();
  const navigate = useNavigate();

  let array: myPokemonsType[] = [];
  const params = useParams();
  const { name } = params;
  let data = {};
  useEffect(() => {
    fetchData(), fetchForms();
  }, []);

  function fetchData() {
    axios
      .get(`/pokemon/${name}`)
      .then((response) => {
        // Akan resolve ketika server memberikan response OK ke Frontend
        const { sprites } = response.data;
        const { stats } = response.data;
        const { abilities } = response.data;
        const { moves } = response.data;
        console.log(response.data);
        console.log(stats);
        setStats(stats);
        setChar(response.data);
        setImage(sprites.other.home.front_default);
        setAbilities(abilities);
        setMoves(moves);
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        // console.log(error);
        alert(error.toString());
      });
  }

  function fetchForms() {
    axios
      .get(`/pokemon-form/${name}`)
      .then((response) => {
        // Akan resolve ketika server memberikan response OK ke Frontend
        const { types } = response.data;
        setTypes(types);
        console.log(types);
      })
      .catch((error) => {
        // Akan reject ketika server memberikan response failed ke Frontend
        // console.log(error);
        alert(error.toString());
      });
  }

  function handleChange(value: string) {
    let temp = objSubmit;
    temp = value;
    setObjSubmit(temp);
  }

  function handleCatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nameFavorite = name;

    if (Math.random() < 0.5) {
      alert("yeay kamu dapat");

      if (array.length == 0) {
      } else {
      }
      data = {
        name: nameFavorite,
        image: image,
        nickName: objSubmit,
      };
      // console.log(JSON.parse(myString));
      //   array.length = 0;
      //   localStorage.clear();
      console.log(array);
      //   index++;
      const myString: string | null = localStorage.getItem("myPokemon");
      if (myString !== null) {
        array = JSON.parse(myString);
        array.push(data);
        localStorage.setItem("myPokemon", JSON.stringify(array));
        console.log(array);
        console.log(JSON.parse(myString));
      } else {
        array.push(data);
        console.log(array);
        // setMyPokemons(myPokemons);
        localStorage.setItem("myPokemon", JSON.stringify(array));
      }
      navigate("/");
    } else {
      alert("yah ayo coba lagi");
      navigate("/");
    }
  }

  return (
    <Layout>
      <div className="h-full overflow-auto text-zinc-800 dark:text-slate-200">
        <div className=" overflow-auto grid grid-cols-2 gap-2">
          <div className="card border rounded-xl m-3 items-center static dark:border-slate-200 border-zinc-800">
            <img src={image} alt="" className=" h-[10rem] w-[10rem]" />
            <div className=" grid grid-cols-2 gap-2  content-center h-full">
              {types.map((data) => {
                return (
                  <div className="overflow-hidden break-all rounded-full border border-black p-2 text-center font-arcade text-xs capitalize tracking-wide text-white dark:border-white bg-emerald-800">
                    <p>{data.type.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card border rounded-xl m-3 text-xs p-5 static dark:border-slate-200 border-zinc-800">
            {stats.map((data) => {
              return (
                <div>
                  <p className=" capitalize break-all">{data.stat.name}</p>
                  <progress
                    className="progress progress-warning  w-full static"
                    value={data.base_stat}
                    max="100"
                  ></progress>
                  <p>{data.base_stat}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card border rounded-xl m-3  text-xs p-5 capitalize dark:border-slate-200 border-zinc-800">
          <p>Name: {name}</p>
          <p>Weight: {char?.weight}</p>
          <p>Height: {char?.height}</p>
        </div>
        <div className="overflow-auto grid grid-cols-2 gap-2">
          <div className="card border rounded-xl m-3  text-xs p-5 capitalize dark:border-slate-200 border-zinc-800">
            {abilities.map((data) => {
              if (!data.is_hidden) {
                return <p>{data.ability.name}</p>;
              }
            })}
          </div>
          <div className="card border rounded-xl m-3  text-xs p-5 capitalize dark:border-slate-200 border-zinc-800">
            {moves.slice(0, 5).map((data) => {
              return <p>{data.move.name}</p>;
            })}
          </div>
        </div>
        <div className=" overflow-auto flex  justify-center ">
          <label
            htmlFor="my-modal-3"
            className="btn bg-slate-200 dark:bg-zinc-800 card text-xs border-2 rounded-xl p-2 capitalize m-5 dark:border-slate-200 border-zinc-800"
            // onClick={(event) => handleCatch()}
          >
            <p className="text-zinc-800 dark:text-slate-200">Catch!</p>
          </label>
        </div>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box relative bg-slate-200 w-[450px]">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={(event) => handleCatch(event)}>
            <input
              type="text"
              placeholder="Input Nick Name First"
              className="input w-full mb-5"
              onChange={(event) => handleChange(event.target.value)}
            />

            <button className="btn  bg-white text-red-600  border-white hover:bg-red-600 hover:border-red-600 hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-md btn-wide self-center mt-10">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Pokemon;
