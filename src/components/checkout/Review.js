import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Cookies from 'universal-cookie';


export default function Review(props) {
  const products = props.cartProducts;

  const cookie = new Cookies();


  const address = cookie.get('AddressInformation');

  const payment = cookie.get('PaymentInformation');

  const total = props.total;
  const payments = [
    { name: 'Card name', detail: payment.cardName },
    { name: 'Card number', detail: payment.cardNumber },
    { name: 'Expires', detail: payment.expDate },
    { name: 'CVV', detail: payment.cvv }
  ]



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.description} style={{width: '50%'}}/>
            <ListItemText primary='Price:' secondary={product.price} align='left' />
            <ListItemText primary='Size:' secondary={product.size.toUpperCase()} align='center' />
            <ListItemText primary='Quantity:' secondary={product.quantity} align='right'/>
            <ListItemText primary='Total:' secondary={ '$'+ (Number(product.price.replaceAll('$','')) * product.quantity) } align='right'/>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.firstName + ' ' + address.lastName}</Typography>
          <Typography gutterBottom>{address.city + ', ' + address.state + ' '+ address.country }</Typography>
          <Typography gutterBottom>{  address.address1 }</Typography>
          <Typography gutterBottom>{  address.address2 }</Typography>
          <Typography gutterBottom>{  address.zipCode }</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((py, pIndex) => (
              <React.Fragment key={pIndex}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{py.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{py.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}