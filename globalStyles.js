import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
    ${normalize}
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .centered-modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background-color: transparent;
        z-index: 3000;
        transition: background-color 0.2s ease-out;
        &--after-open {
            background-color: rgba(17,17,17,0.8);
        }
        &--before-close {
            background-color: transparent;
        }
    }
    .gallery-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        &--after-open {
            opacity: 1;
        }
        &--before-close {
            opacity: 0;
        }
    }
    
    .create-list-modal__content-container {
        opacity: 0;
        transform: translateY(150px) scale(0.6);
        transition: opacity 0.2s ease-out, transform 0.2s ease-out;
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        width: calc(100% - 40px);
        max-width: 600px;
        @media (min-width: 400px) {
            padding: 20px;
        }
        &--after-open {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        &--before-close {
            opacity: 0;
            transform: translateY(150px) scale(0.6);
        }
    }
    .add-to-list-modal__content-container {
        opacity: 0;
        transform: translateY(150px) scale(0.6);
        transition: opacity 0.2s ease-out, transform 0.2s ease-out;
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        width: calc(100% - 40px);
        max-width: 320px;
        min-height: 160px;
        @media (min-width: 400px) {
            max-width: 360px;
            padding: 20px;
        }
        &--after-open {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        &--before-close {
            opacity: 0;
            transform: translateY(150px) scale(0.6);
        }
    }
    .rating-modal__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
    }
    .rating-modal__content-container {
        background: #fff;
        border-radius: 3px;
        padding: 10px;
        width: 250px;
        height: 50px;
        position: absolute;
        top: 50px;
        left: 50px;
        border: solid #222 2px;
        outline: none;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        &:focus {
            border-color: #43cbe8;
        }
        &--after-open {
            opacity: 1;
        }
        &--before-close {
            opacity: 0;
        }
    }
    .user-menu-modal__content-container {
        background: #fafafa;
        border-radius: 3px;
        position: absolute;
        border: solid #43cbe8 2px;
        outline: none;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        &--after-open {
            opacity: 1;
        }
        &--before-close {
            opacity: 0;
        }
    }
    .custom-tooltip {
        font-family: sans-serif !important;
        font-weight: 700 !important;
        font-size: 0.85rem !important;
        color: #222 !important;
        background: #fff !important;
    }
    .toast-error {
        background-color: #dc1f3b;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 600;
        color: #fff;
        border-radius: 3px;
    }
    .toast-success {
        background-color: #23bd4d;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 600;
        color: #fff;
        border-radius: 3px;
    }
    .toast-info {
        background-color: #fb8e0f;
        font-family: 'Fira Sans', sans-serif;
        font-weight: 600;
        color: #fff;
        border-radius: 3px;
    }
`;

export default GlobalStyles;