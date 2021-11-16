import * as React from 'react';
import Grid from '@mui/material/Grid';


import ProductListItem from './ProductListItem';
import Cover from "./Cover";


export default function ProductList(props) {
  const products = props.products;
  const cover = props.cover;

  return (
    <>
    <Cover cover={cover} />
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductListItem key={product.title} product={product} />
      ))}
    </Grid>
  </>
  );
}