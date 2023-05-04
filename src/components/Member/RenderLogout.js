import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RenderLogout = () => {
    const getItem = localStorage.getItem('userData')
    const navigate = useNavigate()
    function Logout () {
        localStorage.removeItem('userData')
        localStorage.removeItem('cart')
        navigate('/login')
    }
    if(getItem){
        const checkIsLogged = JSON.parse(getItem)
        if(checkIsLogged.isLogin){
            return (
                <li onClick={Logout}><Link to="/"><i className="fa fa-lock" /> Logout</Link></li>
            )
        }
    }else {
        return (
            <li><Link to="/login"><i className="fa fa-lock" /> Login</Link></li>
        )
    }
};

export default RenderLogout;