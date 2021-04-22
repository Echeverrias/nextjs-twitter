import css from 'styled-jsx/css'

import { colors } from 'styles/themes.js'

export default css`
  header {
    align-items: center;
    background: #ffffffaa;
    backdrop-filter: blur(5px);
    border-bottom: 1px solid #ccc;
    display: flex;
    height: 49px;
    position: sticky;
    top: 0;
    width: 100%;
  }

  h2 {
    font-size: 21px;
    font-weight: 800;
    padding-left: 15px;
    flex: 1;
  }
  a {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 5px;
  }

  a:hover {
    background: radial-gradient(#0099ff22 15%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
    cursor: pointer;
  }

  a:hover > :global(svg) {
    stroke: ${colors.primary};
  }
`
