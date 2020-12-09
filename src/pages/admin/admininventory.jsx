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


const admininventory=()=>{
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
      const [inventory,setinventor]=useState([])

      useEffect(()=>{
        console.log('masuk')
        const fetch=()=>{
          axios.get(`${API_URLbe}/product/getkimia`)
          .then((res)=>{
            console.log(res.data)
            setinventor(res.data)
            seteditform({...editform,price:res.data[0].price})
          }).catch((err)=>{
            console.log(err)
          })
        }
        fetch()
      },[])

    const renderTable=()=>{
        return inventory.map((val,index)=>{
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


    return (
       <>
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

export default admininventory