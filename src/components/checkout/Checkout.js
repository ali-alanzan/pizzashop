import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import Cookies from 'universal-cookie';

import { useForm } from 'react-hook-form';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      Pizzeria Bella - mui.com template
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];



const theme = createTheme();

export default function Checkout(props) {
  const cartProducts = props.cartProducts;
  const setCartProducts = (obj) => props.setCartProducts(obj);
  const total = props.total;
  const [order, setOrder] = React.useState({})

  const cookie = new Cookies();

  const addPaymentInformation = (paymentInformation) => {
   

    setOrder((prevOrder) => {
      return {...prevOrder, paymentInformation: {
        cardName: paymentInformation.cardName,
        cardNumber: paymentInformation.cardNumber,
        cvv: paymentInformation.cvv,
        expDate: paymentInformation.expDate
      }}
    })
    cookie.set('PaymentInformation', paymentInformation, {path: '/'})
  }
const addAddressInformation = (addressInformation) => {


  setOrder((prevOrder) => {
    return {...prevOrder, shoppingAddress: {
      firstName: addressInformation.firstName,
      lastName: addressInformation.lastName,
      address1: addressInformation.address1,
      address2: addressInformation.address2,
      city: addressInformation.city,
      country: addressInformation.country,
      state: addressInformation.state,
      zipCode: addressInformation.zipCode,
    }}
  })


  cookie.set('AddressInformation', addressInformation, {path: '/'})

}




function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm addAddressInformation={addAddressInformation} register={register} />;
    case 1:
      return <PaymentForm addPaymentInformation={addPaymentInformation} register={register} />;
    case 2:
      return <Review total={total} order={order} cartProducts={cartProducts} />;
    default:
      throw new Error('Unknown step');
  }
}
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    handleNext()
  };
  
  React.useEffect(() => {
    if(activeStep === steps.length) {
      const cookies = new Cookies();
      cookies.remove('cartProducts');
      cookies.remove('PaymentInformation');
      cookies.remove('AddressInformation');
      setCartProducts({})
    } 
  }, [activeStep])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          Pizzeria Bella
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)} id='checkoutForm' method='post'
    >
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} type='button'>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    // onClick={handleNext}
                    type='submit'
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}