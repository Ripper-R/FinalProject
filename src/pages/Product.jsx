import React from 'react';
import {products} from './Productdummy'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


  const product=()=>{
    
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
        <div style={{width:"100%",height:"100%",borderWidth:'3px',borderStyle:'solid',backgroundColor:'gray'}}>
            <div style={{flexWrap:'wrap',display:'flex',padding:20,justifyContent:'space-evenly'}}>
              {
                  products.map((product, index) => {
                    return getproduct(product, index)
                })
              }
            </div>
        </div>
    )
}


export default product