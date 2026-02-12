import React from 'react';
import './ProductModal.css';

const ProductModal = ({ plant, isOpen, onClose, onAddToCart, isInCart }) => {
    if (!isOpen || !plant) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="product-modal glass-morphism animate-pop-in" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>×</button>

                <div className="modal-grid">
                    <div className="modal-image">
                        <img src={plant.image} alt={plant.name} />
                        <div className="plant-tag">{plant.category}</div>
                    </div>

                    <div className="modal-info">
                        <h2 className="serif">{plant.name}</h2>
                        <p className="scientific">{plant.scientificName}</p>

                        <div className="price-rating">
                            <span className="price">${plant.cost}</span>
                            <div className="stars">
                                {'★'.repeat(Math.floor(plant.rating)) + '☆'.repeat(5 - Math.floor(plant.rating))}
                                <span className="rating-num">({plant.rating})</span>
                            </div>
                        </div>

                        <p className="description">{plant.description}</p>

                        <div className="care-instructions glass-morphism">
                            <h3>Botanist's Care Guide</h3>
                            <p>{plant.care}</p>
                            <div className="specs">
                                <span><strong>Height:</strong> {plant.height}</span>
                                <span><strong>Stock:</strong> {plant.stock} available</span>
                            </div>
                        </div>

                        <button
                            className={`btn-add-large ${isInCart ? 'added' : ''}`}
                            onClick={() => onAddToCart(plant)}
                            disabled={isInCart}
                        >
                            {isInCart ? 'Already in Sanctuary' : `Add to Cart — $${plant.cost}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
