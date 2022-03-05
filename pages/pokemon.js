import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Pokemon({pokemon}) {
    console.log(pokemon)

    return (
        <Layout title={pokemon.name}>
            <h1 className="text-3xl mb-2 text-center font-medium">
                {/* First letter of the pokemon name to upper case */}
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <div className="mx-auto w-96 h-96 p-6">
                <Image src={pokemon.image} alt={pokemon.name} width="336" height="336" objectFit="contain" className="bg-purple-500"/>
            </div>
            <p>
                <span className="font-medium mr-2">Weight: </span>
                {/* ~Weight is given in "hectograms" */}
                {pokemon.weight / 10} kilograms
            </p>
            <p>
                <span className="font-medium mr-2">Height: </span>
                {/* Height is given in "decimeters" */}
                {pokemon.height * 10} centimeters
            </p>

            {/* All Pokemon Types */}
            <h2 className="text-xl mt-6 mb-2 font-medium">Types</h2>
            {pokemon.types.map(({type}, index) => <p key={type.slot}>{"- " + type.name[0].toUpperCase() + type.name.slice(1)}</p>)}
            
            {/* All Pokemon Abilities */}
            <h2 className="text-xl mt-6 mb-2 font-medium">Abilities</h2>
            {pokemon.abilities.map(({ability}, index) => <p key={ability.slot}>{"- " + ability.name[0].toUpperCase() + ability.name.slice(1)}</p>)}
            
            {/* All Pokemon Moves */}
            <h2 className="text-xl mt-6 mb-2 font-medium">Moves</h2>
            {pokemon.moves.map(({move}, index) => <p key={move}>{"- " + move.name[0].toUpperCase() + move.name.slice(1)}</p>)}
            
            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="text-2xl font-medium">Home</a>
                </Link>
            </p>
        </Layout>
    )
}

export async function getServerSideProps({query}) {
    const id = query.id

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await response.json()
        const paddedIndex = ("00" + id).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`

        pokemon.image = image

        return {
            props: {pokemon}
        }
    } catch(error) {
        console.log(error)
    }

    return {
        notFound: true
    }
}
