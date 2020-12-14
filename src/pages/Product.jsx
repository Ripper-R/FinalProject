import React,{useEffect,useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './../components/homecomponent/Footer'
import Bounce from 'react-reveal/Bounce';
import './product.css'
import {Link} from 'react-router-dom'
import Axios from 'axios' 

const Product=()=>{
    var settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
   const [Data,setData]= useState([])

    useEffect(()=>{
      Axios.get('http://localhost:8080/product/getproduct')
      .then((res)=>{
        setData(res.data)
      })
      .catch(()=>{

      })
    },[])
  
    const Getproduct=(state,index)=>{
     

        return(
            
          <Bounce top>
            <Card style={{flexBasis:'25%',marginTop:10,marginRight:40,width:'100%', borderRadius:'10px', justifyContent:'center', alignItems:'center', paddingLeft:'8px', paddingRight:'8px'}} >
            <CardContent style={{alignItems:'center', display:'flex', flexFlow:'column', margin:'0 auto', width:'90%', position:'relative'}}>
              <Typography  color="textSecondary" gutterBottom>
              <img src={`http://localhost:8080/${state.banner}`} style={{width:150,height:100}}/>
              </Typography>
              <Typography variant="h5" component="h2" style={{fontFamily:'inherit'}}>
                {state.nama}
              </Typography>
              <Typography  color="textSecondary" style={{fontFamily:'inherit'}}>
                Rp {state.price},00
              </Typography>
              <Typography variant="body2" component="p" style={{fontFamily:'inherit'}}>
                {state.deskripsi}
              
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link style={{alignItems:'center', color:'black', fontSize:'20px', textDecoration:'none', width:'100%', position:'center'}} to={'/productdetails/'+state.id}><i style={{marginRight:5}} class="fas fa-dolly"></i> Go To Detail</Link></Button>
            </CardActions>
          </Card>
          </Bounce>
        )
    }
    
    return(
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <div style={{width:600,height:400,marginBottom:20,marginTop:20}}>
              <Slider {...settings}>
                  <div >
                    <img style={{width:600,height:400,justifyContent:"center"}} src='./images/img-1.jpg' alt="gambar"/>
                  </div>
                  <div>
                  <img style={{width:600,height:400,justifyContent:"center"}} src='./images/img-6.jpg' alt="gambar"/>
                  </div>
                  <div>
                  <img style={{width:600,height:400,justifyContent:"center"}} src='./images/img-5.jpg' alt="gambar"/>
                  </div>
                    </Slider>
            </div>
        <div style={{width:'100%',height:950,marginTop:20,marginBottom:20,borderWidth:'3px'}} className='conten'>
        <h1 style={{textAlign:"center", marginBottom:20, margintop:100}}>Check Out Our Latest Product!</h1>
            <div style={{flexWrap:'wrap',display:'flex',padding:40,justifyContent:'flex-start'}}>
              {
                  Data.map((val, index) => {
                    return Getproduct(val, index)
                })
              }
            </div>
        </div>
        <div style={{width:'100%'}}>

        <Footer/>
        </div>
      </div>
    )
}


export default Product