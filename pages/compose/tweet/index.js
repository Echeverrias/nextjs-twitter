import { useState, useRef } from 'react'

import Avatar from 'components/Avatar'
import Button from 'components/Button'
import { useUser } from 'contexts/UserProvider.js'
import { addDevit, uploadFile } from 'firebase/client.js'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Header from 'components/Header/index.js'
import DeleteButton from 'components/DeleteButton/index.js'

import css from 'styled-jsx/css'
const styles = css`
  div {
    display: grid;
    height: 100%;
    place-content: center;
    place-items: center;
  }

  .form-container {
    align-items: start;
    display: flex;
  }

  .avatar-container {
    padding-top: 20px;
    padding-left: 10px;
  }

  section div {
    padding: 15px;
  }

  form {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  textarea {
    border-radius: 10px;
    font-size: 21px;
    min-height: 200px;
    outline: 0;
    padding: 15px;
    resize: none;
    width: 100%;
  }

  img {
    border-radius: 10px;
    height: auto;
    width: 100%;
  }

  .loaded-img {
    position: relative;
  }

  figure > :global(button) {
    top: 15px;
    position: absolute;
    right: 15px;
  }
`

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
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

export default function ComposeTweet() {
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
      username: user.username,
      likes: [],
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
        <title>Creau un dev / Devter ????</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <DeleteButton onClick={handleCancelImage} />
              <img src={imgURL} />
            </figure>
          )}
          <div>
            <Button disabled={isButtonDissabled}>Devitear</Button>
          </div>
        </form>
      </section>
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
