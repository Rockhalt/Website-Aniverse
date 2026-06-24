import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './components/supabaseService';

import { Metrics } from './components/Metrics';
import { CartSlider } from './components/CartSlider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { ProductArchive } from './components/ProductArchive';
import { EditorialSpotlight } from './components/EditorialSpotlight';
import { ProductDetail } from './components/ProductDetail';
import Checkout from './Checkout'; 
import { Signup } from './components/Signup';
import { Login } from './components/Login';

function App() {
  const [session, setSession] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  // ✦ Listen to the database to check if a user has clearance ✦
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✦ Elite loading screen while verifying credentials ✦
  if (isChecking) {
    return (
      <div style={{ 
        height: '100vh', 
        backgroundColor: '#030303', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#8b0000', 
        fontFamily: 'Impact, sans-serif',
        letterSpacing: '2px',
        fontSize: '1.5rem'
      }}>
        VERIFYING VAULT ACCESS...
      </div>
    );
  }

  return (
    <div>
      {/* Only show the Navbar and Cart if the user is successfully logged in */}
      {session && <Navbar />}
      {session && <CartSlider />}
      
      <Routes>
        {/* --- PUBLIC ROUTES (No Login Required) --- */}
        {/* If they are already logged in and try to go to login, bounce them to the Vault */}
        <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={session ? <Navigate to="/" /> : <Signup />} />

        {/* --- PROTECTED ROUTES (Login Strictly Required) --- */}
        {/* If they are NOT logged in and try to access these, bounce them to /login */}
        
        <Route path="/" element={
          session ? (
            <>
              <HeroSlider />
              
              <ProductArchive />
              
            </>
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        <Route path="/shop/:category" element={session ? <ProductArchive /> : <Navigate to="/login" />} />
        <Route path="/metrics" element={session ? <Metrics /> : <Navigate to="/login" />} /> 
        <Route path="/product/:id" element={session ? <ProductDetail /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={session ? <Checkout /> : <Navigate to="/login" />} />
      </Routes>

      {/* Only show the Footer if the user is logged in */}
      {session && <Footer />}
    </div>
  );
}

export default App;