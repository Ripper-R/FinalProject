import React,{useEffect,useState} from 'react';
import Axios from 'axios'
import {Button} from './../components/homecomponent/Button'

const Proddetails=(props)=>{

    const [Prod,setProd]=useState({})
    
    useEffect(()=>{
        Axios.get(`http://localhost:8080/product/getproduct/${props.match.params.id}`)
        
        .then((res)=>{
            console.log(res.data)
            setProd(res.data.dataprod)
        })
        .catch((res)=>{

        })
    },[])

 return(
     <div style={{width:'100%',height:'100%'}}>
        <div style={{width:'100%',height:500,display:'flex',justifyContent:'center',alignItems:'center'}}>
         

                     <div>
                        <div>
                        <img src={`http://localhost:8080/${Prod.banner}`} style={{width:550,height:400}}/>
                        </div>
                        <div>
                            nama : {Prod.nama}
                        </div>
                        <div>
                            price : {Prod.price}
                        </div>
                        <div>
                            deskripsi : {Prod.deskripsi}
                        </div>
                        <div>
                            <Button>Add to CART</Button>
                        </div>


                     </div>   
            
        </div> 
     </div>
 )   
}

export default Proddetails