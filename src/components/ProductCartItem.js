import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function ProductCartItem(props) {
  const { product } = props;
  const deleteProductCart = (index) => props.deleteProductCart(index)
  const incrementQuantity = (index) => props.incrementQuantity(index)
  const decrementQuantity = (index) => props.decrementQuantity(index)
  

  return (
    <Grid item xs={12} md={10} style={{marginTop: 30}}>
      <CardActionArea  style={{position: 'relative'}}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="contained" color="info" style={{ marginRight: 5 }}>
            Size: 
            </Typography>
            <Button variant="outlined" color="success" justify="end" style={{ marginRight: 10 }}>
              {product.size}
            </Button>
            <Typography variant="contained" color="info" style={{ marginRight: 5 }}>
            Price: 
            </Typography>
            <Button variant="outlined" color="warning" justify="end" style={{ marginRight: 10 }}>
              {product.price}
            </Button>
            <Typography variant="contained" color="info" style={{ marginRight: 15 }}>
                <DeleteIcon onClick={() => deleteProductCart(product.index)} style={{color: 'red', position: 'absolute', right: '-32px', top: '2%'}} />
                <AddIcon onClick={() => incrementQuantity(product.index)} style={{color: 'green', position: 'absolute', right: '-30px', top: '35%'}} />
              
                <Typography align='center' style={{color: 'black', position: 'absolute', width: '23px', right: '-30px', top: '55%'}}>
                    {product.quantity}
                </Typography>
              
                <RemoveIcon onClick={() => decrementQuantity(product.index)} style={{color: 'green', position: 'absolute', right: '-30px', top: '72%'}} />
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={product.image}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

ProductCartItem.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCartItem;