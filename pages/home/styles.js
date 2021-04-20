import css from 'styled-jsx/css'

export default css`
  article {
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 10px 15px;
  }

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
  }

  section {
  }

  nav {
    background: #fff;
    bottom: 0;
    border-top: 1px solid #eee;
    height: 49px;
    position: sticky;
    width: 100%;
  }
`
