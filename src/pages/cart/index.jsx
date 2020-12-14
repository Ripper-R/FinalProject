import React, { Component, createRef } from 'react';
import Navbar from '../../components/homecomponent/Navbar'
import { connect } from 'react-redux'
import Axios from 'axios'
import { API_URLbe, priceFormatter,credit } from '../../helper/idformat';
import Notfound from '../notfound'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Input from '@material-ui/core/Input'
import { Button } from "../../components/homecomponent/Button";
import {AddcartAction} from '../../redux/actions'
import { Zoom } from 'react-reveal/Zoom'
import Swal from 'sweetalert2'
import Modal from '@material-ui/core/Modal';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'

const useStyles = theme =>({
root: {
    width: '100%',
},
container: {
    maxHeight: 350,
},
paper: {
    position: 'realtive',
    width: 350,
    backgroundColor: 'whitesmoke',
    padding:10,
    height :200,
    marginTop:500,
    marginLeft:'38%',
    borderRadius:10
}
});
class Cart extends Component {
    

state = {
    cart:[],
    isOpen:false,
    pilihan:0,
    bukti:createRef(),
    cc:createRef(),
    idtrans:0,
    buktitrans:null,
    isClose:false

}
componentDidMount(){
    // Axios.get(`${API_URL}/carts?userId=${this.props.id}&_expand=product`)
    console.log(this.props.id)
    Axios.get(`${API_URLbe}/trans/getcart`,{
        params:{
            userid:this.props.id,
        }
    })
    .then((res)=>{
        console.log(res.data)
        this.setState({cart:res.data,idtrans:res.data[0].idtrans})
    }).catch((err)=>{
        console.log(err)
    })
}


oninputfilechange=(e)=>{
    if(e.target.files[0]){
        this.setState({buktitrans:e.target.files[0]})
    }else{
        // console.log('hapus')
        this.setState({buktitrans:null})
    }
    }

renderTotalprice=()=>{
    var total=this.state.cart.reduce((total,num)=>{
        return total+(num.price*num.qty)
    },0)
    console.log(total)
    return total
}

renderCart=()=>{
    return this.state.cart.map((val,index)=>{
        console.log(this.state.cart)
        return(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.nama}</TableCell>
                <TableCell>
                    <div style={{maxWidth:'200px'}}>
                        <img width='100%' height='100%' src={API_URLbe+val.banner} alt={val.nama}/>
                    </div>
                </TableCell>
                <TableCell>{val.qty}</TableCell>
                <TableCell>{priceFormatter(val.price)}</TableCell>
                <TableCell>{priceFormatter(val.price*val.qty)}</TableCell>
            </TableRow>
        )
    })
}

