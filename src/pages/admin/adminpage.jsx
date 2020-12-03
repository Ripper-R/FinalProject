import { Button } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom'


const Adminpage=()=>{
    return(
        <div style={{height:600}}>
            
            <div style={{width:'100%',height:'100%',backgroundImage:'./images/img-2.jpg',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
                <h1 style={{marginBottom:10}}>What are you going to do today??</h1>
                <br></br>
                <Button><Link to='/adminproduct'>TO PRODUCT</Link></Button>
                <Button><Link to='/increaseinventory'>+Inventory</Link></Button>
            </div>
        </div>
    )
}

export default Adminpage