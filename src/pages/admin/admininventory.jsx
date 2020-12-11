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
const useStyles = makeStyles(()=>({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: 'white',
      border: '2px solid #000',
      padding : 30,
      height:300
    }
  }));
  

const Admininventory=()=>{
      const [inventory,setinventor]=useState([])
      const [open, setOpen] = React.useState(false);
      const [openselect, setOpenselect] = React.useState(false);

      const [modal, setModal] = useState(false);
      const [inventorynumber,setinventorynumber]=useState(null)
      
      const handleOpen = (index) => {
        setOpen(true)
        setinventorynumber(index)
        console.log(inventorynumber)
        // setinventorynumber(inventorynumber);
      };
      const handleOpense = (index) => {
        setOpenselect(true)
        setinventorynumber(index)
        console.log(inventorynumber)
        // setinventorynumber(inventorynumber);
      };

      const handleClose = () => {
        setOpen(false);
      };
      const handleClosese = () => {
        setOpenselect(false);
      };
      const classes = useStyles();
      
      const [addform,setaddform]=useState({
        adder:'',
        kimia:useRef(),
      
      })
      const onhargachange=(e)=>{
        if(e.target.value===''){
          setaddform({...addform,adder:0})
        }
        if(Number(e.target.value)){
            if(addform.price === 0){
                setaddform({...addform,adder:e.target.value[1]})
            }else{
                setaddform({...addform,adder:e.target.value})    
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
        var adder= addform.adder
        var kimia = addform.kimia.current.value
        var data={
          adder:adder,
          kimia_id:kimia
        }
   
    axios.post(`${API_URLbe}/product/upadder`,data)
    .then((res)=>{
      console.log(res.data)
      alert('berhasil')
    }).catch((err)=>{
      console.log(err)
    })
  
}
const bodyselect=()=>{
  <div style={{}} className={classes.paper}>
    <select>
    {inventory.map((val,index)=>{
    return (
      <option value={val.kimia_id}>{val.kimia_id}</option>
    )
    })}
      </select>
      
      </div>
    }
  

const body=()=>{
return inventory.map((val,index)=>{
  if(index===inventorynumber)
  return(
    <div key={index} className={classes.paper}>
      <div>
        Stock inventory
      </div>
      <br></br>
      <div key={index}  >
      Kimia : {val.nama}  
      </div>
      <div>
      Stock : {val.sum}
      </div>
      <div>
        <button onClick={()=>OnAdddataClick()}>add stock</button>
      </div>
   </div>
  )
})
}
  
    const renderTable=()=>{
        return inventory.map((val,index)=>{
          console.log(index)
          return(
            <TableRow key={val.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.nama}</TableCell>
                
                
                <TableCell>{val.sum}</TableCell>
               
               
                <TableCell>
                  <span style={{fontSize:30}} className='text-danger mr-3'><MdDeleteForever/></span>
                  {/* <span style={{fontSize:30}}  className='text-primary ml-3'><BiEdit/></span>   */}
                  <span style={{fontSize:30}}  className='text-primary ml-3' onClick={()=>handleOpen(index)}><BiPlusCircle/></span>  
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
        {/* {
          inventory.map((val,index)=>{
            return(
              <div key={index}> 
                <div>
                  {val.nama}
                </div>
                <div>
                  {val.stock}
                </div>
                <div>
                  <button>add data</button>
                  <button>cancel</button>
         

                </div>
              </div>
            )
          })
        } */}
         <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="a"
              aria-describedby="a"
          >
             <div style={{marginLeft:'30%',marginTop:200}}> 
              {body()}
             </div>
        </Modal>
        <Modal
              open={openselect}
              onClose={handleClosese}
              aria-labelledby="a"
              aria-describedby="a"
          >
             <div style={{marginLeft:'30%',marginTop:200}}> 
              {bodyselect()}
             </div>
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
              <div>
                <Button onClick={handleOpense}>add data</Button>
              </div>
          </div>
        </>
    )
}

export default Admininventory