
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function EditProduct(props) {
    const idEdit = props?.idEdit
    const [product, setProduct] = useState({})
    const [discount, setDiscount] = useState(0);
    const [isOnSale, setIsOnSale] = useState(false);
    const [avatar, setAvatar] = useState([]);
    const [imagesDetele, setImagesDetele] = useState([])
    const [brand, setBrand] = useState([])
    const [catelory, setCatelory] = useState([])
    const [valueCatelory, setValueCatelory] = useState("")
    const [valueBrand, setValueBrand] = useState("")
    
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
        .then((response) => {
            setBrand(response.data.brand)
            setCatelory(response.data.category)
        })
    }, [])
    useEffect(()=> {
        let userData = JSON.parse(localStorage.getItem('userData'))
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ userData.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/' + idEdit
        axios.get(url, config)
        .then((respone) => {
            setProduct(respone.data.data)
            console.log(respone)
        })
    },[idEdit])
    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setProduct((state) => ({ ...state, [name]: value }))
    }
    function handleFileInput(e) {
    const fileList = Array.from(e.target.files);
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
    //select brand + catelory
    function handleBrandChange(e) {
        const value = e.target.value;
        setValueBrand(value);
    }
    function handleCateloryChange(e) {
        const value = e.target.value;
        setValueCatelory(value);
    }
    //sale chandge
    const handleSaleChange = (e) => {
        setIsOnSale(e.target.value === "0")
    }
    const handleDiscountChange = (e) => {
        const value = e.target.value;
        setDiscount(value);
    }
    const handleCheck = (e) => {
       let isChecked = e.target.checked;
       let value = e.target.value;
       if(isChecked) {
        setImagesDetele(prev => [...prev, value])
        }else {
            const checkValue =  imagesDetele.includes(value)
            if(checkValue) {
                const demo = imagesDetele.filter(item => item !== value)
                setImagesDetele(demo)
            }
        }
    };
    function handleSubmit(e) {
        e.preventDefault();
        if(avatar == "") {
            alert("nhap file")
        }
        let url = 'http://localhost/laravel8/laravel8/public/api/user/product/add'
        const formData = new FormData();
            formData.append('name',product.name)
            formData.append('price',product.price)
            formData.append('category',valueCatelory)
            formData.append('brand',valueBrand)
            formData.append('company',product.company)
            formData.append('detail',product.detail)
            formData.append('status',product.status)
            formData.append('sale',discount)
            
            if(avatar){
                avatar.forEach((item,i) => {
                    formData.append('file[]', avatar[i])
                })
            }
            if(imagesDetele){
                imagesDetele.forEach((item,i) => {
                    formData.append('avatarCheckbox[]', imagesDetele[i])
                })
            }
        let userData = JSON.parse(localStorage.getItem('userData'))
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ userData.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        axios.post(url, formData, config)
        .then((response) => {
            console.log(response)
        })
        .catch((error)=> {
            console.log(error)
        })
    }
  return (
    <div >
            <div className="login-form form-two" >{/*login form*/}
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input name='name' defaultValue={product.name}  onChange={handleChange} type='text' />
                <input name='price' type='text' defaultValue={product.price} onChange={handleChange}/>
                <select value={valueCatelory} onChange={handleCateloryChange}>
                    <option >Please choose catelory</option>
                    {catelory.map((sp, index)=> {
                        return <option key={index} value={sp.id} >{sp.category}</option>
                    })}
                </select>
                <select value={valueBrand} onChange={handleBrandChange}>
                    <option >Please choose brand</option>
                    {brand.map((br, index) => {
                        return <option key={index} value={br.id} >{br.brand}</option>
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
                <input name='image' type='file' multiple={true} onChange={handleFileInput}/>
                <div className='images-container'>
                    {product.image?.map((i,index)=> {
                        return (
                        <div className='image-item' key={index}>
                            <img
                            src={`http://localhost/laravel8/laravel8/public/upload/product/${product.id_user}/${i}` }
                            alt=''
                            />
                            <input
                            value={i}
                            type='checkbox'
                            onChange={handleCheck}
                            />
                        </div>
                        )
                    })}
                </div>
                <textarea name='detail' defaultValue={product.detail} onChange={handleChange}/>
                <button type="submit" className="btn btn-default">Sign Up</button>
            </form>
            </div>
        </div>
  )
}

export default EditProduct