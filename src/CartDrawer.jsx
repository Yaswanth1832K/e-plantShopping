import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const cost = parseFloat(item.cost.substring(1));
            return total + (cost * item.quantity);
        }, 0).toFixed(2);
    };

    if (!isOpen) return null;

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="cart-drawer glass-morphism animate-slide-in" onClick={e => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2 className="serif">Your Selection</h2>
                    <button className="close-drawer" onClick={onClose}>×</button>
                </div>

                <div className="drawer-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-drawer">
                            <p>Your sanctuary is empty.</p>
                            <button className="btn-primary" onClick={onClose}>Explore Catalog</button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div className="drawer-item" key={item.name}>
                                <div className="item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p>{item.cost}</p>
                                    <div className="item-qty">
                                        <button onClick={() => dispatch(updateQuantity({ name: item.name, amount: -1 }))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(updateQuantity({ name: item.name, amount: 1 }))}>+</button>
                                    </div>
                                </div>
                                <button className="remove-item" onClick={() => dispatch(removeItem(item))}>×</button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="drawer-footer">
                        <div className="total-row">
                            <span>Subtotal</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <button className="btn-primary checkout-btn" onClick={onCheckout}>
                            Checkout — ${calculateTotal()}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
