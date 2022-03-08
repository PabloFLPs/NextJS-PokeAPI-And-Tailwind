import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import Layout from '../components/Layout'

import PokemonCenter from "../public/pokemon-center-icon.png"

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
        <Layout title={pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}>
            <h1 className="text-3xl mb-2 pb-8 text-center font-medium">
                {/* First letter of the pokemon name to upper case */}
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <div style={{backgroundColor: pokemonColor,}} className="mx-auto w-42 h-42 sm:p-0 rounded-full sm:w-96 sm:h-96">
                <Image src={pokemon.image} alt={pokemon.name} width="384" height="384" objectFit="contain" className=""/>
            </div>
            <p className="px-4 pt-10 text-center">
                <span className="font-medium mr-2">Weight: </span>
                {/* Weight is given in "hectograms" */}
                {pokemon.weight / 10} kilograms
            </p>
            <p className="px-4 text-center">
                <span className="font-medium mr-2">Height: </span>
                {/* Height is given in "decimeters" */}
                {pokemon.height * 10} centimeters
            </p>

            {/* All Pokemon Types */}
            <div className="px-4">
                <h2 className="text-xl mt-6 mb-2 font-medium text-center">Types</h2>
                <div className="flex gap-1 justify-center">
                    {pokemon.types.map(({type}, index) => <p style={{backgroundColor: colors[type.name.toString()],}} key={type.slot} className="rounded-md w-24 text-center">{type.name[0].toUpperCase() + type.name.slice(1)}</p>)}
                </div>
            </div>

            {/* All Pokemon Abilities */}
            <div className="px-4">
                <h2 className="text-xl mt-6 mb-2 font-medium text-center">Abilities</h2>
                {pokemon.abilities.map(({ability}, index) => <p key={ability.slot} className="text-center">{"- " + ability.name[0].toUpperCase() + ability.name.slice(1)}</p>)}   
            </div>

            {/* All Pokemon Moves */}
            {/*
            <div className="px-4">
                <h2 className="text-xl mt-6 mb-2 font-medium">Moves</h2>
                {pokemon.moves.map(({move}, index) => <p key={move}>{"- " + move.name[0].toUpperCase() + move.name.slice(1)}</p>)}
            </div>
            */}
            <p className="flex items-center pt-14 text-center">
                <div className="group mx-auto flex items-center bottom-0">
                    <Image src={PokemonCenter} alt="pokemon center" width="76" height="68" className="group-hover:scale-110 transition-all duration-300"/>
                    <Link href="/">
                        <a className="text-2xl font-medium border-b-2 border-transparent group-hover:border-b-red group-hover:text-red transition-all duration-300">Home</a>
                    </Link>
                </div>
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
