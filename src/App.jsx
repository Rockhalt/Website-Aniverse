import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HeroSlider } from './components/HeroSlider';
import { ProductArchive } from './components/ProductArchive';
import {EditorialSpotlight} from './components/EditorialSpotlight';
import {Routes, Route} from 'react-router-dom';




function App() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <EditorialSpotlight />
      <ProductArchive/>
      <Footer />
      
    </div>
  );
}

export default App
