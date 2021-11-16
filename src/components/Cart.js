import { Container } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductCartItem from './ProductCartItem';
import Button from "@mui/material/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Cart(props) {
  const cartProducts = props.cartProducts;
  const total = props.total;
  const deleteProductCart = (index) => props.deleteProductCart(index)
  const decrementQuantity = (index) => props.decrementQuantity(index)
  const incrementQuantity = (index) => props.incrementQuantity(index)

  return (
    <Typography paragraph>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" component="div">
              Cart Items
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {cartProducts.map((product, index) => (
                <ProductCartItem key={index} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} deleteProductCart={deleteProductCart} product={product} />
            ))}
            {
              cartProducts.length < 1 ? <Typography variant="h6" component="div">
              You have no Products in your shopping cart
              <Link to='/productList' > product list </Link>
            </Typography> : '' 
            }
          </Grid>
          <Grid item xs={12} md={6} style={{paddingLeft: 50}} align='center'>
            <Typography variant="h3" component="div">
                TOTAL
            </Typography>

            <Typography variant="h1" color='green' component="div">
                ${total}
            </Typography>

            <Typography variant="h1" color='green' component="div">
              <Button variant="contained" href="/checkout" style={{width: '100%', fontSize: 16}} endIcon={<ShoppingCartIcon />}>
                CHECKOUT
              </Button>
            </Typography>
          
          </Grid>
        </Grid>
    </Typography>
  );
}

export default Cart;
