import axios from "axios";
import { useState } from "react";
import RenderError from "./RenderError";

const Register = () => {
    const [input, setInputs] = useState({
        email: "",
        name: "",
        password: "",
        phone: "",
        level: 0,
        address: "",
    })
    const [avatar, setAvatar] = useState("")
    const [files, setFiles] = useState("")
    const [error, setError] = useState({})
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    //check value input
    const handleInput  = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state,[nameInput]:value}))
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

    //submit
    function handleSubmit (e) {
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(input.email === ""){
            errorSubmit.email = "Vui lòng nhập email"
            flag = false
        }else if(!re.test(input.email)) {
            errorSubmit.email = "Email không hợp lệ"
            flag = false
        }
        if(input.password === ""){
            errorSubmit.password = "Vui lòng nhập mật khẩu"
            flag = false
        }
        if(input.address === ""){
            errorSubmit.address = "Vui lòng nhập địa chỉ"
            flag = false
        }
        if(input.name === ""){
            errorSubmit.name = "Vui lòng nhập tên"
            flag = false
        }
        if(input.phone === ""){
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

        if(!flag){
            setError(errorSubmit)
        }
        if(flag) {
            const data = {
                email: input.email,
                password: input.password,
                address: input.address,
                name: input.name,
                phone: input.phone,
                avatar: avatar,
                level:0
            }
            axios.post("http://localhost/laravel8/laravel8/public/api/register", data)
            .then ((response) => {
                console.log(response)
                if(response.data.errors) {
                    setError(response.data.errors)
                }else {
                    alert("ok")
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    return (
        <div className="signup-form">{/*sign up form*/}
            <h2>New User Signup!</h2>
            
            <form onSubmit={handleSubmit} noValidate encType='multipart/form-data'>
                <input name='name' type="text" placeholder="Name" onChange={handleInput}/>
                <input name='email' type="email" placeholder="Email Address" onChange={handleInput} />
                <input name='password' type="password" placeholder="Password" onChange={handleInput}/>
                <input name='phone' type="number" placeholder="Phone" onChange={handleInput}/>
                <input name='level' type="number" placeholder="level" onChange={handleInput}  />
                <input name='address' type="text" placeholder="address" onChange={handleInput}/>
                <input name='avatar' type="file" style={{outline: "none"}} onChange={handleUserInputFile}/>
                <button type="submit" className="btn btn-default" >Signup</button>
            </form>
            <RenderError error = {error}/>
            
        </div>
    );
};

export default Register;