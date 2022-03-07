import React from 'react'
import Head from 'next/head'

export default function Layout({title, children}) {
  //const randomBackground = Math.floor(Math.random() * 4)

  return (
    <div className="bg-[url('../public/background/electric-pokemon.png')] text-dark-gray">
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/pokeball-icon.ico" />
            <meta name="description" content="Pokedex including the first 151 Pokemon - Gen 1. Made with NextJS with Tailwind and PokeAPI."/>
        </Head>
        <main className="container mx-auto max-w-xs sm:max-w-xl p-8 min-h-screen bg-gray-300 bg-opacity-80">
            {children}
        </main>
    </div>
  )
}
