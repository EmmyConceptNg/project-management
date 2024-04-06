import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from './redux/store/store.js';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1166EA",
    },
    secondary: {
      main: "#DFD3EC",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
          </GoogleOAuthProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
