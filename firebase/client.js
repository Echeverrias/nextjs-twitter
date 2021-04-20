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

const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null
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

export const addDevit = ({ avatar, content, email, userId, username }) => {
  return db.collection('devits').add({
    avatar,
    content,
    email,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const intl = new Intl.DateTimeFormat('es-ES')
        const normalizeCreatedAt = intl.format(createdAt.toDate())
        return { id, ...data, createdAt: normalizeCreatedAt }
      })
    })
}
