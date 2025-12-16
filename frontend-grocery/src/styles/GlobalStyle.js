import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* --- THEME VARIABLES --- */
    :root {
        --color-primary: #fc8019; /* Swiggy Orange */
        --color-primary-dark: #e06c10;
        --color-text-dark: #3f4255; /* Dark Gray for main text */
        --color-text-light: #808080;
        --color-background: #f1f2f6; /* Off-white/Light Gray background */
        --color-white: #ffffff;
        --color-success: #28a745;
        --color-danger: #dc3545;
        --border-radius: 6px;
        --shadow-light: 0 1px 3px rgba(0, 0, 0, 0.08);
        --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* --- GLOBAL RESET & BASE STYLES --- */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: var(--color-background);
        color: var(--color-text-dark);
        line-height: 1.6;
    }

    /* Standardizes form element appearance */
    input, button, textarea, select {
        font-family: inherit;
        font-size: 100%;
    }

    /* Removes default blue focus outline and replaces with a themed outline */
    *:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(252, 128, 25, 0.4); /* Primary color focus ring */
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--color-text-dark);
        margin-bottom: 0.5rem;
        font-weight: 700;
    }

    a {
        text-decoration: none;
        color: var(--color-primary);
        transition: color 0.2s;
    }

    button {
        cursor: pointer;
        border: none;
        background-color: transparent;
    }
`;
