import Head from 'next/head';
import Link from 'next/link'


export default function Timeline ({username}) {

    return (
        <>
        <h1>This is the timeline of {username}</h1>
        <Link href='/'><a>Go home</a></Link>
        <style jsx>{`
            h1{
                font-size: 36px;
                color:red;
            }
        `}

        </style>
        </>
        )
}


Timeline.getInitialProps = () => {
    return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
    .then(response => {
        console.log(response)
        const {username} = response
        return {username}
    })

}


/*
Timeline.getInitialProps = async () => {
    return {
        username: '@lala'
    }
}
*/
/*
Timeline.getInitialProps = () => {
    return Promise.resolve({
        username: '@lalala'
    })
}
*/

