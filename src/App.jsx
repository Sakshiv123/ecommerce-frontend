// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route ,Router} from 'react-router-dom';
import ShowProduct from './component/product/ShowProduct';
import ProductDetail from './component/product/ProductDetail';
import Navbar from './component/Navbar';
import SearchProduct from './component/product/SearchProduct';
import Login from "./component/user/Login"
import Register from "./component/user/Register"
import Profile from './component/user/Profile';
import Cart from './component/Cart';
import Address from './component/Address';
import Checkout from './component/Checkout';

const App = () => {
  return (
  <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Address/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
  </>
  );
};

export default App;

