import Link from 'next/link'

export default function NavBar ({ children }) {
  return (
    <>
      <nav>
        <Link href="/timeline">
          <a>timeline</a>
        </Link>
      </nav>
    </>
  )
}
