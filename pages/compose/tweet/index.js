import { useState } from 'react'
import styles from './styles.js'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { addDevit } from 'firebase/client.js'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeTweet () {
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()
  const router = useRouter()

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
      userId: user.uid,
      username: user.username
    })
      .then(() => router.push('/home'))
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDissabled =
    !formData.content || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              onChange={handleChange}
              placeholder="What is happening?"
            ></textarea>
            <div>
              <Button disabled={isButtonDissabled}>Devitear</Button>
            </div>
          </form>
        </div>
      </AppLayout>
      <style jsx>{styles}</style>
    </>
  )
}
