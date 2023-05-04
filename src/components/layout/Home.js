import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../store/AppContext";
function Home() {
  const [product, setProduct] = useState({})
  const {qty, setQty} = useContext(AppContext)
  useEffect(()=> {
    axios.get('http://localhost/laravel8/laravel8/public/api/product')
    .then ((respone)=> {
      setProduct(respone.data.data)
    })
    .catch ((err)=> {
      console.log(err)
    })
  }, [])
  function getId(id) {
    localStorage.setItem('idProduct', id)
  }
  function buyProduct(productId) {
    const getItem = localStorage.getItem('userData')
    if (getItem) {
      // Lấy thông tin cart từ local storage
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      // Nếu cart đã có key là productId, tăng giá trị của nó lên 1, ngược lại gán giá trị 1 cho nó
      cart[productId] = cart.hasOwnProperty(productId) ? cart[productId] + 1 : 1;
      // Lưu thông tin cart vào local storage
      setQty(qty + 1)
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(cart)
    }else {
      alert("vui long dang nhap de mua hang")
    }
  }

    return (
     <React.Fragment>
      <div className="col-sm-9 padding-right">
          <div className="features_items">
            {/*features_items*/}
            <h2 className="title text-center">Features Items</h2>
            
              {Object.keys(product).map((item, index)=> {
                let image = JSON.parse(product[item].image)
                return (
                  <div className="col-sm-4" key={index}>
                    <div className="product-image-wrapper">
                      <div className="single-products" id="sp1">
                        <div className="productinfo text-center">
                          <img src={`http://localhost/laravel8/laravel8/public/upload/product/${product[item].id_user}/${image[0]}`} alt="" />
                          <h2>{`$${product[item].price}`}</h2>
                          <p>{product[item].name}</p>
                          <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</Link>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{`$${product[item].price}`}</h2>
                            <p>{product[item].name}</p>
                            <Link to="" className="btn btn-default add-to-cart" onClick={()=>{buyProduct(product[item].id)}}><i className="fa fa-shopping-cart" />Add to cart</Link>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          <li>
                            <Link to=""><i className="fa fa-plus-square" />Add to wishlist</Link>
                          </li>
                          <li>
                            <Link to="/product/detail" onClick={()=> {getId(product[item].id)}}><i className="fa fa-plus-square" />More Product</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            
          </div>
          {/*features_items*/}
      </div>
     </React.Fragment>
    )
}
export default Home;