import { createGlobalStyle } from 'styled-components';

export const TEXT_SHADOW = '2px 1px 1px rgba(0, 0, 0, 0.5)';

export const COLORS = {
    secondary: ' #FFFFFF',
    primary: '#000',
    card: '#FBFBFB',
    mainGray: '#CACACA',
    darkGray: '#7E7E7E',
    InputGray: '#F2F2F2',
    green: '#008000',
    dangerRed: '#EB0000',
};
type Props = {
    width: number;
};

const GlobalStyles = createGlobalStyle<Props>`
   body, :root, html {
        margin: 0;
        width: 100%;
      
        font-family: 'Archivo', sans-serif;
        font-size: 1rem;
        background-color: ${COLORS.secondary};
    }
    .wrapper {
    padding: ${({ width }) => (width < 500 ? 0 : '8px')};
    grid-template-columns: 1fr ;
    grid-template-rows: auto 1fr auto;
    display: grid;
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
`;

export default GlobalStyles;

type ColorsType = typeof COLORS;

declare module 'styled-components' {
    export type DefaultTheme = ColorsType;
}
