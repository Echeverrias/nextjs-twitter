import { useState, useRef } from 'react'
import styles from './styles.js'

import AppLayout from 'components/AppLayout'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { addDevit, uploadFile } from 'firebase/client.js'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Header from 'components/Header/index.js'

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
  console.log(file)
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
  const [file, setFile] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const fileInput = useRef(null)

  const user = useUser()
  const router = useRouter()

  /*
  // To upload the image whe you drop it
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
  */

  const uploadContent = (img = null) => {
    addDevit({
      avatar: user.avatar,
      content: formData.content,
      email: user.email,
      img: img || imgURL,
      userId: user.uid,
      username: user.username
    })
      .then(() => router.push('/home'))
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const uploadImageAndContent = () => {
    const fileTask_ = uploadFile(file, user.uid)
    setFileTask(fileTask_)
    console.log(fileTask)
    const onProgress = () => {}
    const onError = () => {}
    const onComplete = () => {
      fileTask_.snapshot.ref.getDownloadURL().then((imgURL_) => {
        setImgURL(imgURL_)
        uploadContent(imgURL_)
      })
    }
    fileTask_.on('state_changed', onProgress, onError, onComplete)
  }

  const uploadDevit = () => {
    if (file) {
      uploadImageAndContent()
    } else {
      uploadContent()
    }
  }

  const loadImage = (file) => {
    const reader = new FileReader()
    reader.onloadend = function () {
      setImgURL(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const validateAndLoadImage = (file) => {
    if (isValidImage(file)) {
      setFile(file)
      loadImage(file)
      return true
    }
    return false
  }

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      const file_ = e.target.files[0]
      if (!validateAndLoadImage(file_)) {
        console.log('Not an image')
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    uploadDevit()
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
    const file_ = e.dataTransfer.files[0]
    fileInput.current.value = null
    setDrag(DRAG_IMAGES_STATES.NONE)
    /*
    if (isValidImage(file)) {
      const task = uploadImage(file)
      setFileTask(task)
    }
    */
    if (!validateAndLoadImage(file_)) {
      console.log('Not an image')
    }
  }

  const handleCancelImage = (e) => {
    setImgURL(null)
    fileInput.current.value = null
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
            <input
              ref={fileInput}
              type="file"
              name="file"
              onChange={handleChange}
            />
            {imgURL && (
              <figure className="loaded-img">
                <button onClick={handleCancelImage}>x</button>
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