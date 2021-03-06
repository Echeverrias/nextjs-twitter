import css from 'styled-jsx/css'

import { colors } from 'styles/themes'

export default css`
  button {
    align-items: center;
    background: ${colors.black};
    border-radius: 9999px;
    border: 0;
    color: ${colors.white};
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 800;
    outline: 0;
    padding: 8px 24px;
    transition: opacity 0.3s ease;
    user-select: none;
  }

  button[disabled] {
    pointer-events: none;
    opacity: 0.2;
  }

  button > :global(svg) {
    margin-right: 8px;
  }

  button:hover {
    opacity: 0.7;
  }
`
