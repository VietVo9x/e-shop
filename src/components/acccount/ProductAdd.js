import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductAdd = () => {
    const [catelorys, setCatelorys] = useState([])
    const [brand, setBrand] = useState("")
    const [catelory, setCatelory] = useState("")
    const [brands, setBrands] = useState([])
    const [avatar, setAvatar] = useState([]);
    const [isOnSale, setIsOnSale] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [product, setProduct] = useState({
        name:"",
        price:0,
        status:0,
        detail:"",
        company:""
    })
    //input
    function handleOnchange (e) {
        let name = e.target.name;
        let value = e.target.value;
        setProduct((state) => ({ ...state, [name]: value }))
    }
    
    //select brand + catelory
    function handleBrandChange(e) {
        const value = e.target.value;
        setBrand(value);
    }
    function handleCateloryChange(e) {
        const value = e.target.value;
        setCatelory(value);
    }
    
    //sale chandge
    const handleSaleChange = (e) => {
        setIsOnSale(e.target.value === "0")
    }
    const handleDiscountChange = (e) => {
        const value = e.target.value;
        setDiscount(value);
    }
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
        .then((response) => {
            setBrands(response.data.brand)
            setCatelorys(response.data.category)
        })
        .catch((err) => { 
            console.log(err)
        })
    }, [])

    //check value file
    function handleFileInput(e) {
        const fileList = Array.from(e.target.files);
        // console.log(fileList)
        let validFiles = [];
    
        for (let i = 0; i < fileList.length && i < 3; i++) {
          const file = fileList[i];
          const getType = file.type.split('/')[1]
          const validExtensions = ['jpeg', 'jpg', 'png'];
    
          if (!validExtensions.includes(getType)) {
            alert(`File "${file.name}" không đúng định dạng JPEG, JPG hoặc PNG`);
            continue;
          }
    
          if (file.size > 1024 * 1024) {
            alert(`File "${file.name}" có kích thước lớn hơn 1MB`);
            continue;
          }
    
          validFiles.push(file);
        }
        
        setAvatar(validFiles);
    }
    
    function handleSubmit (e) {
        e.preventDefault()
        let getItem = localStorage.getItem('userData')
        const userData = JSON.parse(getItem)
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ userData.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/add'
            const formData = new FormData();
                formData.append('name',product.name)
                formData.append('price',product.price)
                formData.append('category',catelory)
                formData.append('brand',brand)
                formData.append('company',product.company)
                formData.append('detail',product.detail)
                formData.append('status',product.status)
                formData.append('sale',discount)
                
                if(avatar){
                    avatar.forEach((item, i) => {
                        formData.append('file[]', avatar[i])
                    })
                }
            axios.post(url, formData, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error)=> {
                console.log(error)
            })
    }   
    return (
        <div className="col-sm-9">
            <div className="login-form form-two" >{/*login form*/}
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <input name='name' type='text' placeholder='Name' onChange={handleOnchange}/>
                <input name='price' type='text' placeholder='Price' onChange={handleOnchange}/>
                <select value={catelory} onChange={handleCateloryChange} >
                    <option >Please choose catelory</option>
                    {catelorys.map((sp)=>{
                       return <option key={sp.id} value={sp.id}>{sp.category}</option>
                    })}
                </select>
                <select value={brand} onChange={handleBrandChange}>
                    <option >Please choose brand</option>
                    {brands.map((br)=>{
                       return <option key={br.id} value={br.id}>{br.brand}</option>
                    })}
                </select>
                <select name='status' onChange={handleSaleChange}>
                    <option value="1">New</option>
                    <option value="0">Sale</option>
                </select>
                {isOnSale && (
                <div>
                    <input 
                    type="number"
                    value={discount}
                    onChange={handleDiscountChange}
                    min="1" 
                    max="100"
                    style={{ width: "20%", display: "inline-block" }}
                    />
                    <span> %</span>
                </div>
                )} 
                <input name='company' type='text' placeholder='company profile' onChange={handleOnchange}/>
                <input name='image' type='file' onChange={handleFileInput} multiple={true}/>
                <textarea name='detail' placeholder='detail' onChange={handleOnchange}/>
                <button type="submit" className="btn btn-default">Sign Up</button>
            </form>
            </div>
        </div>
    );
};

export default ProductAdd;