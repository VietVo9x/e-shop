import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RenderError from '../Member/RenderError';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate()
    const [info, setInfo] = useState({})
    const [user, setUser] = useState({}) 
    useEffect(() => {
        const getItem = localStorage.getItem('userData')
        if(getItem) {
            const login = JSON.parse(getItem)
            setInfo({
                name: login.auth.name,
                email: login.auth.email,
                address: login.auth.address,
                phone: login.auth.phone,
                password:null,
                avatar: login.auth.avatar
            })
            setUser(login)
        }else {
            alert("vui long dang nhap")
            navigate('/login')
        }
    }, [])
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState("")
    const [files, setFiles] = useState("")
    //check value input
    const handleInput  = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInfo(state => ({...state,[nameInput]:value}))
    }
    //check value file
    function handleUserInputFile (e) {
        const file = e.target.files;
        //send file to api sever
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFiles(file);
        }
        reader.readAsDataURL(file[0])
    }
    function handleSubmit (e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
       
        if(info.address === ""){
            errorSubmit.address = "Vui lòng nhập địa chỉ"
            flag = false
        }
        if(info.name === ""){
            errorSubmit.name = "Vui lòng nhập tên"
            flag = false
        }
        if(info.phone === ""){
            errorSubmit.phone = "Vui lòng nhập số điện thoại"
            flag = false
        }
        if(files === "" ) {
            errorSubmit.file = "Ảnh không được để trống"
            flag = false
        }
        else{
            let getTyle = files[0].name.split(".")
            const validFilename = ["png", "jpg", "jpeg", "PNG", "JPG"]
            if(files[0].size > 1024 * 1024) {
                errorSubmit.file = "Ảnh không được quá 1MB"
                flag = false
            }else if(!validFilename.includes(getTyle[1])) {
                errorSubmit.file = "Ảnh không đúng định dạng"
                flag = false
            }
        }
        if(!flag) {
            setError(errorSubmit)
        }else {
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ user.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };	
            let url = 'http://localhost/laravel8/laravel8/public/api/user/update/' + user.auth.id
                const formData = new FormData();
                    formData.append('id_user',user.auth.id)
                    formData.append('name',info.name)
                    formData.append('email',info.email)
                    formData.append('address',info.address)
                    formData.append('password',info.password)
                    formData.append('phone',info.phone)
                    formData.append('avatar',avatar)
                axios.post(url, formData, config)
                .then((response) => {
                    let auth = response.data.Auth
                    let userLocal = {
                        auth: {...user.auth, ...auth},
                        token: response.data.token,
                        isLogin: true
                    }   
                    delete userLocal.auth.password
                    localStorage.setItem('userData',JSON.stringify(userLocal))
                })
        }
    }
    return (
        <div className="col-sm-9">
            <div className="login-form">{/*login form*/}
            <h2>User Update</h2>
            <form onSubmit={handleSubmit}>
                <input name='name'value={info.name} type="name" onChange={handleInput}/>
                <input name='email' value={info.email} type="email" readOnly />
                <input name='password'  type="password" onChange={handleInput} placeholder='******'/>
                <input name='address' value={info.address} type="text" onChange={handleInput}/>
                <input name='phone' value={info.phone} type="text" onChange={handleInput}/>
                <input name='avatar' type="file" onChange={handleUserInputFile} />
                <button type="submit" className="btn btn-default">Sign Up</button>
            </form>
            </div>
            <RenderError error={error}/>
        </div>
    );
};

export default Account;