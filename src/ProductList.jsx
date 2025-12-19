import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  // Redux cart state
  const cartItems = useSelector((state) => state.cart.items);

  // Local UI state
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // Total quantity for cart icon
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://cdn.pixabay.com/photo/2016/11/22/19/31/lavender-1853569_1280.jpg",
          description: "Calming fragrance plant",
          cost: "$20",
        },
        {
          name: "Mint",
          image:
            "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing and medicinal",
          cost: "$12",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Heals skin ailments",
          cost: "$14",
        },
        {
          name: "Tulsi",
          image:
            "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
          description: "Boosts immunity",
          cost: "$10",
        },
      ],
    },
  ];

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      {/* ---------- NAVBAR ---------- */}
      <div className="navbar">
        <button onClick={onHomeClick}>Home</button>

        <button onClick={() => setShowCart(true)}>
          🛒 Cart ({totalQuantity})
        </button>
      </div>

      {/* ---------- PRODUCT LIST OR CART ---------- */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((section, index) => (
            <div key={index}>
              <h2>{section.category}</h2>

              <div className="grid">
                {section.plants.map((plant, idx) => (
                  <div className="plant-card" key={idx}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>

                    <button
                      disabled={addedToCart[plant.name]}
                      className={
                        addedToCart[plant.name]
                          ? "added-to-cart-btn"
                          : ""
                      }
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
