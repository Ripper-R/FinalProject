import React,{useEffect,useState} from 'react';
import Axios from 'axios'
import {Button} from './../components/homecomponent/Button'
import {API_URLbe} from './../helper/idformat'

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


    const [addqty,setqty]=useState({
        qty:''
    })

    const onhargachange=(e)=>{
        if(e.target.value===''){
          setqty({...addqty,qty:0})
          console.log(addqty.qty)
        }if(Number(e.target.value)){
            if(addqty.qty === 0){
                setqty({...addqty,qty:e.target.value[1]})
                console.log(addqty.qty)
            }else{
                setqty({...addqty,qty:e.target.value})    
                console.log(addqty.qty)
            }
        }
      }
   const onAddToCart=()=>{
        if(props.role==='admin'){
            alert('jangan beli bro inget admin')
        }else if(props.role==='user'){
            if(addqty.qty){
                Axios.post(`${API_URLbe}/trans/Addtocart`,{
                    userid:props.id,
                    productid:Prod.id,
                    qty:addqty.qty
                    
                },{
                    headers:{
                        'Authorization':`Bearer ${this.props.token}`
                    },
                }).then((res)=>{
                    props.AddcartAction(res.data)
                    alert('berhasil masuk cart')
                    console.log(res.data)
                }).catch((err)=>{
                    console.log(err)
                    alert(err)
                })
            }else{
                alert('salah broo harusnya qty disii');
            }
        }else{
            alert('berhasil')
        }
    }
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
                            <input type='number' value={addqty.qty} onChange={(e)=>onhargachange(e)} />
                        </div>
                        <div>
                            <Button onClick={()=>onAddToCart()}>Add to CART</Button>
                        </div>


                     </div>   
            
        </div> 
     </div>
 )   
}

export default Proddetails