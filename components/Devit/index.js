import Avatar from 'components/Avatar'

import styles from './styles.js'

export default function Devit ({ id, username, avatar, message }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={username} src={avatar} withText={false} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>{styles}</style>
    </>
  )
}
