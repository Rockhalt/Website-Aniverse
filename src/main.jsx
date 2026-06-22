import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './CartContext.jsx' // 1. Import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Wrap App inside CartProvider */}
      <CartProvider> 
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)