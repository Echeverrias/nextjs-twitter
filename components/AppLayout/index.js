import NavBar from '../NavBar'
import Footer from '../Footer'

import styles, { globalStyles } from './styles'

export default function AppLayout ({ children }) {
  return (
    <>
      <NavBar />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}
