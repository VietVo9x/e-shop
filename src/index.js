import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom";
import Home from './components/layout/Home';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Product from './Product';
import Blog from './components/Blog/Blog';
import Login from './components/Member';
import BlogDetail from './components/Blog/BlogDetail';
import Account from './components/acccount/Account';
import ProductAdd from './components/acccount/ProductAdd';
import Myproduct from './components/acccount/myproduct/Myproduct';
import  { AppProvider } from './store/AppContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <App>
          <Routes>
            <Route index path='/' element={<Home/>} />
            <Route  path='/blog/list' element={<Blog/>} />
            <Route  path='/blog/detail/:id' element={<BlogDetail/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/account' element={<Account/>} />
            <Route  path='/account/product/add' element={<ProductAdd/>} />
            <Route  path='/cart' element={<Cart/>} />
            <Route  path='/shop' element={<Product/>} />s
            <Route  path='/product/detail' element={<ProductDetail/>} />
            <Route  path='/user/my-product' element={<Myproduct/>} />
          </Routes>
        </App>
      </AppProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
