import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/AppContext";

function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const { qty, setQty} = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('userData')){
      alert('vui long dang nhap')
      navigate("/login")
    }
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(cartFromLocalStorage);
  }, []);

  useEffect(() => {
    axios.post("http://localhost/laravel8/laravel8/public/api/product/cart", cart)
    .then ((response) => {
      setProducts(response.data.data)
    })
    .catch (err => console.log(err))
  }, [cart]);

  const numberUp = (Upid) => {
    setCart(prevCart => {
      const newCart = {...prevCart};
      newCart[Upid] = newCart.hasOwnProperty(Upid) ? newCart[Upid] + 1 : 1;
      setQty(qty + 1)
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }

  const numberDown = (DownId) => {
    setCart(prevCart => {
      const newCart = {...prevCart};
      newCart[DownId] = newCart.hasOwnProperty(DownId) ? newCart[DownId] - 1 : 1;
      if (newCart[DownId] === 0) {
        delete newCart[DownId];
      }
      setQty(qty - 1)
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  }

  const getIdDelete = (id, quantity) => {
    setCart(prevCart => {
      const newCart = {...prevCart};
      delete newCart[id];
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log(newCart)
      setQty(qty - quantity)
      return newCart;
    });
  }
  function getTotalMoney () {
    const totalPrice = products.map((product) => {
      return product.price * product.qty
    })
    const totalPrices = totalPrice.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    return <span>{`$${totalPrices}`}</span>
  }
    return (
        <>
          <section id="cart_items">
            <div className="container">
              <div className="breadcrumbs">
                <ol className="breadcrumb">
                  <li><a href="">Home</a></li>
                  <li className="active">Shopping Cart</li>
                </ol>
              </div>
              <div className="table-responsive cart_info">
                <table className="table table-condensed">
                  <thead>
                    <tr className="cart_menu">
                      <td className="image">Item</td>
                      <td className="description" />
                      <td className="price">Price</td>
                      <td className="quantity">Quantity</td>
                      <td className="total">Total</td>
                      <td />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => {
                      let image = JSON.parse(item.image)
                      let totalPrice = item.qty * item.price
                      return (
                        <tr key={index}>
                          <td className="cart_product">
                            <a href=""><img src={`http://localhost/laravel8/laravel8/public/upload/product/${item.id_user}/${image[0]}`} alt="" /></a>
                          </td>
                          <td className="cart_description">
                            <h4><a href="">{item.name}</a></h4>
                            <p>Web ID: {item.id}</p>
                          </td>
                          <td className="cart_price">
                            <p>${item.price}</p>
                          </td>
                          <td className="cart_quantity">
                            <div className="cart_quantity_button">
                              <a className="cart_quantity_up" href onClick={()=> {numberUp(item.id)}}> + </a>
                              <input className="cart_quantity_input" type="text" name="quantity" value={item.qty} autoComplete="off" size={2} />
                              <a className="cart_quantity_down" href onClick={()=> {numberDown(item.id)}}> - </a>
                            </div>
                          </td>
                          <td className="cart_total">
                            <p className="cart_total_price">${totalPrice}</p>
                          </td>
                          <td className="cart_delete">
                            <a className="cart_quantity_delete" href  onClick={() => {getIdDelete(item.id, item.qty)}}><i className="fa fa-times" /></a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to use
              or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>Get Quotes</a>
                <a className="btn btn-default check_out" href>Continue</a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>Cart Sub Total {getTotalMoney()}</li>
                  <li>Eco Tax <span>$2</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  {/* <li>Total <span></span></li> */}
                </ul>
                <a className="btn btn-default update" href>Update</a>
                <a className="btn btn-default check_out" href>Check Out</a>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}
export default Cart;