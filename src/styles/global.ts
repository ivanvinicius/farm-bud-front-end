import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  :root {
    --color-white: #FFFF;
    --color-black: #000;

    --color-background: #F0F0F7;       /* background */
    --color-text-complement: #9C98A6;  /* placeholder */
    --color-text-base: #6A6180;        /* label */
    --color-line-in-white: #E6E6F0;    /* input border */
    --color-input-background: #F8F8FC; /* input background */
    --color-button-text: #FFFFFF;      /* input text */

    --color-gray-header: #383838;
    --color-purple: #7620D8;
    --color-purple-dark: #5506B0;
    --color-orange: #DE5431;
    --color-orange-dark: #C53E1E;

    font-size: 60%;
  }

  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
  }

  body {
    background: var(--color-background);
    -webkit-font-smoothing: antialiased !important;
  }

  #root{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body, input, button, textarea {
    font: 500 1.6rem Poppins;
    color: var(--color-text-base)
  }

  .container {
    width: 90vw;
    max-width: 70rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'MuseoModerno', cursive;
    font-weight: 400;
  }

`;
