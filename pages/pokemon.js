import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Pokemon({pokemon}) {
    console.log("pokemon id: " + pokemon.id)

    const colors = {
        grass: "#3e9709",
        fire: "#f67f0b",
        water: "#0a7abc",
        normal: "#ccc9aa",
        flying: "#5eb9b2",
        bug: "#bddd6e",
        poison: "#a719d7",
        electric: "#fffa24",
        ground: "#e1d158",
        fighting: "#d36063",
        psychic: "#f55792",
        rock: "#776a3e",
        ice: "#1995a1",
        ghost: "#8e55a4",
        dragon: "#8a55fd",
        dark: "#4f4f4f",
        steel: "#7b8e8a",
        fairy: "#ff9fc2",
    }

    console.log("pokemon type: " + pokemon.types[0].type.name)

    const pokemonColor = colors[pokemon.types[0].type.name.toString()]
    console.log("background color: " + pokemonColor)

    return (
        <Layout title={pokemon.name}>
            <h1 className="text-3xl mb-2 text-center font-medium">
                {/* First letter of the pokemon name to upper case */}
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <div style={{backgroundColor: pokemonColor}} className="mx-auto w-96 h-96 p-6 rounded-full">
                <Image src={pokemon.image} alt={pokemon.name} width="336" height="336" objectFit="contain" className="p-24"/>
            </div>
            <p className="px-4">
                <span className="font-medium mr-2">Weight: </span>
                {/* ~Weight is given in "hectograms" */}
                {pokemon.weight / 10} kilograms
            </p>
            <p className="px-4">
                <span className="font-medium mr-2">Height: </span>
                {/* Height is given in "decimeters" */}
                {pokemon.height * 10} centimeters
            </p>

            {/* All Pokemon Types */}
            <div className="px-4">
                <h2 className="text-xl mt-6 mb-2 font-medium">Types</h2>
                {pokemon.types.map(({type}, index) => <p key={type.slot}>{"- " + type.name[0].toUpperCase() + type.name.slice(1)}</p>)}
            </div>

            {/* All Pokemon Abilities */}
            <div className="px-4">
                <h2 className="text-xl mt-6 mb-2 font-medium">Abilities</h2>
                {pokemon.abilities.map(({ability}, index) => <p key={ability.slot}>{"- " + ability.name[0].toUpperCase() + ability.name.slice(1)}</p>)}
            </div>

            {/* All Pokemon Moves */}
            {/*
            <div className="px-4">
                <h2 className="text-xl mt-6 mb-2 font-medium">Moves</h2>
                {pokemon.moves.map(({move}, index) => <p key={move}>{"- " + move.name[0].toUpperCase() + move.name.slice(1)}</p>)}
            </div>
            */}

            <p className="py-10 text-center">
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
