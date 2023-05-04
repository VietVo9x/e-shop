import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

function Rate(props){
    let param = useParams()
    function changeRating( newRating ) {
      const getItem = localStorage.getItem('userData')
      if(!getItem){
        alert('vui long dang nhap')
      }else {
        const userData = JSON.parse(getItem)
          let config = { 
              headers: { 
              'Authorization': 'Bearer '+ userData.token,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
              } 
          };	
          let url = 'http://localhost/laravel8/laravel8/public/api/blog/rate/' + param.id
          const formData = new FormData();
              formData.append('blog_id',param.id)
              formData.append('user_id',userData.auth.id)
              formData.append('rate',newRating)
          axios.post(url, formData, config)
          .then((response) => {
            props.setAverageRating(newRating)
          })}
      }
       // rating = 2;
      return (
        <StarRatings
          starRatedColor="red"
          changeRating={changeRating}
          numberOfStars={5}
          name='rating'
        />
      );
    }
     
      

export default Rate;