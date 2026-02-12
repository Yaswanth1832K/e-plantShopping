import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const cost = parseFloat(item.cost.substring(1));
      total += cost * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: -1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-header animate-fade-in">
        <h1 className="serif">Your Sanctuary Collection</h1>
        <p>A curated selection of nature for your home.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list animate-fade-in">
          {cart.length === 0 ? (
            <div className="empty-cart glass-morphism">
              <p>Your sanctuary is waiting for its first inhabitant.</p>
              <button className="btn-primary" onClick={onContinueShopping} style={{ marginTop: '20px' }}>
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item premium-card" key={item.name}>
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3 className="serif">{item.name}</h3>
                  <p className="item-price">{item.cost}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="item-subtotal">${(parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2)}</p>
                  <button className="btn-remove" onClick={() => dispatch(removeItem(item))}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-summary premium-card animate-fade-in">
            <h2 className="serif">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${calculateTotalAmount()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">Calculated at next step</span>
            </div>
            <div className="divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${calculateTotalAmount()}</span>
            </div>
            <button className="btn-primary checkout-btn" onClick={() => alert("Checkout system coming soon to your sanctuary.")}>
              Proceed to Checkout
            </button>
            <button className="btn-secondary" onClick={onContinueShopping}>
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
