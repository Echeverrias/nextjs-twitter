import css from 'styled-jsx/css'
import { colors } from 'styles/themes.js'

export default css`
  article {
    border-bottom: 2px solid #eaf7ff;
    display: flex;
    padding: 10px 15px;
  }

  div {
    padding-right: 10px;
  }
  section {
    width: 100%;
  }

  section div {
    align-items: center;
    display: flex;
  }

  time {
    padding-left: 10px;
    font-size: 15px;
    color: grey;
    flex: 1;
  }

  p {
    line-height: 1.3125;
    margin: 0;
    padding: 15px 0px;
  }

  img {
    border-radius: 10px;
    height: auto;
    margin: auto;
    width: 100%;
    margin-bottom: 15px;
  }

  section div:hover :global(svg) {
    stroke: ${colors.primary};
  }
`
