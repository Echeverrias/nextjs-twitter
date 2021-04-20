import Avatar from 'components/Avatar'

import styles from './styles.js'

export default function Devit ({
  id,
  username,
  avatar,
  content,
  createdAt,
  userId
}) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} withText={false} />
        </div>
        <section>
          <strong>{username}</strong>
          <data>{createdAt}</data>
          <p>{content}</p>
        </section>
      </article>
      <style jsx>{styles}</style>
    </>
  )
}
