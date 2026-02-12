import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = ({ onHomeClick, onCartClick, showCart, user, onAuthClick, onLogout, onSectionClick }) => {
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar-premium glass-morphism">
            <div className="container nav-content">
                <div className="nav-brand serif" onClick={onHomeClick}>
                    Evergreen <span className="gold-text">Luxury</span>
                </div>

                <ul className="nav-links">
                    <li className="active" onClick={() => onSectionClick('catalog')}>Catalog</li>
                    <li onClick={() => onSectionClick('inspiration')}>Inspiration</li>
                    <li onClick={() => onSectionClick('about')}>About</li>
                </ul>

                <div className="nav-actions">
                    <div className="cart-icon-wrapper" onClick={onCartClick}>
                        <span className="cart-icon">🛒</span>
                        {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                    </div>
                    {user ? (
                        <div className="user-profile">
                            <span className="welcome-text">Welcome, {user.username}</span>
                            <button className="btn-login" onClick={onLogout}>Logout</button>
                        </div>
                    ) : (
                        <button className="btn-login" onClick={onAuthClick}>Sign In</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
