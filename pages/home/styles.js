import css from 'styled-jsx/css'

export default css`
  article {
    display: flex;
    padding: 10px 15px;
  }

  header {
    align-items: center;
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
  }

  section {
    padding-top: 49px;
  }

  nav {
    bottom: 0;
    border-top: 1px solid #ccc;
    height: 49px;
    position: sticky;
    width: 100%;
  }
`
