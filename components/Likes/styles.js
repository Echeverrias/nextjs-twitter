import css from 'styled-jsx/css'

import { colors } from 'styles/themes.js'

export default css`
  div {
    color: #09f;
  }

  section {
    display: flex;
    align-items: center;
  }

  section.disabled {
    color: grey;
  }

  section.disabled > :global(svg) {
    stroke: grey;
  }

  button {
    border: 0;
    outline: 0;
    background: transparent;
  }

  button:hover {
    background: radial-gradient(#0099ff22 15%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
    cursor: pointer;
  }

  button:hover > :global(svg) {
    stroke: ${colors.primary};
  }
`
