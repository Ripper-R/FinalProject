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

<h1 style={{paddingTop:25, marginBottom:25}}>
What Are You Going To Do Today?
</h1>

<div className="container">
<div className="item red">
	<img src='images/img-10.jpg' alt='product'/>
    <Link to = '/adminproduct'>
	<i className="fas fa-pills"></i>
    <h2>Product</h2>
    </Link>
</div>
    </div>
    <h1 style={{marginTop: "25px"}}>
        OR
    </h1>

<div className="container2">
<div className="item blue">
	<img src='images/img-11.jpg' alt='inventory'/>
    <Link to = '/admininventory'>
	<i className="fas fa-clinic-medical"></i>
    <h3>Inventory</h3>
    </Link>
</div>
    </div>

        </div>
</Zoom>
    )
}

export default Adminpage