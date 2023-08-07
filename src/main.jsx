import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import { SneakerProvider } from './context/sneaker.context';
import { CartProvider } from './context/cart.context'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SneakerProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SneakerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);