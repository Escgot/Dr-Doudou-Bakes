import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/shared/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { RecipeProvider } from './context/RecipeContext';
import { GalleryProvider } from './context/GalleryContext';
import { CartDrawer } from './components/shared/CartDrawer';

// Lazy load components
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const OurDesserts = lazy(() => import('./pages/OurDesserts').then(m => ({ default: m.OurDesserts })));
const Foodservice = lazy(() => import('./pages/Foodservice').then(m => ({ default: m.Foodservice })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Recipes = lazy(() => import('./pages/Recipes').then(m => ({ default: m.Recipes })));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail').then(m => ({ default: m.RecipeDetail })));

// New E-Commerce & Admin Pages
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation').then(m => ({ default: m.OrderConfirmation })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <RecipeProvider>
        <GalleryProvider>
        <ProductProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <CartDrawer />
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/our-desserts" element={<OurDesserts />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                    <Route path="/foodservice" element={<Foodservice />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>
          </CartProvider>
        </ProductProvider>
        </GalleryProvider>
      </RecipeProvider>
    </LanguageProvider>
  );
}

export default App;
