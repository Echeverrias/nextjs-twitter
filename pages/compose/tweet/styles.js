import css from 'styled-jsx/css'

export default css`
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

  button {
    background: rgba(0, 0, 0, 0.3);
    border: 0;
    border-radius: 999px;
    color: #fff;
    font-size: 24px;
    width: 32px;
    height: 32px;
    top: 15px;
    position: absolute;
    right: 15px;
  }

  button:hover {
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`
