import css from 'styled-jsx/css'

import {colors} from '../../styles/themes' 

export default css`
    button{
        align-items: center;
        background: ${colors.black};
        border-radius: 9999px;
        border: 0;
        color: ${colors.white};
        cursor: pointer;
        display: flex;
        font-size: 16px;
        font-weight: 800;
        padding: 8px 24px;
        transition: opacity .3s ease;
    }
    button > :global(svg){
        margin-right: 8px;
    }
    button:hover{
        opacity: .7;
    }
`