import Layout from "@/components/Layout";
import { FC, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface loadTypeP {
  name: string;
  image: string;
  nickName: string;
}

const MyPokemon: FC = () => {
  const [mypokemon, setMyPokemon] = useState<loadTypeP[]>([]);

  useEffect(() => {
    loadData();
  }, [handleDelete]);

  function loadData() {
    const myString: string | null = localStorage.getItem("myPokemon");
    if (myString !== null) {
      setMyPokemon(JSON.parse(myString));
    }
  }

  function handleDelete(index: number) {
    const myString: string | null = localStorage.getItem("myPokemon");
    if (myString !== null) {
      let array = JSON.parse(myString);
      array.splice(index, 1);

      localStorage.setItem("myPokemon", JSON.stringify(array));
    }
  }

  return (
    <Layout>
      <div className="h-full w-full  overflow-auto grid grid-cols-2 gap-2  p-5">
        {mypokemon.map((poke, index) => {
          const i = index;
          return (
            <div className="card justify-center items-center border-4 rounded-xl dark:border-slate-200 border-zinc-800">
              <button
                className="absolute top-0 right-0 z-10 p-2  hover:bg-gray-700 text-zinc-800 dark:text-slate-200"
                onClick={(event) => handleDelete(i)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link to={`/pokemon/${poke.name}`}>
                <img
                  id="img"
                  src={poke.image}
                  alt=""
                  className=" object-fill"
                />

                <p
                  className=" text-xs uppercase text-center bg-black rounded-md p-2"
                  id="name"
                >
                  {poke.name}
                </p>
                <p
                  className=" text-xs uppercase text-center bg-black rounded-md p-2"
                  id="name"
                >
                  ({poke.nickName})
                </p>
              </Link>
              {/* <img id="display" src={handleImage(data.url)} alt="" /> */}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyPokemon;
