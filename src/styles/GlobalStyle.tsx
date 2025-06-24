import { Global, css } from '@emotion/react';

const globalStyles = css`
  @font-face {
    font-family: 'NanumSquare';
    font-weight: 300;
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareL.eot');
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareL.eot?#iefix') format('embedded-opentype'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareL.woff2') format('woff2'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareL.woff') format('woff'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareL.ttf') format('truetype');
  }

  @font-face {
    font-family: 'NanumSquare';
    font-weight: 400;
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareR.eot');
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareR.eot?#iefix') format('embedded-opentype'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareR.woff2') format('woff2'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareR.woff') format('woff'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareR.ttf') format('truetype');
  }

  @font-face {
    font-family: 'NanumSquare';
    font-weight: 700;
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareB.eot');
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareB.eot?#iefix') format('embedded-opentype'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareB.woff2') format('woff2'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareB.woff') format('woff'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareB.ttf') format('truetype');
  }

  @font-face {
    font-family: 'NanumSquare';
    font-weight: 800;
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareEB.eot');
    src: url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareEB.eot?#iefix') format('embedded-opentype'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareEB.woff2') format('woff2'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareEB.woff') format('woff'),
         url('${import.meta.env.VITE_BASE_URL}/fonts/NanumSquareEB.ttf') format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'NanumSquare', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 600;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export const GlobalStyle = () => <Global styles={globalStyles} />; 