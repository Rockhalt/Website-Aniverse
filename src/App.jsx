import { CartSlider } from './components/CartSlider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { ProductArchive } from './components/ProductArchive';
import { EditorialSpotlight } from './components/EditorialSpotlight';
import { Routes, Route } from 'react-router-dom';

// Make sure these match the exact spelling of your new files!
import Checkout from './Checkout'; 
import Metrics from './Metrics';

function App() {
  return (
    <div>
      <Navbar />
      <CartSlider />
      
      {/* The TV Screen that changes based on the URL */}
      <Routes>
        
        {/* URL: "/" (Home Page) */}
        <Route 
          path="/" 
          element={
            <>
              <HeroSlider />
              <EditorialSpotlight />
              <ProductArchive />
            </>
          } 
        />

        {/* URL: "/checkout" */}
        <Route path="/checkout" element={<Checkout />} />
        
        {/* URL: "/metrics" */}
        <Route path="/metrics" element={<Metrics />} />
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;