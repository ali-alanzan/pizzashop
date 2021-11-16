import * as React from 'react';
import Grid from '@mui/material/Grid';


import Cover from "./Cover";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router';
import ImageListItem from '@mui/material/ImageListItem';

export default function ProductDetails(props) {
  const products = props.products;
  const addProductCart = (product) => props.addProductCart(product);

  let { id } = useParams();
  const product = products.find(p => p.id == id)
  const cover = props.cover;
  cover.title = product.title;
  cover.description = product.description;
  cover.image = product.image;
  cover.linkText = '';

const sizes = [
  { value: 'sm', label: 'small', increasedPrice: 0},
  { value: 'md', label: 'medium', increasedPrice: 10},
  { value: 'lg', label: 'family', increasedPrice: 15},
]
const [size, setSize] = React.useState("sm")
const [price, setPrice] = React.useState(product.price)
const handleSizeChange = (e) => {
  setSize(e.target.value)
  for (let option of sizes) {
    if( option.value == e.target.value && typeof(option.increasedPrice) != 'undefined' ) {
      setPrice( '$'+ (Number(product.price.replace(/[^0-9]/,'')) + option.increasedPrice))
      break;
    }
  }
}
cover.description = 'ORDER NOW for ' + price;






function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

  return (
    <>
    <Cover cover={cover} />
    <Grid container spacing={4}>
        <Grid item xs={6} md={4}>

        <ImageListItem cols={1} rows={1}>
            <img
              {...srcset(product.image, 250, 200, 1, 1)}
              alt={product.title}
              loading="lazy"
            />
           
          </ImageListItem>
        </Grid>

        <Grid item xs={6} md={8}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {product.description}
          </Typography>

          <Typography variant="h3" color="green" style={{margin: 20}} paragraph>
            {price}
          </Typography>



          <Container>
            <TextField
            id="outlined-select-size"
            select
            label="Select"
            value={size}
            onChange={handleSizeChange}
            helperText="Please select size"
            md={6}
          >
            {sizes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button style={{margin: 20}} variant="contained" color="success" onClick={() => addProductCart({...product, size: size, price: price}) }>
            ADD TO CART
          </Button>

          </Container>


        </Grid>

    </Grid>
  </>
  );
}