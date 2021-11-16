import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Messages(props) {
  let alert = props.alert;
  return (
    <Container style={{margin: '10px 0 20px 0' }} >
    {
    alert == 'remove' ? <Alert onClose={() => {}}>Product Removed from cart!</Alert> : ''
    }
    {
        alert == 'add' ? <Alert
        action={
            <Button color="inherit" size="small" href="/cart">
                View Cart
            </Button>
        }
        >
        Product Added to Cart!
        </Alert> : ''
    }

    </Container>
  );
}

export default Messages;
