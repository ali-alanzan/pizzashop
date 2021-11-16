import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


function ProductListItem(props) {
  const { product } = props;
  const productLink = '/product/'+product.id;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={productLink}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {product.description}
            </Typography>
            <Button variant="contained" color="success" justify="end" href={productLink}>
              ORDER NOW
            </Button>
            <Typography variant="contained" color="primary" style={{ marginLeft: 20, fontSize: '1.5em'}}>
            {product.price}
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

ProductListItem.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductListItem;