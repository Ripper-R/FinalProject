import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {connect} from 'react-redux'
import {LogOutfunc} from '../../redux/actions'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const Navbar = ({username,isLogin,role,cart,LogOutfunc}) => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const [anchorEl,setopen]=useState(null)
  // const [anchorElcart,setopencart]=useState(null)

  const Logoutbtn=()=>{
    localStorage.removeItem('id')
    LogOutfunc()
  }

  const Logoutmobile = () =>{
    Logoutbtn ()
    closeMobileMenu()
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const StyledBadge = withStyles(() => ({
    badge: {
      right: -3,
      top: 3,
      color:'white',
      fontSize:11,
      background: '#F06262',
      
      padding: '0 0px',
    },
  }))(Badge);
  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            DrugStore
            <i className="fas fa-prescription-bottle-alt" ></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link 
                to="/" 
                className="nav-links" 
                onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
              {
                role==='admin'?
              <li className="nav-item">
              <Link
                to="/admin"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Manage Admin
              </Link>
              </li>
              :
              role==='user'?
              <li className="nav-item">
              <Link
                to="/cart"
                className="nav-links"
                onClick={closeMobileMenu}
              >
              <StyledBadge badgeContent={cart.length} color='secondary' >
                <span style={{fontSize:20}}>
                <i class="fas fa-cart-plus"></i>
                </span>
              </StyledBadge>
              </Link>
            </li>
              :
              null
              }

              {
                isLogin && role!=='admin' ?
                <li className="nav-item">
                <Link
                  to={"/userhistory/" + localStorage.getItem('id')}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                <i class="fas fa-user"></i> &nbsp; {username}
                </Link>
              </li>
              :
              null
            }

            {isLogin?
              <Link
                to="/"
                className="nav-links-mobile"
                onClick={Logoutmobile}
              >
                Log-Outs
              </Link>
              :
              <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Log-In
            </Link>
          }
            </ul>
              
          {
          isLogin?
          button && <Link to='/' className='btn-mobile'><Button onClick={Logoutbtn} buttonStyle="btn--outline">Log-Out</Button></Link>
          :
          button && <Link to='/login' className='btn-mobile'><Button buttonStyle="btn--outline">Log-In</Button></Link>
          }
        </div>
      </nav>
    </>
  );
}

const MapstatetoProps=({Auth})=>{
  return {
    ...Auth
  }
}

export default connect(MapstatetoProps,{LogOutfunc})(Navbar);
