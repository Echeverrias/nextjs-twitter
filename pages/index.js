import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import AppLayout from '../components/AppLayout'

import {colors} from '../styles/themes.js'
import Button from '../components/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devter 🐦 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Devter</a>
          </h1>
          <img src='/logo.png' />
          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <Button>Login with GitHub</Button>
          </div>
        </section>
        </AppLayout>
      <style jsx>{`
        section{
          display: grid;
          height: 100%;
          place-items: center;
          place-content: center;
        }
        div{
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
          margin: 0
        }
        a {
          color: #09f;
          text-decoration: none;
        }
        nav{
          font-size:24px;
          text-align:center; 
        }
        img{
          width:120px;
        }
      `}
      </style>
    </>
    
  )
}
