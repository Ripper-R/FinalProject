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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function StickyHeadTable(props) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modaledit, setModaledit] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [modalfoto,setmodalfoto]=useState(false)
  const [fotos,setfotos]=useState([null])
  const [idproductselect,setidproductselect]=useState(0)//harusnya id productselect

  const [banner,setbanner]=useState(null)

  const [addform,setaddform]=useState({
    nama:useRef(),
    price:'',
    deskripsi:useRef(),
  
  })
  const [editform,seteditform]=useState({
    nama:useRef(),
    gambar:useRef(),
    price:'',
    deskripsi:useRef()
  })
  const [indexedit,setindexedit]=useState(0)
  const [product,setProduct]=useState([])


  useEffect(()=>{
    console.log('masuk')
    const fetch=()=>{
      axios.get(`${API_URLbe}/product/getproduct`)
      .then((res)=>{
        console.log(res.data)
        setProduct(res.data)
        seteditform({...editform,price:res.data[0].price})
      }).catch((err)=>{
        console.log(err)
      })
    }
    fetch()
  },[])

  const oninputfilechange=(e)=>{
    console.log(e.target.files)
    if(e.target.files[0]){
        console.log(e.target.files[0])
        setbanner(e.target.files[0])
    }else{
        
        setbanner(null)
    }
  }

  

  const oninputfilefotochange=(e,index)=>{
    console.log(e.target.files)
    if(e.target.files[0]){
        console.log(e.target.files[0])
        let foto=fotos
        foto.splice(index,1,e.target.files[0])
        setfotos([...foto])
    }else{
      // codingan ini bissa buat hapus foto yang ada
        console.log('hapus')
        let foto=fotos
        foto.splice(index,1,null)
        setfotos([...foto])
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
  const onhargachangeedit=(e)=>{
    console.log(e.target.value)
    if(e.target.value===''){
      seteditform({...editform,harga:0})
    }
    if(Number(e.target.value)){
        if(editform.harga===0){
          seteditform({...editform,price:e.target.value[1]})
        }else{
          seteditform({...editform,price:e.target.value})    
        }
    }
  }

  
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


  const onAddphotoprod=()=>{
    var formData=new FormData()
    var options={
        headers:{
          'Content-type':'multipart/form-data',
        }
    }
    fotos.forEach((val)=>{
      formData.append('image',val)
    })
    formData.append('data',JSON.stringify({product_id:idproductselect}))
    axios.post(`${API_URLbe}/product/Addproductfoto`,formData,options)
    .then((res)=>{
      console.log(res.data)
      alert('berhasil')
    }).catch((err)=>{
      console.log(err)
    })
   
  }
  // useEffect(()=>{
  //   if(product.length){
  //     seteditform({...editform,harga:product[indexedit].harga})
  //   }
  // },[indexedit])

  const Oneditclick= (index)=>{
    setindexedit(index)
    seteditform({...editform,harga:product[index].harga})
    setModaledit(true)
    // setTimeout(() => {
    // }, 1000);
  }

  const onSaveeditClick =(id)=>{
    // var namatrip = editform.namaTrip.current.value
    // var gambar = editform.gambar.current.value
    // var tanggalmulai=editform.tanggalmulai.current.value
    // var tanggalberakhir=editform.tanggalberakhir.current.value
    // var harga=editform.harga
    // var deskripsi=editform.descripsi.current.value
    // var obj={
    //   namatrip,
    //   gambar,
    //   tanggalmulai:new Date(tanggalmulai).getTime(),
    //   tanggalberakhir:new Date(tanggalberakhir).getTime(),
    //   harga,
    //   deskripsi
    // }
  
    // axios.put(`${API_URL}/products/${id}`,obj)
    // .then(()=>{
    //   axios.get(`${API_URL}/products`)
    //     .then((res)=>{
    //       setProduct(res.data)
    //       seteditform({...editform,harga:''})
    //       setModaledit(false)
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
    // })
  }
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
      
      <Button color="primary" onClick={()=>OnAdddataClick()}>Add data</Button>
      <Button color="secondary" onClick={()=>toggle()}>Cancel</Button>
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
              <span style={{fontSize:30}} className='text-danger mr-3'><MdDeleteForever/></span>
              <span style={{fontSize:30}}  className='text-primary ml-3'><BiEdit/></span>  
              <span style={{fontSize:30}} onClick={()=>togglefoto(val.id)}  className='text-primary ml-3'><BiPlusCircle/></span>  
            </TableCell>
        </TableRow>
      )
    })
  }

  const toggle = () => {
    setModal(!modal)
    setbanner(null)
  }
  const togglefoto = (id) => {
    setmodalfoto(!modalfoto) //untuk buka modal
    setfotos([null]) //hapus foto yang ada diaaray
    if(id){
      setidproductselect(id) //untuk select id product guanya utntuk dikirimkan ke backend
    }
    // setbanner(null)
  }
    
  const toggleedit = () => setModaledit(!modaledit);

  const tambahfoto=()=>{
 
    setfotos([...fotos,null])
  }

  console.log(fotos)
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
                          <TableCell >action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTable()}
                    </TableBody>
                    </Table>
                </TableContainer>
              </Paper>
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