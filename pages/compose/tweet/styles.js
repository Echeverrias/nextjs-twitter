import css from 'styled-jsx/css'

export default css`
  div {
    display: grid;
    height: 100%;
    place-content: center;
    place-items: center;
  }

  div div {
    padding: 15px;
  }

  textarea {
    border: 0;
    font-size: 21px;
    outline: 0;
    padding: 15px;
    resize: none;
    width: 100%;
  }
`
