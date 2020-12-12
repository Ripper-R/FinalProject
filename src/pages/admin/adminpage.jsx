// import { Button } from '@material-ui/core';
// import { blue } from '@material-ui/core/colors';
import React from 'react';
import {Link} from 'react-router-dom'
import './adminpage.css';
import Zoom from 'react-reveal/Zoom';


const Adminpage=()=>{
    
    return(
<Zoom>

<div style={{height:650}}>     

<h1 style={{paddingTop:25, marginBottom:25, color:"#3e7ba3", textAlign:"center"}}>
What Are You Going To Do Today?
</h1>

<div className="admincontainer">
<div className="adminitem red">
	<img src='images/img-10.jpg' alt='product'/>
    <Link to = '/adminproduct'>
	<i className="fas fa-pills"></i>
    <h2>Product</h2>
    </Link>
</div>

<div className="adminitem blue">
	<img src='images/img-11.jpg' alt='inventory'/>
    <Link to = '/admininventory'>
	<i className="fas fa-clinic-medical"></i>
    <h3>Inventory</h3>
    </Link>
</div>
<div className="adminitem green">
    <img src='images/img-12.jpg' alt='transaction'/>
    <Link to = '/admintransaction'>
    <i class="fas fa-file-invoice-dollar"></i>
    <h4>Transaction</h4>
    </Link>
</div>

    </div>
</div>
</Zoom>
    )
}

export default Adminpage