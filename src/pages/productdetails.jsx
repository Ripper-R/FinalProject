import React,{useEffect,useState} from 'react';
import Axios from 'axios'
import {Button} from './../components/homecomponent/Button'
import {API_URLbe,priceFormatter} from './../helper/idformat'
import {connect} from 'react-redux'
import {AddcartAction} from './../redux/actions'
import Swal from 'sweetalert2'
import Input from '@material-ui/core/Input'
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
    console.log(props.role)
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
                        'Authorization':`Bearer ${props.token}`
                    },
                }).then((res)=>{
                    props.AddcartAction(res.data)
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Added To Cart!',
                        showConfirmButton: false,
                        timer: 1500
                        })
                    console.log(res.data)
                }).catch((err)=>{
                    console.log(err)
                    alert(err)
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please insert your quantity!',
                    })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must login first!',
                })
        }
    }
return(
    <div style={{width:'100%',height:'100%'}}>
    <div style={{width:'100%',height:500,display:'flex',justifyContent:'center',alignItems:'center'}}>
        

                    <div>
                    <div>
                    <img src={`http://localhost:8080/${Prod.banner}`} style={{width:550,height:400}}/>
                    </div>
                    <div style={{marginBottom:20}}>
                        Nama Obat : {Prod.nama}
                    </div>
                    <div style={{marginBottom:20}}>
                        Price : {priceFormatter(Prod.price)}
                    </div>
                    <div style={{marginBottom:20}}>
                        Description : {Prod.deskripsi}
                    </div>
                    <div style={{marginBottom:20, width:30}}>
                        <Input type='number' value={addqty.qty} onChange={(e)=>onhargachange(e)} />
                    </div>
                    <div style={{margintop:20}}>
                        <Button buttonStyle='btn--background3' onClick={()=>onAddToCart()}>Add to CART</Button>
                    </div>


                    </div>   
        
    </div> 
    </div>
)   
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction}) (Proddetails);