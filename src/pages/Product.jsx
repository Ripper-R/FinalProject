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
import Footer from './../components/Footer'
 


const product=()=>{
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const getproduct=(product,index)=>{
        return(


            <Card style={{flexBasis:'18%',marginTop:10,marginRight:5}} >
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
              <Button size="small">To details</Button>
            </CardActions>
          </Card>
        )
    }
    
    return(
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
           <div style={{width:600,height:300,marginBottom:20,marginTop:20}}>
              <Slider {...settings}>
                  <div >
                     <img style={{width:600,height:300}} src='./images/img-1.jpg'/>
                  </div>
                  <div>
                      <h3>2</h3>
                  </div>
                    </Slider>
            </div>
        <div style={{width:'100%',height:'100%',borderWidth:'3px',borderStyle:'solid',backgroundColor:'gray',marginTop:20,marginBottom:20}}>
            <div style={{flexWrap:'wrap',display:'flex',padding:20,justifyContent:'space-evenly'}}>
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