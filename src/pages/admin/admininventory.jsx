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


const Admininventory=()=>{
      const [inventory,setinventor]=useState([])
      const [open, setOpen] = React.useState(false);
      const [modal, setModal] = useState(false);
      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
      const classes = useStyles();
      
      const [addform,setaddform]=useState({
        nama:useRef(),
        stock:'',
      
      })
      const onhargachange=(e)=>{
        if(e.target.value===''){
          setaddform({...addform,stock:0})
        }
        if(Number(e.target.value)){
            if(addform.price === 0){
                setaddform({...addform,stock:e.target.value[1]})
            }else{
                setaddform({...addform,stock:e.target.value})    
            }
        }
      }

      useEffect(()=>{
        console.log('masuk')
        const fetch=()=>{
          axios.get(`${API_URLbe}/product/getkimia`)
          .then((res)=>{
            console.log(res.data)
            setinventor(res.data)
            // seteditform({...editform,price:res.data[0].price})
          }).catch((err)=>{
            console.log(err)
          })
        }
        fetch()
      },[])

      const OnAdddataClick=()=>{
        var formData=new FormData()
        var options={
            headers:{
              'Content-type':'multipart/form-data',
            }
        }
        var nama = addform.nama.current.value
        var stock=addform.stock
        var kimia = addform.kimia.current.value
        var data={
          nama:nama,
          stock:stock,
          kimia_id:kimia
        }
    formData.append('data',JSON.stringify(data))
    axios.post(`${API_URLbe}/product/addinventory`,formData,options)
    .then((res)=>{
      console.log(res.data)
      alert('berhasil')
    }).catch((err)=>{
      console.log(err)
    })
  
}
const body = (
  <div  className={classes.paper}>
    <div>
         <input type='text' ref={addform.nama} placeholder='Masukkan Nama' className='form-control mb-2'/>
          
               <div>
          <input type='text' onChange={(e)=>onhargachange(e)} placeholder='ml.......' value={addform.stock} className='form-control mb-2'/>
               </div>
         
      </div>
    
    <Button color="primary" onClick={()=>OnAdddataClick()}>Add data</Button>
    <Button color="secondary" onClick={()=>toggle()}>Cancel</Button>
  </div>
);
    const renderTable=()=>{
        return inventory.map((val,index)=>{
          return(
            <TableRow key={val.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.nama}</TableCell>
                
                
                <TableCell>{val.stock}</TableCell>
               
               
                <TableCell>
                  <span style={{fontSize:30}} className='text-danger mr-3'><MdDeleteForever/></span>
                  <span style={{fontSize:30}}  className='text-primary ml-3'><BiEdit/></span>  
                  <span style={{fontSize:30}}  className='text-primary ml-3'><BiPlusCircle/></span>  
                </TableCell>
            </TableRow>
          )
        })
      }
      const toggle = () => {
        setModal(!modal)
        
      }

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
       <div>
       <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>Nama</TableCell>
                          <TableCell>Stock</TableCell>
                          
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
    )
}

export default Admininventory