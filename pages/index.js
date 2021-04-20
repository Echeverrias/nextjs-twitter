import Head from 'next/head'
import { useState, useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'

import styles from 'styles/Home.module.css'
import { colors } from 'styles/themes.js'

import { loginWithGitHub, onAuthStateChanged } from 'firebase/client'

export default function Home () {
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    console.log('Click login')
    loginWithGitHub()
      .then(setUser)
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Head>
        <title>Devter 🐦 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <h1 className={styles.title}>Devter</h1>
          <img src="/logo.png" />
          <p className={styles.description}>Talk with other people</p>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill={'#fff'} width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar src={user.avatar} alt={user.username} withText={true} />
              </div>
            )}
          </div>
        </section>
      </AppLayout>
      <style jsx>
        {`
          section {
            display: grid;
            height: 100%;
            place-items: center;
            place-content: center;
          }
          div {
            margin-top: 16px;
          }
          h1 {
            color: ${colors.primary};
            text-align: center;
            font-weight: 800;
            margin-bottom: 16px;
          }
          h2 {
            color: ${colors.secondary};
            text-align: center;
            font-size: 21px;
            margin: 0;
          }
          p {
            color: ${colors.secondary};
          }
          a {
            color: #09f;
            text-decoration: none;
          }
          nav {
            font-size: 24px;
            text-align: center;
          }
          img {
            width: 120px;
          }
        `}
      </style>
    </>
  )
}
