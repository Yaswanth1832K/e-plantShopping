import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';
import AuthModal from './AuthModal';
import CartDrawer from './CartDrawer';
import Navbar from './Navbar';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('evergreen_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  const handleLoginSuccess = (username, token) => {
    setUser({ username, token });
    localStorage.setItem('evergreen_user', JSON.stringify({ username, token }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('evergreen_user');
  };

  const scrollToSection = (sectionId) => {
    if (!showProductList) {
      setShowProductList(true);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (sectionId === 'catalog') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-container">
      {showProductList && (
        <Navbar
          onHomeClick={handleHomeClick}
          onCartClick={() => setIsCartOpen(true)}
          user={user}
          onAuthClick={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          onSectionClick={scrollToSection}
        />
      )}

      {!showProductList ? (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content animate-fade-in">
              <h1>Welcome To Evergreen <span className="gold-text">Luxury</span></h1>
              <div className="divider"></div>
              <p>Where Green Meets Sophistication</p>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button className="get-started-button" onClick={handleGetStartedClick}>
                  Explore Collection
                </button>
                {!user && (
                  <button
                    className="get-started-button"
                    style={{ background: 'transparent', border: '2px solid white', color: 'white' }}
                    onClick={() => setIsAuthOpen(true)}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className="product-list-container visible">
          <ProductList
            user={user}
            onCartClick={() => setIsCartOpen(true)}
          />
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => alert("Checkout system coming soon.")}
      />
    </div>
  );
}

export default App;
