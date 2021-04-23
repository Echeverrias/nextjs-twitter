import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo.js'

import { deleteDevit } from 'firebase/client.js'

import styles from './styles.js'
import DeleteButton from 'components/DeleteButton/index.js'

export default function Devit ({
  id,
  username,
  avatar,
  content,
  createdAt,
  img,
  userId,
  actualUserId
}) {
  const timeAgo = useTimeAgo(createdAt)

  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} withText={false} />
        </div>
        <section>
          <div>
            <strong>{username}</strong>
            {timeAgo && <time>{timeAgo}ZZZf</time>}
            {userId === actualUserId && (
              <DeleteButton onClick={() => deleteDevit(id)} />
            )}
          </div>
          <p>{content}</p>
          <div>{img && <img src={img} />}</div>
        </section>
      </article>
      <style jsx>{styles}</style>
    </>
  )
}
