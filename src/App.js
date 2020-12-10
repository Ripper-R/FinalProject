import React, { useEffect, useState } from 'react';
import Login from './pages/login/login'
import Navbar from './components/homecomponent/Navbar.jsx'
import Loading from './components/Loading'
import Home from './pages/Home'
import Register from './pages/register/register'
import { Switch, Route } from 'react-router-dom'
import Product from './pages/Product'
import './App.css'
import Admin from './pages/admin/adminpage'
import NotFound from './pages/notfound'
import Productde from './pages/productdetails'
import adminin from './pages/admin/admininventory'
import adminprod from './pages/admin/adminproduct'
import userhistory from './pages/userhistory'
import admintransaction from './pages/admin/admintransaction'
import Cart from './pages/cart'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import { LoginFunc, KeepLogin } from './redux/actions'
import { API_URLbe } from './helper/idformat'
import Axios from 'axios'


toast.configure()
function App(props) {

  const [loading,setloading]=useState(true)

  useEffect( ()=>{
    var id=localStorage.getItem('id')
    console.log(id)
    if(id){ 
      Axios.get(`${API_URLbe}/auth/keeplogin/${id}`)
      .then((res)=>{
        props.LoginFunc(res.data.datauser,res.data.cart)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setloading(false)
      })
    }else{
      setloading(false)
    }
  },[props])
  if(loading){
    return(
      <Loading/>
    )
  }

  // const renderProtectedroutesadmin=()=>{
  //   if(props.role==='admin'){
  //     return(
  //       <>
  //         <Route exact path='/manageAdmin' component={ManageAdmin}/>
  //       </>
  //     )
  //   }
  // };
  return (
    <>
    <Navbar/>
    <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/Login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <Route exact path='/products' component={Product}/>
    <Route exact path='/productdetails/:id' component={Productde}/>
    <Route exact path='/admin' component={Admin}/>
    <Route exact path='/admininventory' component={adminin}/>
    <Route exact path='/adminproduct' component={adminprod}/>
    <Route exact path='/userhistory' component={userhistory}/>
    <Route exact path='/admintransaction' component={admintransaction}/>
    <Route exact path='/cart' component={Cart}/>


    {/* {renderproadmin()} */}
    <Route path='*' component={NotFound} />
  </Switch>
  
  </>
  );
}

const MapstatetoProps=({Auth})=>{
  return{
    // ...Auth,
    username:Auth.username,
    isLogin:Auth.isLogin,
    role:Auth.role
  }
}

export default connect(MapstatetoProps,{LoginFunc}) (App);
