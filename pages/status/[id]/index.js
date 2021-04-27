import Devit from 'components/Devit'
import { firestore } from 'firebase/admin.js'
import { useUser } from 'contexts/UserProvider'
import { useRouter } from 'next/router'

import css from 'styled-jsx/css'
const styles = css`
  h1 {
    width: 100%;
    display: block;
    text-align: center;
    padding-top: 35px;
  }
`
export default function DevitPage(props) {
  const router = useRouter()
  // Solo para desarrollo
  if (router.isFallback) {
    return (
      <>
        <h1>Cargando...</h1>
        <style jsx>{styles}</style>
      </>
    )
  }
  const user = useUser()
  return (
    <>
      <Devit {...props} user={user} />
      <style jsx>{styles}</style>
    </>
  )
}

export async function getStaticPaths(context) {
  return {
    paths: [{ params: { id: 'UPr8qnhnlMuJ65QKlRwc' } }],
    fallback: true,
  }
}

// Se ejecuta en el servidor al hacer el build
export async function getStaticProps(context) {
  // params, req, query, resolvedUrl
  const { params } = context
  const { id } = params
  console.log(context)

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

/*
// Se ejecuta en el servidor en cada petición
export async function getServerSideProps(context) {
  // params, req, res, query, resolvedUrl
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    // Está ejecutándose en el servidor
    // res .writeHead(301, {Location: '/home'}).end()
    res.writeHead(404).end()
  }
}
*/

/*
// Se ejecuta en el servidor
DevitPage.getInitialProps = (context) => {
  const { query, res } = context
  const { id } = query

    //const props = {id}
    //return props

  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) {
      console.log(apiResponse)
      return apiResponse.json()
    }
    if (res) {
      // Está ejecutándose en el servidor
      // res .writeHead(301, {Location: '/home'}).end()
      res.writeHead(404).end()
    }
  })
}
*/
