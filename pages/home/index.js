import Head from 'next/head'

import { useState, useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'

import styles from './styles.js'

export default function Home ({ children }) {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])
  return (
    <>
      <Head>
        <title>Devter 🐦 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div>
          <header>
            <h2>Inicio</h2>
          </header>
          <section>
            {timeline.map(({ avatar, id, message, username }) => {
              return (
                <Devit
                  key={id}
                  avatar={avatar}
                  id={id}
                  message={message}
                  username={username}
                />
              )
            })}
          </section>
          <nav></nav>
        </div>
      </AppLayout>
      <style jsx>{styles}</style>
    </>
  )
}
