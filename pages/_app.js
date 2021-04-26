import AppLayout from 'components/AppLayout'
import { UserProvider } from 'contexts/UserProvider.js'

export default function MyApp ({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AppLayout>
    </>
  )
}
