import React from 'react'
import Head from 'next/head'

export default function Layout({title, children}) {
  return (
    <div className="bg-[url('../public/background/pokemon-background.png')] text-dark-gray">
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/pokeball-icon.ico" />
            <meta name="description" content="Pokedex including all 898 Pokemon - 8 Generations. Made with NextJS with Tailwind and PokeAPI."/>
        </Head>
        <main className="container mx-auto max-w-xs sm:max-w-xl p-8 min-h-screen bg-gray-300 bg-opacity-80">
            {children}
        </main>
    </div>
  )
}
