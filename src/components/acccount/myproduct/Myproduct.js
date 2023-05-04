import axios from 'axios';
import './Myproduct.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct';

function Myproduct() {
  const [data, setData] = useState({})
  const [idEdit, setIdEdit] = useState(null)
  const getItem = localStorage.getItem('userData')
  const userData = JSON.parse(getItem)
  let config = { 
      headers: { 
      'Authorization': 'Bearer '+ userData.token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
      } 
  };	
  
  useEffect(()=>{
    let url = 'http://localhost/laravel8/laravel8/public/api/user/my-product'
    axios.get(url, config)
      .then((response) => {
          const respone = response.data.data
          setData(respone)
      })
  }, [])
  function deleteProduct (id) {
    let urlDelete = 'http://localhost/laravel8/laravel8/public/api/user/product/delete/'
    axios.get(urlDelete + id, config)
    .then((respone)=> {
      console.log(respone)
      setData(respone.data.data)
    })
  }
  function getEditId (editId) {
    setIdEdit(editId)
  }
  return (
    <div>
      <section id="cart_items">
              <div className="container">
                <div className="table-responsive cart_info">
                  <table className="table table-condensed">
                    <thead>
                      <tr className="cart_menu">
                        <td >ID</td>
                        <td className="description">Name</td>
                        <td className="image">Image</td>
                        <td className="id">Price</td>
                        <td />
                        <td className="action">Action</td>
                        <td />
                      </tr>
                    </thead>
                    {Object.keys(data).map((item, index) => {
                      const getImage = data[item].image
                       if(getImage){
                        const image = JSON.parse(getImage)
                        return (
                          <tbody key={index}>
                            <tr >
                              <td className='id'>
                                <h4 >{data[item].id}</h4>
                              </td>
                              <td className='name'>
                                <h4><Link to="">{data[item].name}</Link></h4>
                              </td>
                              <td className="image">
                                <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + userData.auth.id + "/" + image[0]} alt=""/>
                              </td>
                              <td className="price">
                                <p>{data[item].price}</p>
                              </td>
                              <td className='action-edit'>
                                <Link  to="" onClick={()=> {getEditId(data[item].id)}}><i className="fa fa-pencil-square-o" /></Link>
                              </td>
                              <td className='action-delete'>
                                <Link  to="" onClick={() => deleteProduct(data[item].id)} ><i className="fa fa-times" /></Link>
                              </td>
                            </tr>
                          </tbody>
                        )
                      }
                      
                    }) }
                  </table>
                </div>
                {idEdit && <EditProduct idEdit={idEdit}/>}
              </div>
      </section>
    </div>
  )}
export default Myproduct