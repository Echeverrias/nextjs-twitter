import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo.js'

import styles from './styles.js'

export default function Devit ({
  id,
  username,
  avatar,
  content,
  createdAt,
  img,
  userId
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
            {timeAgo && <time>{timeAgo}</time>}
          </div>
          <p>{content}</p>
          <div>{img && <img src={img} />}</div>
        </section>
      </article>
      <style jsx>{styles}</style>
    </>
  )
}
