import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import { toggleFavorite } from "./FavoriteSlice";
import Navbar from "./Navbar";
import ProductModal from "./ProductModal";
import "./ProductList.css";
import "./Sections.css";
import "./ProductModal.css";

function ProductList({ user, onCartClick }) {
  const [plantsCategories, setPlantsCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const fetchPlants = () => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/plants')
      .then(res => {
        if (!res.ok) throw new Error("Backend connection failed");
        return res.json();
      })
      .then(data => {
        setPlantsCategories(data);
        setFilteredCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch plants", err);
        setError("Our gardeners are currently unreachable. Please ensure the backend server is running.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    let result = plantsCategories.map(cat => ({
      ...cat,
      plants: cat.plants.filter(plant =>
        (selectedCategory === "All" || cat.category === selectedCategory) &&
        (plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(cat => cat.plants.length > 0);

    // Apply Sorting
    result = result.map(cat => ({
      ...cat,
      plants: [...cat.plants].sort((a, b) => {
        if (sortBy === "PriceLow") return a.cost - b.cost;
        if (sortBy === "PriceHigh") return b.cost - a.cost;
        if (sortBy === "Rating") return b.rating - a.rating;
        return 0;
      })
    }));

    setFilteredCategories(result);
  }, [searchTerm, selectedCategory, sortBy, plantsCategories]);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, cost: `$${plant.cost}` }));
  };

  const isInCart = (name) => cartItems.some(item => item.name === name);
  const getItemQuantity = (name) => {
    const item = cartItems.find(i => i.name === name);
    return item ? item.quantity : 0;
  };
  const isFavorite = (id) => favoriteItems.some(item => item.id === id);

  const handleOpenDetails = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  console.log("ProductList Rendering", { loading, error, categoryCount: plantsCategories.length });

  if (loading) {
    return (
      <div className="loading-screen" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 className="serif">Curating Your Garden...</h2>
      </div>
    );
  }

  const categories = ["All", ...new Set(plantsCategories.map(c => c.category))];

  const scrollToSection = (sectionId) => {
    if (sectionId === 'catalog') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="product-page">
      <div className="catalog-content section-padding">
        <div className="container">
          <header className="catalog-header animate-fade-in">
            <h1 className="serif">The Evergreen Collection</h1>
            <p className="subtitle">Premium plants for a sophisticated home</p>

            <div className="filter-bar glass-morphism">
              <input
                type="text"
                placeholder="Search our sanctuary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="category-filters">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={selectedCategory === cat ? 'active' : ''}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="sort-controls">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Default">Sorted by: Featured</option>
                  <option value="PriceLow">Price: Low to High</option>
                  <option value="PriceHigh">Price: High to Low</option>
                  <option value="Rating">Top Rated</option>
                </select>
              </div>
            </div>
          </header>

          {error ? (
            <div className="no-results animate-fade-in">
              <h3 className="serif">{error}</h3>
              <button className="btn-primary" onClick={fetchPlants} style={{ marginTop: '20px' }}>
                Retry Connection
              </button>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="no-results animate-fade-in">
              <h3 className="serif">No plants match your discovery.</h3>
              <p>Try broadening your horizons.</p>
            </div>
          ) : (
            filteredCategories.map((category, idx) => (
              <section key={idx} className="category-section animate-fade-in">
                <h2 className="category-title serif">{category.category}</h2>
                <div className="premium-grid">
                  {category.plants.map((plant) => (
                    <div className="plant-card premium-card" key={plant.id}>
                      <div className="card-image-wrapper">
                        <img src={plant.image} alt={plant.name} />
                        <div className="card-overlay">
                          <button className="quick-view" onClick={() => handleOpenDetails(plant)}>Details</button>
                        </div>
                        {getItemQuantity(plant.name) > 0 && (
                          <div className="card-qty-badge">{getItemQuantity(plant.name)}</div>
                        )}
                        <button
                          className={`btn-favorite ${isFavorite(plant.id) ? 'active' : ''}`}
                          onClick={() => dispatch(toggleFavorite(plant))}
                        >
                          {isFavorite(plant.id) ? '♥' : '♡'}
                        </button>
                      </div>
                      <div className="card-info">
                        <div className="card-header">
                          <h3 className="plant-name">{plant.name}</h3>
                          <span className="plant-price">${plant.cost}</span>
                        </div>
                        <p className="scientific-name">{plant.scientificName}</p>
                        <p className="plant-desc">{plant.description}</p>
                        <div className="card-actions">
                          <button
                            className={`btn-add ${isInCart(plant.name) ? 'btn-added' : ''}`}
                            onClick={() => handleAddToCart(plant)}
                            disabled={isInCart(plant.name)}
                          >
                            {isInCart(plant.name) ? 'In Sanctuary' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}

          <section id="inspiration" className="inspiration-section animate-fade-in section-padding">
            <div className="glass-morphism inspiration-card">
              <h2 className="serif">Curated Inspiration</h2>
              <p>Discover how to style your home with our premium selection.</p>
              <div className="inspiration-grid">
                <div className="insp-item">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Living Room" />
                  <span>Modern Sanctuary</span>
                </div>
                <div className="insp-item">
                  <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" alt="Office" />
                  <span>Executive Green</span>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="about-section animate-fade-in section-padding">
            <h2 className="serif">Our Story</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>Born from a passion for botanical elegance, Evergreen Luxury brings the finest curated greenery to the modern home.</p>
                <p>We believe that luxury is not just what you own, but the atmosphere you cultivate.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ProductModal
        plant={selectedPlant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        isInCart={selectedPlant ? isInCart(selectedPlant.name) : false}
      />
    </div>
  );
}

export default ProductList;
