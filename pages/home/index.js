import Head from 'next/head'

import { useState, useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'

import useUser from 'hooks/useUser'

import styles from './styles.js'
import { fetchLatestDevits } from '../../firebase/client.js'

export default function Home ({ children }) {
  const [timeline, setTimeline] = useState([])

  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

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
            {timeline.map(
              ({ avatar, id, content, createdAt, username, userId }) => {
                return (
                  <Devit
                    key={id}
                    avatar={avatar}
                    content={content}
                    createdAt={createdAt}
                    id={id}
                    username={username}
                    userId={userId}
                  />
                )
              }
            )}
          </section>
          <nav></nav>
        </div>
      </AppLayout>
      <style jsx>{styles}</style>
    </>
  )
}
