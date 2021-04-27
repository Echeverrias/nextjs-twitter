import styles from './styles'

export default function DeleteButton({ disabled, onClick }) {
  return (
    <>
      <button className="delete-button" disabled={disabled} onClick={onClick}>
        x
      </button>
      <style jsx>{styles}</style>
    </>
  )
}
