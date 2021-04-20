import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD8TS0wDFGGQfPS8IfA9kkD79IgKV40fBM',
  authDomain: 'nextjs-devter-7334e.firebaseapp.com',
  projectId: 'nextjs-devter-7334e',
  storageBucket: 'nextjs-devter-7334e.appspot.com',
  messagingSenderId: '176466349404',
  appId: '1:176466349404:web:3a06147e3e8e28fe720599',
  measurementId: 'G-ZBD4J9YQ9M'
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = mapUserFromFirebaseAuth(user)
    onChange(normalizeUser)
  })
}

export const loginWithGitHub = () => {
  // Create the provider
  const githubProvider = new firebase.auth.GithubAuthProvider()
  console.log(`Provider: ${githubProvider}`)
  const auth = firebase.auth()
  console.log(`Auth: ${auth}`)
  return auth.signInWithPopup(githubProvider)
  // .then(mapUserFromFirebaseAuth)
}
