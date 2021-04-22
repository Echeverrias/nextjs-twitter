import { useState, useEffect } from 'react'
import styles from './styles.js'

import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { addDevit } from 'firebase/client.js'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { uploadImage } from '../../../firebase/client.js'
import Header from '../../../components/Header/index.js'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

// const IMAGES_EXTENSIONS = new Set(['jpg', 'jpeg', 'gif', 'svg', 'png'])

const isValidImage = (file) => {
  return /image/.test(file.type)
  /*
  const extension = file.name.replace(/(.+)\.(.)/, "$2")
  if (IMAGES_EXTENSIONS.has(extension)){
    return true
  }
  return false
  */
}

export default function ComposeTweet () {
  const [formData, setFormData] = useState({ content: '' })
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [fileTask, setFileTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (fileTask) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        fileTask.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      fileTask.on('state_changed', onProgress, onError, onComplete)
    }
  }, [fileTask])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    console.log(isButtonDissabled)
    addDevit({
      avatar: user.avatar,
      content: formData.content,
      email: user.email,
      img: imgURL,
      userId: user.uid,
      username: user.username
    })
      .then(() => router.push('/home'))
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    console.log(file)
    setDrag(DRAG_IMAGES_STATES.NONE)
    if (isValidImage(file)) {
      const task = uploadImage(file)
      setFileTask(task)
    }
  }

  const isButtonDissabled =
    (!formData.content || status === COMPOSE_STATES.LOADING) && !imgURL

  return (
    <>
      <Head>
        <title>Creau un dev / Devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Header title={'Devit'} />
        <section className="form-container">
          {user && (
            <figure className="avatar-container">
              <Avatar alt={user.username} src={user.avatar} withText={false} />
            </figure>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="What is happening?"
            ></textarea>
            {imgURL && (
              <figure className="loaded-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </figure>
            )}
            <div>
              <Button disabled={isButtonDissabled}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        textarea {
          border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  )
}