// transaction itu ada id,status,userId,tanggalpembayaran,metode,buktipembayaran,
// transactionDetails id,transactionId,productId,price,qty
onBayarClick=()=>{
    const {pilihan} =this.state
    if(pilihan==='1'){
        this.onbayarpakebukti()
    }else if(pilihan==='2'){
        if(credit(parseInt(this.state.cc.current.value))){
            this.onbayarpakeCC()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Not a credit card number!',
                })
        }
    } else {
        Swal.fire(
            'Metode Pembayaran?',
            'Dont forget to choose your payment method!',
            'question'
            )
    }
}
onbayarpakeCC=()=>{
    Axios.post(`${API_URLbe}/trans/bayarcc`,{
        idtrans:this.state.idtrans,
        nomercc:this.state.cc.current.value,
        datacart:this.state.cart
    },{
        headers:{
            'Authorization':`Bearer ${this.props.token}`
        }
    }).then((res)=>{
        if(res.data === 'berhasil'){
            this.props.AddcartAction([])
            this.setState({cart:[],isOpen:false})
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Thank you for trust your Drugstore!',
                showConfirmButton: false,
                timer: 1500
                })
        }
    }).catch(err=>{
        console.log(err)
    })
}
onbayarpakebukti=()=>{
    console.log('onbayarpakebukti');
    Swal.fire({
        icon: 'error',
        title: 'Payment method not available at now',
        text: 'Payment method still under maintenance',
        })
    // var formData=new FormData()
    // var options={
    //     headers:{
    //         'Content-type':'multipart/form-data',
    //         'Authorization':`Bearer ${this.props.token}`
    //     },
    //     params:{
    //         userid:this.props.id
    //     }
    // }
    // formData.append('bukti',this.state.buktitrans)
    // formData.append('data',JSON.stringify({idtrans:this.state.idtrans}))
    // Axios.post(`${API_URLbe}/trans/bayarbukti`,formData,options)
    // .then((res)=>{
    //     if(res.data === 'berhasil'){
    //         this.props.AddcartAction([])
    //         this.setState({cart:[],isOpen:false,buktitrans:null})
    //         Swal.fire({
    //             position: 'top-center',
    //             icon: 'success',
    //             title: 'Thank you for trust your Drugstore!',
    //             showConfirmButton: false,
    //             timer: 1500
    //             })
    //     }
    // }).catch((err)=>{
    //     console.log(err)
    // })
}
onCheckOutClick=()=>{
    this.setState({isOpen:true})
}
onCheckClick=()=>{
    this.setState({isOpen:false})
}
body=()=>{
const{classes}=this.props
return(

<div className={classes.paper} style={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
    <h4 style={{backgroundColor:'rgb(92, 166, 226)', color:'whitesmoke', fontFamily:'inherit'}}>Choose your payment method</h4>
    <div style={{marginTop:10}}>
        <Select onChange={(e)=>this.setState({pilihan:e.target.value})} className='form-control' defaultValue={0} >
                    <MenuItem value="0" hidden>Select payment</MenuItem>
                    <MenuItem value="1">Upload your invoice</MenuItem>
                    <MenuItem value="2">Credit card</MenuItem>
        </Select>
                    {
                        this.state.pilihan==2?
                        <input className='form-control' ref={this.state.cc} placeholder='CC Number'/>
                        :
                        this.state.pilihan==1?
                        <Input className='form-control' onChange={this.oninputfilechange} type='file'   label={this.state.buktitrans?this.state.buktitrans.name:'Select bukti'}/>
                        :
                        null
                }
            <div style={{marginBottom:10, marginTop:10}}>
            Total price  {priceFormatter(this.renderTotalprice())}
            </div>
            <div>
            <Button buttonStyle='btn--background' onClick={this.onBayarClick}>
            CheckOut
            </Button>
            </div>
    </div>
</div>
)
}
    


render() {
    const {classes}=this.props;
    if(this.props.role==='user') {
        return (
            <div>
                <Modal
                open={this.state.isOpen}
                onClose={this.onCheckClick}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                disableAutoFocus='true'
                disablePortal='true'
                isOpen={this.state.isOpen} 
                toggle={()=>this.setState({isOpen:false})}
                >
                    
                    {this.body()}
                    
                </Modal>
                <div className=' pt-3 martgintop' style={{paddingLeft:'10%',paddingRight:'10%', marginTop:50}}>
                    <Paper >
                        <TableContainer >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell style={{width:'200px'}}>Nama Obat</TableCell>
                                        <TableCell style={{width:'200px'}}>Gambar</TableCell>
                                        <TableCell>Jumlah</TableCell>
                                        <TableCell>price</TableCell>
                                        <TableCell>subtotal price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.renderCart()}
                                </TableBody>
                                <TableFooter>
                                    <TableCell colSpan={4}></TableCell>
                                    <TableCell style={{fontWeight:'700',color:'black',fontSize:20}}>Subtotal price</TableCell>
                                    <TableCell style={{color:'black',fontSize:20}}>{priceFormatter(this.renderTotalprice())}</TableCell>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <Button buttonStyle='btn--background' buttonSize='btn--medium' onClick={this.onCheckOutClick}>
                            CheckOut
                        </Button>
                        <Button buttonStyle='btn--background2' style={{marginLeft:20}} onClick={(e)=> {Axios.delete(`${API_URLbe}/trans/clearCart`)}}>
                            Clear Cart
                        </Button>
                    </Paper>
                </div>
            </div>
        );
    }else{
        return(
            <Notfound/>
        )
    }
}
}
const MapstatetoProps=({Auth})=>{
return {
    ...Auth
}
}
export default connect(MapstatetoProps,{AddcartAction})(withStyles(useStyles)(Cart));
