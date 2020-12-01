import React from 'react';
import {products} from './Productdummy'
const product=()=>{
    
    const getproduct=(product,index)=>{
        return(
            <div key={index} style={{flexBasis:'50%'}}>
                <h2>{product.name}</h2>
                <p>{product.details}</p>
                <p>{product.price}</p>
            </div>
        )
    }
    
    return(
        <div style={{width:1280,height:500,borderwidth:'5px',borderstyle:'solid'}}>
            <div style={{flexWrap:'wrap',display:'flex',padding:20}}>
              {
                  products.map((product, index) => {
                    return getproduct(product, index)
                })
              }
            </div>
        </div>
    )
}


export default product