import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { OurDesserts } from './pages/OurDesserts';
import { Foodservice } from './pages/Foodservice';
import { Contact } from './pages/Contact';

import { Recipes } from './pages/Recipes';
import { RecipeDetail } from './pages/RecipeDetail';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-desserts" element={<OurDesserts />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/foodservice" element={<Foodservice />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
    </LanguageProvider>
  );
}

export default App;
