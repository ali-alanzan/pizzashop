import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Cookies from 'universal-cookie';

export default function AddressForm(props) {
  const register = (name, options) => props.register(name, options)
  const addAddressInformation = (info) => props.addAddressInformation(info)
  const cookie = new Cookies();

  const inputs = {firstName:'false', lastName:'false', address1:'false', address2:'', city:'false', state: '', zipCode: 'false', country: 'false', saveAddress: ''};
  const AddressInformation = typeof(cookie.get('AddressInformation')) != 'object' ? inputs : cookie.get('AddressInformation');
  
  const [state, setState] = React.useState(AddressInformation)
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
    //   addAddressInformation({...state, saveAddress: state.saveAddress });
    // }
    addAddressInformation({...state, saveAddress: state.saveAddress });
  }, [state])
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.firstName === ""}
            helperText={state.firstName === "" ? 'Empty field!' : ' '}
            {...register("firstName", {required: true, maxLength: 80})}
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.lastName === ""}
            helperText={state.lastName === "" ? 'Empty field!' : ' '}
            {...register("lastName", {required: true, maxLength: 80})}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.address1 === ""}
            helperText={state.address1 === "" ? 'Empty field!' : ' '}
            {...register("address1", {required: true, maxLength: 80})}
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onKeyUp={(e) => checkInput(e)}
            {...register("address2", {required: false, maxLength: 80})}
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.city === ""}
            helperText={state.city === "" ? 'Empty field!' : ' '}
            {...register("city", {required: true, maxLength: 80})}
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onKeyUp={(e) => checkInput(e)}
            {...register("state", {required: false, maxLength: 80})}
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.zipCode === ""}
            helperText={state.zipCode === "" ? 'Empty field!' : ' '}
            {...register("zipCode", {required: true, maxLength: 80})}
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onKeyUp={(e) => checkInput(e)}
            error={state.country === ""}
            helperText={state.country === "" ? 'Empty field!' : ' '}
            {...register("country", {required: true, maxLength: 80})}
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" 
            {...register("saveAddress", {required: false, maxLength: 80})}
            value="yes" />}
            label="Use this address for payment details"
            onChange={(e) => checkInput(e)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}