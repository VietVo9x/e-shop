import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Comment = (props) => {
    const [comment, setComment] = useState("")
    let param = useParams()
    function handleInput (e) {
        const value = e.target.value
        setComment(value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        let getItem = localStorage.getItem('userData')
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
            if(comment === "") {
                alert('vui long nhap binh luan')
            }
            else {
                let url = 'http://localhost/laravel8/laravel8/public/api/blog/comment/' + param.id
                const formData = new FormData();
                    formData.append('id_blog',param.id)
                    formData.append('id_user',userData.auth.id)
                    formData.append('id_comment',props.idComment)
                    formData.append('comment',comment)
                    formData.append('image_user',userData.auth.avatar)
                    formData.append('name_user',userData.auth.name)
                axios.post(url, formData, config)
                .then((response) => {
                    console.log(props.idComment)
                    props.getCmt(response.data.data)
                })
            }
        }

    }
    
    return (
        <div className="text-area">
            <div className="blank-arrow">
            <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea name="message" rows={11} defaultValue={""} onChange={handleInput}/>
            <a className="btn btn-primary"  onClick={handleSubmit} href="true">post comment</a>
        </div>
    );
};

export default Comment;