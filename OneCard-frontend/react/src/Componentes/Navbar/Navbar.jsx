import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assest/logo.png';
import cart_icon from '../Assest/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";


const BASE_URL = "http://localhost:8597"
const Navbar = () => {
    // const [auth, setAuth] = useState(localStorage.getItem("auth-token"));
const navigate = useNavigate();
     const [menu,setMenu] =useState("Shop")
     const {grtTotalCartitems}= useContext(ShopContext)
    const [auth, setAuth] = useState(localStorage.getItem("auth-token"));


const userId = localStorage.getItem("userid");


const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/logout/${userId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      localStorage.removeItem("userId");   // FIXED

      navigate('/login'); // Redirect
    } else {
      alert("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("Something went wrong");
  }
};



  return (
    <>
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt= ''/>
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
        <li onClick = {()=>setMenu("Shop")}><Link to ="/" style={{textDecoration:"none",color:"#636363"}}>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
        <li onClick = {()=>setMenu("mens")} ><Link to ="/mens" style={{textDecoration:"none",color:"#636363"}}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick = {()=>setMenu("womens")}> <Link to ="/womens" style={{textDecoration:"none",color:"#636363"}}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick = {()=>setMenu("kids")}><Link to ="/kids" style={{textDecoration:"none",color:"#636363"}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">  
            <Link to = '/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{grtTotalCartitems()}</div>
            <div  className="profile"><Link to="userprofile"><CgProfile /></Link></div>
            
          </div>

    </div>
    

    
    </>
  )
}

export default Navbar;
