import React from 'react';
import {products} from './Productdummy'
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


const product=()=>{
    var settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const getproduct=(product,index)=>{
        return(

          <Bounce top>
            <Card style={{flexBasis:'35%',marginTop:10,marginRight:30}} >
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
                GAMBAR
              </Typography>
              <Typography variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography  color="textSecondary">
                {product.price}
              </Typography>
              <Typography variant="body2" component="p">
                {product.details}
              
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link to='/productdetails/'>To details</Link></Button>
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
                    </Slider>
            </div>
        <div style={{width:'100%',height:500,marginTop:20,marginBottom:20,borderStyle:'solid',borderWidth:'3px'}} className='conten'>
            <div style={{flexWrap:'wrap',display:'flex',padding:40,justifyContent:'space-between'}}>
              {
                  products.map((product, index) => {
                    return getproduct(product, index)
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


export default product