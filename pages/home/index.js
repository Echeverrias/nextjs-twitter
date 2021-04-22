import Head from 'next/head'
import Link from 'next/link'

import { useState, useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'

import useUser from 'hooks/useUser'

import styles from './styles.js'
import { fetchLatestDevits } from '../../firebase/client.js'
import Create from 'components/Icons/Create.js'
import HomeIcon from 'components/Icons/Home.js'
import Search from 'components/Icons/Search.js'
import Header from 'components/Header/index.js'

export default function Home ({ children }) {
  const [timeline, setTimeline] = useState([])
  const [filter, setFilter] = useState(null)
  const [showSearchInput, setShowSearchInput] = useState(false)

  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  const devitsFilter = (devit) => {
    if (!filter || filter === '') {
      return true
    }
    const filter_ = filter.toLowerCase()
    const finded =
      devit.content.toLowerCase().includes(filter_) ||
      devit.img?.toLowerCase().includes(filter_) ||
      devit.username.toLowerCase().includes(filter_)
    return finded
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSearchInput((prev) => !prev)
    }
  }

  const handleCancelSearch = () => {
    setFilter('')
    setShowSearchInput((prev) => !prev)
  }

  const handleGoHome = () => {
    setFilter('')
    setShowSearchInput(false)
  }

  return (
    <>
      <Head>
        <title>Inicio / Devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Header title={'Inicio'} />
        <section>
          {timeline
            .filter(devitsFilter)
            .map(
              ({ avatar, content, createdAt, id, img, username, userId }) => {
                return (
                  <Devit
                    key={id}
                    avatar={avatar}
                    content={content}
                    createdAt={createdAt}
                    id={id}
                    img={img}
                    username={username}
                    userId={userId}
                    actualUserId={user.uid}
                  />
                )
              }
            )}
        </section>

        <div>
          {showSearchInput && (
            <section className="search">
              <Search width={32} height={32} stroke="#09f" />
              <input
                onChange={(e) => setFilter(e.target.value)}
                onClick={(e) => setFilter('')}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleCancelSearch}>x</button>
            </section>
          )}
          <nav>
            <Link href="/home">
              <a onClick={handleGoHome}>
                <HomeIcon width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/home">
              <a onClick={() => setShowSearchInput((prev) => !prev)}>
                <Search width={32} height={32} stroke="#09f" />
              </a>
            </Link>
            <Link href="/compose/tweet">
              <a>
                <Create width={32} height={32} stroke="#09f" />
              </a>
            </Link>
          </nav>
        </div>
      </AppLayout>
      <style jsx>{styles}</style>
    </>
  )
}
