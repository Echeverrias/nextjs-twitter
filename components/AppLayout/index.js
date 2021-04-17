import NavBar from '../NavBar'
import Footer from '../Footer'

export default function AppLayout({children}){
    return (
        <>
        <NavBar />
        <main>
            {children}
        </main>
        <Footer />
         <style jsx global>{`
        html,
        body{
          padding:0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

        }

        *{
          box-sizing: border-box;
        }
        .main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
      `}</style>
        </>

    )
}