import React, {useState,useRef, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {MdDeleteForever} from 'react-icons/md'
import {BiEdit,BiPlusCircle} from 'react-icons/bi'
import {priceFormatter, API_URL,API_URLbe} from './../../helper/idformat'
import Modal from '@material-ui/core/Modal';
import axios from 'axios'
import {connect} from 'react-redux'
import {Button} from './../../components/homecomponent/Button' 
// import from 'react-router-dom'
import Notfound from './../notfound'
const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: 20,
    marginLeft:'40%',
    marginTop:'10%'

  }
}));

function StickyHeadTable(props) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  // const [modaledit, setModaledit] = useState(false);
  
  const [idproductselect,setidproductselect]=useState(0)//harusnya id productselect
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [kimia, setKimia] = React.useState(false);

  const handleOpenkim = () => {
    setKimia(true);
    // setidproductselect(index)

  };

  const handleClosekim = () => {
    setKimia(false);
  };

  const [modalfoto,setmodalfoto]=useState(false)
  // const [fotos,setfotos]=useState([null])
  const [product,setProduct]=useState([])
  const [prodmodal,setProductmodal]=useState([])
  const [prodmodal1,setProductmodal1]=useState([])


  const [banner,setbanner]=useState(null)

  const [addform,setaddform]=useState({
    nama:useRef(),
    price:'',
    deskripsi:useRef(),
  
  })
  const [addformkim,setaddformkim]=useState({
    product_id:useRef(),
    kimia_id:useRef(),
    dosis:useRef(),
  
  })
  // const [editform,seteditform]=useState({
  //   nama:useRef(),
  //   gambar:useRef(),
  //   price:'',
  //   deskripsi:useRef()
  // })
  // const [indexedit,setindexedit]=useState(0)


  useEffect(()=>{
    console.log('masuk')
    const fetch=()=>{
      axios.get(`${API_URLbe}/product/getproduct`)
      .then((res)=>{
        console.log(res.data)
        setProduct(res.data)
        // seteditform({...editform,price:res.data[0].price})
      }).catch((err)=>{
        console.log(err)
      })
    }
    const fetch2=()=>{
          axios.get(`${API_URLbe}/product/getprodetail`)
          .then((res)=>{
            console.log(res.data)
            setProductmodal(res.data)
          }).catch((err)=>{
            console.log(err)
          })
        }
      const fetch3=()=>{
          axios.get(`${API_URLbe}/product/getprodetail2`)
          .then((res)=>{
            console.log(res.data)
            setProductmodal1(res.data)
          }).catch((err)=>{
            console.log(err)
          })
        }
        fetch()
        fetch2()
        fetch3()
    
  },[])
  
  // useEffect(()=>{
  //   
  //  
  // })

  const oninputfilechange=(e)=>{
    console.log(e.target.files)
    if(e.target.files[0]){
        console.log(e.target.files[0])
        setbanner(e.target.files[0])
    }else{
        
        setbanner(null)
    }
  }

  const onhargachange=(e)=>{
    if(e.target.value===''){
      setaddform({...addform,price:0})
    }
    if(Number(e.target.value)){
        if(addform.price === 0){
            setaddform({...addform,price:e.target.value[1]})
        }else{
            setaddform({...addform,price:e.target.value})    
        }
    }
  }
  const onhargachangekim=(e)=>{
    if(e.target.value===''){
      setaddformkim({...addformkim,dosis:0})
    }
    if(Number(e.target.value)){
        if(addform.price === 0){
            setaddformkim({...addformkim,dosis:e.target.value[1]})
        }else{
            setaddformkim({...addformkim,dosis:e.target.value})    
        }
    }
  }
  // const onhargachangeedit=(e)=>{
  //   console.log(e.target.value)
  //   if(e.target.value===''){
  //     seteditform({...editform,price:0})
  //   }
  //   if(Number(e.target.value)){
  //       if(editform.price===0){
  //         seteditform({...editform,price:e.target.value[1]})
  //       }else{
  //         seteditform({...editform,price:e.target.value})    
  //       }
  //   }
  // }

  
  const readMore=(kata='')=>{
    const hitungkata=kata.split(' ').filter((val)=>val!=='').length
    if(hitungkata>10){
      var kataarray=kata.split(' ').map((val,index)=>index<11?val:'').filter((val)=>val!=='')
      var katafinale=kataarray.join(' ')
      return (
        <>
        {katafinale}
        <span style={{color:'red'}}>Read more ..</span>
        </>
      )
    }
    return kata
  }
  const OnAdddataClick=()=>{
    var formData=new FormData()
    var options={
        headers:{
          'Content-type':'multipart/form-data',
        }
    }
    var nama = addform.nama.current.value
    var price=addform.price
    var deskripsi=addform.deskripsi.current.value
    var data={
      nama:nama,
      price:price,
      deskripsi:deskripsi
    }
    console.log(data)
    formData.append('image',banner)
    formData.append('data',JSON.stringify(data))
      axios.post(`${API_URLbe}/product/Addproduct`,formData,options)
      .then((res)=>{
        console.log(res.data)
        alert('berhasil')
      }).catch((err)=>{
        console.log(err)
      })
    
  }
  const OnAdddataClickkim=()=>{
  
    var product_id = addformkim.product_id.current.value
    console.log(product_id)
    var kimiaid=addformkim.kimia_id.current.value
    console.log(kimiaid)
    var dosis=addformkim.dosis
    console.log(dosis)
    var data={
      product_id:product_id,
      kimia_id:kimiaid,
      dosis:dosis
    }
    console.log(data)
      
      axios.post(`${API_URLbe}/product/adddosis`,data)
      .then((res)=>{
        console.log(res.data)
        alert('berhasil')
      }).catch((err)=>{
        console.log(err)
      })
    
  }

  const onclickplus=(index)=>{
    return(
      <>
      <div key={index}>
      <select ref={addformkim.kimia_id} >
        {prodmodal.map((val,index)=>{
        return (
          <option value={val.kimia_id}>{val.kimia_id}</option>
        )
        })}
      </select>
     </div>
    <input type='text' value={addformkim.dosis} onChange={(e)=>onhargachangekim(e)} placeholder='dosis'/>
    </>
    )
  }


  // useEffect(()=>{
  //   if(product.length){
  //     seteditform({...editform,harga:product[indexedit].harga})
  //   }
  // },[indexedit])

  // const Oneditclick= (index)=>{
  //   setindexedit(index)
  //   seteditform({...editform,price:product[index].price})
  //   setModaledit(true)
  //   // setTimeout(() => {
  //   // }, 1000);
  // }

  // const onSaveeditClick =(id)=>{
  //   // var namatrip = editform.namaTrip.current.value
  //   // var gambar = editform.gambar.current.value
  //   // var tanggalmulai=editform.tanggalmulai.current.value
  //   // var tanggalberakhir=editform.tanggalberakhir.current.value
  //   // var harga=editform.harga
  //   // var deskripsi=editform.descripsi.current.value
  //   // var obj={
  //   //   namatrip,
  //   //   gambar,
  //   //   tanggalmulai:new Date(tanggalmulai).getTime(),
  //   //   tanggalberakhir:new Date(tanggalberakhir).getTime(),
  //   //   harga,
  //   //   deskripsi
  //   // }
  
  //   // axios.put(`${API_URL}/products/${id}`,obj)
  //   // .then(()=>{
  //   //   axios.get(`${API_URL}/products`)
  //   //     .then((res)=>{
  //   //       setProduct(res.data)
  //   //       seteditform({...editform,harga:''})
  //   //       setModaledit(false)
  //   //     }).catch((err)=>{
  //   //       console.log(err)
  //   //     })
  //   // })
  // }

  const body = (
    <div  className={classes.paper}>
      <div>
           <input type='text' ref={addform.nama} placeholder='Masukkan Nama' className='form-control mb-2'/>
            <input type="file" className='form-control' onChange={oninputfilechange} />
                 {
                   banner?
                   <div className='my-2'>
                     <img src={URL.createObjectURL(banner)} height='200'
                     widht='200' alt="foto"/>

                   </div>
                   :
                   null
                 }
                 <div>
            <input type='text' onChange={(e)=>onhargachange(e)} placeholder='Rp....' value={addform.price} className='form-control mb-2'/>
                 </div>
            <textarea className='form-control mb-2' ref={addform.deskripsi} placeholder='deskripsi' cols="30" rows="7"></textarea>
        </div>
        <div>

         
           {onclickplus()}
          
          
        </div>
        
      
      <Button color="primary" onClick={()=>OnAdddataClick()}>Add data</Button>
      <Button color="secondary" onClick={()=>handleClose()}>Cancel</Button>
    </div>
  );
  // const bodyselect=()=>{
  //   console.log(addform.kimia)
  //   return(
      
  //     <div style={{textAlign:'center'}} className={classes.paper}>
  
  //       Pick Chemical 
  //       <select value={addform.kimia} onChange={(e)=>onhargachange(e)}>
  //       {inventory.map((val,index)=>{
  //       return (
  //         <option value={val.kimia_id}>{val.nama}</option>
  //       )
  //       })}
  //         </select>
  //         <div>
  //         <input type='text' ref={addform.adder} placeholder='tambah brp?' className='form-control mb-2'/>
  //         </div>
  //           <div>
  //             <button onClick={()=>OnAdddataClick()}>add stock</button>
  //           </div>
  //         </div>
  //     ) 
      
  //     }

  const bodykim = (
    <div  className={classes.paper}>
      <div>
      <select ref={addformkim.product_id}>
        {prodmodal1.map((val,index)=>{
        return (
          <option value={val.id}>{val.nama}</option>
        )
        })}
          </select>
                 <div>
                  <select ref={addformkim.kimia_id} >
                    {prodmodal.map((val,index)=>{
                    return (
                      <option value={val.kimia_id}>{val.kimia_id}</option>
                    )
                    })}
                  </select>
                 </div>
            <input type='text' value={addformkim.dosis} onChange={(e)=>onhargachangekim(e)} placeholder='dosis'/>
        </div>
      
      <Button color="primary" onClick={()=>OnAdddataClickkim()}>Add data</Button>
      <Button color="secondary" onClick={()=>handleClosekim()}>Cancel</Button>
    </div>
  );

  const renderTable=()=>{
    return product.map((val,index)=>{
      return(
        <TableRow key={val.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{val.nama}</TableCell>
            <TableCell>
              <div style={{maxWidth:'200px'}}>
                <img width='100%' height='100%' src={API_URLbe+val.banner} alt={val.nama}/>
              </div>
            </TableCell>
            
            <TableCell>{priceFormatter(val.price)}</TableCell>
           
            <TableCell>{readMore(val.deskripsi)}</TableCell>
              <TableCell> 
          
              </TableCell>
            <TableCell>
              <span style={{fontSize:30}} className='text-danger mr-3'><MdDeleteForever/></span>
              <span style={{fontSize:30}}  className='text-primary ml-3'><BiEdit/></span>    
            </TableCell>
        </TableRow>
      )
    })
  }


    


  // const tambahfoto=()=>{
 
  //   setfotos([...fotos,null])
  // }

  
    return (
        <>
          <Button type="button" onClick={handleOpen}>
              Add data
          </Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
          >
              {body}
        </Modal>
         
          <Modal
              open={kimia}
              onClose={handleClosekim}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
          >
              {bodykim}
        </Modal>
          {/* {
            product.length?
              <Modal isOpen={modaledit} toggle={toggleedit} >
                  <ModalHeader toggle={toggleedit}>edit data {product.length?product[indexedit].namatrip:''}</ModalHeader>
                  <ModalBody>
                     <input type='text' defaultValue={product[indexedit].nama} ref={editform.nama} placeholder='Masukkan Nama' className='form-control mb-2'/>
                     <input type='text' defaultValue={product[indexedit].gambar} ref={editform.gambar} placeholder='Masukkan Gambar' className='form-control mb-2'/>
                    
                     <input type='text' onChange={onhargachangeedit} value={editform.harga}  placeholder='Rp....'  className='form-control mb-2'/>
                     <textarea className='form-control mb-2' defaultValue={product[indexedit].deskripsi} ref={editform.descripsi} placeholder='deskripsi' cols="30" rows="7"></textarea>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={()=>onSaveeditClick(product[indexedit].id)}>save</Button>
                      <Button color="secondary" onClick={toggleedit}>Cancel</Button>
                  </ModalFooter>
              </Modal>
            :
            null
          }
          <Modal style={{marginTop:80}} isOpen={modalfoto} toggle={togglefoto} >
              <ModalHeader toggle={togglefoto}>Add Fotobanyak</ModalHeader>
              <ModalBody>
                  {
                    fotos.map((val,index)=>{
                      if(val){
                        return(
                          <>
                            <CustomInput label={val.name} type="file" onChange={(e)=>oninputfilefotochange(e,index)}  className='form-control' />
                            <div className='my-2'>
                              <img src={URL.createObjectURL(val)} height='200' widht='200' alt="foto"/>
                            </div>
                          </>
                        )
                      }
                      return(
                        <>
                          <CustomInput label={'select image ....'} type="file" onChange={(e)=>oninputfilefotochange(e,index)}  className='form-control' />
                        </>
                      )
                    })
                  }
                  <BiPlusCircle onClick={tambahfoto} />
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={onAddphotoprod}>Add data</Button>
                  <Button color="secondary" onClick={togglefoto}>Cancel</Button>
              </ModalFooter>
          </Modal> */}
          
          <div className='px-5 martgintop'>
             
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>Nama</TableCell>
                          <TableCell style={{width:'200px'}}>Gambar</TableCell>
                          <TableCell>Harga</TableCell>
                          <TableCell style={{width:'300px'}}>Description</TableCell>
                          <TableCell>Dosage</TableCell>
                          <TableCell >action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTable()}
                    </TableBody>
                    </Table>
                </TableContainer>
              </Paper>
              <div>
              <Button type="button" onClick={()=>handleOpenkim()}>
                  Add Kimia
              </Button>
              </div>
          </div>
        </>
    );
  
}
const MapstatetoProps=({Auth})=>{
  return{
    // ...Auth,
    username:Auth.username,
    isLogin:Auth.isLogin,
    role:Auth.role
    // username:Auth.username
    // username:'dino',
    // sd
  }
}
export default connect(MapstatetoProps) (StickyHeadTable);
