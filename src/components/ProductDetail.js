import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "./layout/Modal";
import { AppContext } from "../store/AppContext";
import { Navigate } from "react-router-dom";
function ProductDetail() {
  const [product, setProduct] = useState({})
  const [qtyProduct, setQtyProduct] = useState(1)
  const [cart , setCart] = useState({})
  const [images, setImages] = useState([])
  const [image, setImage] = useState("")
  const [showModal, setShowModal] = useState(false);
  const {setQty} = useContext(AppContext)
  let img = `http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${image}`
  useEffect(() => {
    if(!localStorage.getItem('userData')){
      alert('vui long dang nhap')
      Navigate("/login")
    }
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(cartFromLocalStorage);
  }, []);
  useEffect(()=> {
    const getItem = localStorage.getItem('idProduct')
    if(getItem){
      const idProduct = JSON.parse(getItem);
      axios.get("http://localhost/laravel8/laravel8/public/api/product/detail/" + idProduct)
      .then ((respone)=> {
        setProduct(respone.data.data)
        setImages(JSON.parse(respone.data.data.image))
        setImage(JSON.parse(respone.data.data.image)[0])
      })
    }
  },[])
  function getImage(i){
    setImage(i)
  }
  const handleShowModal = () => setShowModal(true)
  const handleQtyUp = () => {
    setQtyProduct(state => state + 1)
  }
  const handleQtyDown = () => {
    if (qtyProduct > 1) {
      setQtyProduct(qtyProduct - 1);
    }
  }
  const addQuantity = () => {
    setQty(state => state + qtyProduct)
    setCart(prevCart => {
      const newCart = {...prevCart};
      newCart[product.id] = newCart.hasOwnProperty(product.id) ? newCart[product.id] + qtyProduct : qtyProduct;
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }
    return (
      <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 padding-right">
              <div className="product-details">{/*product-details*/}
                <div className="col-sm-5">
                  <div className="view-product">
                    {image && <img className="img1" src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${image}`} alt="" />}
                    <a href="#" rel="prettyPhoto" onClick={handleShowModal}><h3>ZOOM</h3></a>
                  </div>
                  <div id="similar-product" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      <div className="item active">
                        {images.map((i, index)=> {
                        return (
                            <a href key={index} onClick={() => {getImage(i)}}><img src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${i}`} alt="" /></a>
                            )
                          })}
                      </div>
                    </div>
                    <a className="left item-control" href="#similar-product" data-slide="prev">
                      <i className="fa fa-angle-left" />
                    </a>
                    <a className="right item-control" href="#similar-product" data-slide="next">
                      <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="product-information">{/*/product-information*/}
                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{product.name}</h2>
                    <p>ID: {product.id}</p>
                    <img src="" alt="" />
                    <span>
                      <span>US ${product.price}</span>
                      <div className="cart_quantity_button">
                              <a className="cart_quantity_up" href onClick={handleQtyDown}> - </a>
                              <input className="cart_quantity_input" type="text" value={qtyProduct} autoComplete="off" size={2} />
                              <a className="cart_quantity_down" href onClick={handleQtyUp}> + </a>
                      </div>
                      <button
                      type="button"
                      className="btn btn-fefault cart"
                      onClick={addQuantity}
                      >
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> New</p>
                    <p><b>Brand:</b> E-SHOPPER</p>
                    <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                  </div>{/*/product-information*/}
                </div>
              </div>{/*/product-details*/}
            </div>
          </div>
        </div>
      </section>
      {showModal && <Modal setShowModal={setShowModal} showModal={showModal} img={img}/>}
      </>
    )
}
export default ProductDetail;