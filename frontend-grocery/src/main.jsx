// src/main.jsx (Corrected Code)

import React from 'react'; // Standard import
import ReactDOM from 'react-dom/client'; // Corrected import path for createRoot
import App from './App.jsx';
import { GlobalStyle } from './styles/GlobalStyle.js';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';

// We must call createRoot on the container element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>,
);