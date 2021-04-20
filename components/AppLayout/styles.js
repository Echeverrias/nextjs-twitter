import css from 'styled-jsx/css'

import { breakpoints, fonts, colors } from '../../styles/themes'
import { addOpacityToColor } from '../../styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
    margin: auto;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    overflow-y: auto;
    position: relative;
    width: 100%;
  }

  @media (min-width: ${breakpoints.mobile}) {
    height: 90vh;
    width: ${breakpoints.mobile};
  }
`

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    font-family: ${fonts.base};
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  input,
  textarea {
    font-family: ${fonts.base};
  }
`
