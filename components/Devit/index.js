import Avatar from 'components/Avatar'
import Likes from 'components/Likes'
import useTimeAgo from 'hooks/useTimeAgo.js'
import useDateTimeFormat from 'hooks/useDateTimeFormat.js'

import { deleteDevit } from 'firebase/client.js'

import styles from './styles.js'
import DeleteButton from 'components/DeleteButton/index.js'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit ({
  avatar,
  content,
  createdAt,
  id,
  img,
  likes,
  user,
  userId,
  username
}) {
  const timeAgo = useTimeAgo(createdAt)
  const dateTimeFormat = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push('/status/[id]', `/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={username} src={avatar} withText={false} />
        </div>
        <section>
          <div>
            <strong>{username}</strong>
            <span>.</span>
            {timeAgo && (
              <div className="link">
                <Link href={'/status/[id]'} as={`/status/${id}`}>
                  <a>
                    <time title={dateTimeFormat}>{timeAgo}</time>
                  </a>
                </Link>
              </div>
            )}
            {userId === user.uid && (
              <DeleteButton onClick={() => deleteDevit(id)} />
            )}
          </div>
          <p>{content}</p>
          <div>{img && <img src={img} />}</div>
          <div>
            <Likes likes={likes} user={user} id={id} />
          </div>
        </section>
      </article>
      <style jsx>{styles}</style>
    </>
  )
}
