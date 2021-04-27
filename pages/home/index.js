import Head from 'next/head'
import Link from 'next/link'

import { useState, useEffect } from 'react'

import Devit from 'components/Devit'

import { useUser } from 'contexts/UserProvider.js'

import { fetchAndWatchLatestDevits } from '../../firebase/client.js'
import Create from 'components/Icons/Create.js'
import HomeIcon from 'components/Icons/Home.js'
import Search from 'components/Icons/Search.js'
import Header from 'components/Header/index.js'
import DeleteButton from 'components/DeleteButton/index.js'

import { colors } from 'styles/themes.js'
import css from 'styled-jsx/css'
const styles = css`
  article {
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 10px 15px;
  }

  section {
    flex: 1;
  }

  div {
    position: absolute;
    right: 25%;
    bottom: 0px;
  }

  div {
    position: sticky;
  }

  nav {
    background: #fff;
    bottom: 0;
    border-top: 1px solid #eee;
    display: flex;
    height: 49px;
    position: relative;
    width: 100%;
  }

  nav a {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    justify-content: center;
  }

  nav a:hover {
    background: radial-gradient(#0099ff22 15%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
  }

  nav a:hover > :global(svg) {
    stroke: ${colors.primary};
  }

  section.search {
    align-items: center;
    background: #fff;
    bottom: 50px;
    display: flex;
    justify-content: center;
  }

  .search button {
    background: rgba(0, 0, 0, 0.3);
  }

  .search button:hover {
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`

export default function Home({ children }) {
  const [timeline, setTimeline] = useState([])
  const [filter, setFilter] = useState(null)
  const [showSearchInput, setShowSearchInput] = useState(false)

  const user = useUser()

  useEffect(() => {
    user && fetchAndWatchLatestDevits(setTimeline)
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
      <Header title={'Inicio'} />
      <section>
        {timeline
          .filter(devitsFilter)
          .map(
            ({
              avatar,
              content,
              createdAt,
              id,
              img,
              likes,
              username,
              userId,
            }) => {
              return (
                <Devit
                  key={id}
                  avatar={avatar}
                  content={content}
                  createdAt={createdAt}
                  id={id}
                  img={img}
                  likes={likes}
                  username={username}
                  userId={userId}
                  user={user}
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
            <DeleteButton onClick={handleCancelSearch} />
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
      <style jsx>{styles}</style>
    </>
  )
}
