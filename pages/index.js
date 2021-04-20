import Head from 'next/head'
import { useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'

import styles from 'styles/Home.module.css'
import { colors } from 'styles/themes.js'

import { loginWithGitHub } from 'firebase/client'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser'

export default function App () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    console.log('Click login')
    loginWithGitHub()
      // .then(setUser) // ya lo hace en onAuthStateChanged
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
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill={'#fff'} width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="spinner.gif" />}
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
