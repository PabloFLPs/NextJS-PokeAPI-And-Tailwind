import Layout from "../components/Layout"
import Link from "next/link"

export default function Home({pokemonList}) {
  console.log(pokemonList)

  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">Pablo FELPs - NextJS Pokedex</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 flex items-center text-lg font-medium bg-gray-200 rounded-md">
                <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mr-3"/>
                <span className="mr-2">{index + 1}. </span>
                {/* First letter of the pokemon name to upper case */}
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps(context) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    /*
    {
      "count": 1126,
      "next": "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151",
      "previous": null,
      "results": [],
    }
    */
    const {results} = await response.json()

    const pokemonList = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image
      }
    })

    return {
      props: {pokemonList}
    }
  } catch(error) {
    console.log(error)
  }

  return {
    notFound: true
  }
}
