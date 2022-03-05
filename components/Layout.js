import React from 'react'
import Head from 'next/head'

export default function Layout({title, children}) {
  //const randomBackground = Math.floor(Math.random() * 4)

  return (
    <div className="bg-[url('../public/background/electric-pokemon.png')]">
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/pokeball-icon.ico" />
        </Head>
        <main className="container mx-auto max-w-xl pt-8 min-h-screen bg-gray-300 bg-opacity-80 px-6">
            {children}
        </main>
    </div>
  )
}
