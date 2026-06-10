import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HeroSlider } from './components/HeroSlider';
import { ProductArchive } from './components/ProductArchive';
import {EditorialSpotlight} from './components/EditorialSpotlight';
import {Routes, Route} from 'react-router-dom';
import { Trending } from './components/Trending';
import { Clothes } from './components/Clothes';
import { Figures } from './components/Figures';
import { Katana } from './components/Katana';
import { Accessories } from './components/Accessories';



function App() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <EditorialSpotlight />
      <ProductArchive/>
      <Footer />
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/figures" element={<Figures />} />
        <Route path="/katana" element={<Katana />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
      
    </div>
  );
}

export default App
