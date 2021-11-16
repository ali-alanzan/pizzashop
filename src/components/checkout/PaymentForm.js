import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cookies from 'universal-cookie';

export default function PaymentForm(props) {

  const register = (name, options) => props.register(name, options)
  const addPaymentInformation = (info) => props.addPaymentInformation(info)

  const inputs = {cardName:'false', cardNumber:'false', expDate:'false', cvv:'false', saveCard: ''}
  

  const cookie = new Cookies();
  const PaymentInformation = cookie.get('PaymentInformation') != 'object' ? inputs : cookie.get('PaymentInformation');

  const [state, setState] = React.useState(PaymentInformation)
  const checkInput = (event) => {
    setState((prevState) => {
      const obj = { ...prevState }
      obj[event.target.getAttribute('name')] = event.target.value;
      return obj;
    })
  }

  React.useEffect(() => {
    // let findInValid = null;
    // for(let key in state) {
    //   findInValid = inputs[key] != '' && (state[key] == '' || state[key] == 'false' );
    //   if(findInValid) {
    //     break;
    //   }
    // }
    // if( findInValid !== true ) {
      
    // }
    addPaymentInformation({...state });
  }, [state])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.cardName === ""}
            helperText={state.cardName === "" ? 'Empty field!' : ' '}
            {...register("cardName", {required: true, maxLength: 80})}
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.cardNumber === ""}
            helperText={state.cardNumber === "" ? 'Empty field!' : ' '}
            {...register("cardNumber", {required: true, maxLength: 80})}
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.expDate === ""}
            helperText={state.expDate === "" ? 'Empty field!' : ' '}
            {...register("expDate", {required: true, maxLength: 80})}
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.cvv === ""}
            helperText={state.cvv === "" ? 'Empty field!' : ' '}
            {...register("cvv", {required: true, maxLength: 80})}
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" 
            name="saveCard"
            onKeyUp={(e) => checkInput(e)}
            {...register("saveCard", {required: false, maxLength: 80})}
            value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}