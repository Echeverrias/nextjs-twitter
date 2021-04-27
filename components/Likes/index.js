import { useState } from 'react'
import Like from 'components/Icons/Like'
import { updateDevit } from 'firebase/client.js'

import styles from './styles.js'

export default function Likes({ likes, user, id }) {
  const [likes_, setLikes_] = useState(likes)

  const handleLike = (e) => {
    e.preventDefault()
    if (likes_.includes(user.uid)) {
      const i = likes_.indexOf(user.uid)
      likes_.splice(i, 1)
    } else {
      likes_.push(user.uid)
    }
    setLikes_([...likes_])
    updateDevit(id, { likes: likes_ })
  }

  return (
    <>
      <section className={''}>
        <button className="icon" onClick={handleLike}>
          <Like width={32} height={32} stroke="#09f" />
        </button>
        {likes_?.length > 0 ? (
          likes_.find((like) => like === user?.uid) ? (
            <div>
              &nbsp;
              {likes_.length > 1
                ? `You and ${likes_.length - 1} others`
                : `${likes_.length} Like${likes_.length > 1 ? 's' : ''}`}
            </div>
          ) : (
            <div>
              &nbsp;{likes_.length} {likes_.length === 1 ? 'Like' : 'Likes'}
            </div>
          )
        ) : (
          <div> 0 Likes</div>
        )}
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

/*
 {if (likes_.length > 0) {
                        return likes_.find((like) => like === (user?.uid))
        ? (
          <div>&nbsp;{likes_.length > 1 ? `You and ${likes_.length - 1} others` : `${likes_.length} like${likes_.length > 1 ? "s" : ""}`}<div/>
        ) : (
          <div>&nbsp;{likes_.length} {likes_.length === 1 ? 'Like' : 'Likes'}<div/>
        );
        }}
        */
