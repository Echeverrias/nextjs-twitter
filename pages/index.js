import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import AppLayout from '../components/AppLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devter 🐦 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
       
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org"></a>
        </h1>
        
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        </AppLayout>
      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 48 px;
        }
        a {
          color: #09f;
          text-decoration: none;
        }
        nav{
          font-size:24px;
          text-align:center; 
        }
      `}
      </style>
    </>
    
  )
}
