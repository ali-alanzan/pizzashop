import { Container } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Typography paragraph>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h6" component="div">
              Our shop
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={8}>
            <Typography variant="h6" component="div">
              <Link to="productList"> Product List </Link>| {""}
              <Link to="addProduct"> Add Product </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

export default Home;
