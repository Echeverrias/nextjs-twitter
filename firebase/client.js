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

export const addDevit = ({
  avatar,
  content,
  email,
  img,
  likes,
  userId,
  username
}) => {
  console.log('CLIENT')
  console.log({ avatar, content, email, img, likes, userId, username })
  return db.collection('devits').add({
    avatar,
    content,
    email,
    img,
    likes,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date())
  })
}

export const fetchAndWatchLatestDevits = (func) => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      func(
        snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          const { createdAt } = data
          return { id, ...data, createdAt: +createdAt.toDate() }
        })
      )
    })
}

export const fetchLatestDevits = () => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        /*
        const intl = new Intl.DateTimeFormat('es-ES')
        const normalizeCreatedAt = intl.format(createdAt.toDate())
        */
        return { id, ...data, createdAt: +createdAt.toDate() }
      })
    })
}

export const uploadFile = (file, id) => {
  console.log(`upload file id ${id}`)
  const folder = file.type
  const ref = firebase.storage().ref(`${folder}/${id}/${file.name}`)
  const task = ref.put(file)
  return task
}

export const deleteDevit = (id) => {
  console.log('deletedevit')
  db.collection('devits')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!')
    })
    .catch((error) => {
      console.error('Error removing document: ', error)
    })
}

export const updateDevit = (id, data) => {
  console.log('deletedevit')
  db.collection('devits')
    .doc(id)
    .update(data)
    .then(() => {
      console.log('Document successfully deleted!')
    })
    .catch((error) => {
      console.error('Error removing document: ', error)
    })
}
