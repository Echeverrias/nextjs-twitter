import Avatar from 'components/Avatar'
import Likes from 'components/Likes'
import useTimeAgo from 'hooks/useTimeAgo.js'

import { deleteDevit } from 'firebase/client.js'

import styles from './styles.js'
import DeleteButton from 'components/DeleteButton/index.js'

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
