import { createGlobalStyle } from 'styled-components'

export const TEXT_SHADOW = '2px 1px 1px rgba(0, 0, 0, 0.5)'

export const COLORS = {
    secondary: '#FFF',
    primary: '#000',
    gray: '#CACACA',

    lightGray: '#CCC',
    silverGray: '#DCDCDC',
    paleGray: '#EAEAEA',
    frostyGray: '#F0F3F3',
    lightSteelBlue: '#DEEDEE',
    cautionaryYellow: '#FBCA36',
    warningOrange: '#ED8936',
    dangerRed: '#EB0000',
    whiteSmoke: '#f5f5f5',
    aliceBlue: '#F0F8FF',
}

const GlobalStyles = createGlobalStyle`
   body, :root, html {
        margin: 0;
        width: 100%;
        font-family: 'Archivo', sans-serif;
        height: 100vh;
        font-size: 13px;
        background-color: ${COLORS.secondary};
    }
    .wrapper {
    display: grid;
    padding-inline: 2rem;
    grid-template-columns: 1fr ;
    grid-template-rows: auto 1fr auto;
    overflow-x: hidden;
  }

  
body::-webkit-scrollbar {
    display: none;
}

.wrapper::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar {
    display: none;
}
`

export default GlobalStyles
