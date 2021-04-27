import LeftArrow from '../Icons/GoBack.js'
import styles from './styles.js'
import { useRouter } from 'next/router'

export default function Header({ title }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.back()
  }

  const isHome = /home/.test(router.route)

  return (
    <>
      <header>
        <h2>{title}</h2>
        {!isHome && (
          <a onClick={handleClick}>
            <LeftArrow width={32} height={32} stroke="#09f" />
          </a>
        )}
      </header>
      <style jsx>{styles}</style>
    </>
  )
}
