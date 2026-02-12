# Evergreen Luxury: Premium Botanical Shopping 🌱

Evergreen Luxury is a high-end, full-stack e-commerce platform transformed from the original `e-plantShopping` repository. It features a sophisticated "Evergreen Luxury" aesthetic, a robust Express.js backend, and a seamless React/Redux frontend integration.

---

## 🌟 Premium Features

- **Evergreen Luxury Design System**: A bespoke UI featuring Emerald & Pearl palettes, premium glassmorphism, and smooth animations.
- **Full-Stack Architecture**: Added an Express.js backend for secure authentication, session management, and a rich product API.
- **Advanced Catalog Management**:
  - **Dynamic Filtering**: Organize by category (Air Purifying, Aromatic, Medicinal).
  - **Smart Search**: Real-time discovery across the entire sanctuary.
  - **Sophisticated Sorting**: Organize by Price (Low/High), Rating, and Featured status.
- **Interactive Shopping Experience**:
  - **Sliding Cart Drawer**: A modern, non-intrusive cart management flow.
  - **Product Details Modal**: Rich botanical info, care guides, and technical specs (scientific names, rating, height).
  - **Favorites System**: Wishlist your favorite greenery with a single click.
  - **Real-time Indicators**: Quantity badges on cards and a dynamic navbar cart badge.
- **Secure Authentication**: Elegant modal-based Login and Registration system with JWT and session persistence.

---

## 🛠️ Technologies Used

### Frontend
- **React 18**: Component-based UI architecture.
- **Redux Toolkit**: Centralized state for Cart and Favorites.
- **Vite**: High-performance development and build environment.
- **CSS3/Vanilla**: Custom-crafted premium design system.

### Backend
- **Express.js**: RESTful API server.
- **JWT & Session**: Secure authentication and user handling.
- **CORS & Body-Parser**: Secure cross-origin communication.

---

## 📂 Project Structure

```bash
├── server/             # Backend Express Server & Data
│   ├── index.cjs       # Main API Server
│   └── data.cjs        # Enriched Plant Database & Users
├── src/                # Frontend React Application
│   ├── components/     # UI Components (Navbar, CartDrawer, AuthModal, etc.)
│   ├── store.js        # Redux Store Configuration
│   ├── CartSlice.jsx   # Shopping Cart logic
│   └── FavoriteSlice.jsx # Wishlist logic
└── README.md           # Documentation
```

---

## 🚀 Getting Started

### 1. Start the Backend
```bash
npm run server
```

### 2. Start the Frontend
```bash
npm run dev
```

The application will be available at: [http://localhost:5173/shoppingreact](http://localhost:5173/shoppingreact)

---

## 📌 Author

**Yaswanth Jallipalli**
*Enhanced with Evergreen Luxury Branding*
