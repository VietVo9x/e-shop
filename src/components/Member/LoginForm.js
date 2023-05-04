import axios from 'axios';
import React, { useState } from 'react';
import RenderError from './RenderError';
import {useNavigate} from "react-router-dom"

const LoginForm = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        level: 0,
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errors, setErrors] = useState({})
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate();

    //checbox
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    }

    //input
    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state,[nameInput]:value}))
    }

    //handle submit
    function handleSubmit (e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true;
        function validateEmail (email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( re.test(email) ) {
                return true
            }
            return false
        }
            if(!validateEmail(inputs.email)) {
                errorSubmit.email = "Email không hợp lệ"
                flag = false;
            }
            if(inputs.password === "") {
                errorSubmit.password = "Vui lòng nhập mật khẩu"
                flag = false;
            }
            if(isChecked === false) {
                errorSubmit.checked = "Vui lòng tích vào checked"
                flag = false;
            }
            if(!flag) {
                setErrors(errorSubmit)
            }
            if(flag) {
                const data = {
                    email: inputs.email,
                    password: inputs.password,
                    level: 0
                }
                
                axios.post("http://localhost/laravel8/laravel8/public/api/login", data)
                .then((response)=>{
                    if(response.data.response) {
                        setErrorMessage("Email hoặc mật khẩu sai")
                        setSuccessMessage("")
                    }else {
                        const token = response.data.token
                        const auth = response.data.Auth
                        let isLogin = true
                        let userData = {
                            token,
                            auth,
                            isLogin
                        }
                        setSuccessMessage("Đăng nhập thành công")
                        setErrorMessage("")
                        localStorage.setItem('userData',JSON.stringify(userData))
                        navigate('/')
                    }
                })
                .catch((error)=>{
                    console.log(error)
                });
            }
    }

    return (
        <div className="login-form">{/*login form*/}
            <h2>Login to your account</h2>
            <form noValidate onSubmit={handleSubmit} >
                <input name='email' type="email" placeholder="Email " onChange={handleInput}/>
                <input name='password' type="password" placeholder="Password " onChange={handleInput}/>
                <input name='level' type="number" placeholder="level " onChange={handleInput} />
                <span>
                    <input type="checkbox" className="checkbox" onChange={handleCheckboxChange} checked={isChecked}/>
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
            <RenderError error={errors}/>
            {errorMessage}
            {successMessage}
        </div>
    );
};

export default LoginForm;