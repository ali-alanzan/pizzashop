import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';

import Home from "./Home";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Cart from './Cart';
import Checkout from './checkout/Checkout';
import Messages from './Messages';

const drawerWidth = 240;

function Main(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const products = props.products;
  const cartProducts = props.cartProducts;
  const setCartProducts = (obj) => props.setCartProducts(obj);
  const addProductCart = (product) => props.addProductCart(product);
  const deleteProductCart = (title) => props.deleteProductCart(title);
  const decrementQuantity = (index) => props.decrementQuantity(index);
  const incrementQuantity = (index) => props.incrementQuantity(index);
  
  const cover = props.cover;
  const alert = props.alert;
  const [total, setTotal] = React.useState(0)
  const addTotal = (total) => {
    setTotal((prevTotal) => {
      return prevTotal + total
    })
  } 
  
  let totalQuantity = 0;
  if(cartProducts.length > 0) {
    cartProducts.map((c) => {
      totalQuantity += c.quantity
    })  
  }

  React.useEffect(() => {
    if(cartProducts.length > 0) {
      setTotal(0)
      cartProducts.map((product) => {
        totalQuantity += product.quantity
        addTotal( Number(product.price.replaceAll('$','') * Number(product.quantity)) )
      })  
    }
   
  }, [cartProducts])


  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { title: "Home", path: "/", icon: <InboxIcon /> },
          { title: "Product", path: "/product/1", icon: <AddIcon /> },
          { title: "List Products", path: "/products", icon: <StoreIcon /> },
          { title: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
          { title: "Checkout", path: "/checkout", icon: <ShoppingCartIcon /> }
        ].map((item, index) => (

          <ListItem key={index}>
          <Button href={item.path} startIcon={item.icon}>
            <ListItemText primary={item.title} />
          </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Pizzeria Bella online food
          </Typography>


        </Toolbar>

        {
          cartProducts.length > 0 ? <IconButton
          color="inherit"
          aria-label="shopping cart"
          sx={{ mr: 2 }}
          style={{ position: 'absolute', width: 'auto', right: 30, top: 13}}
          href="/cart"
        >
        
          <span style={{ position: 'absolute', right: '-10px', top: '-10px', fontSize: '.8em'}}>{totalQuantity}</span>
          <ShoppingCartIcon />
        </IconButton> : ''
        }
        
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Messages  alert={alert} />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" 
              element={<ProductList products={products} cover={cover} />}
              // element={<Home />} 
            />
            <Route
              path="/productList"
              element={<ProductList products={products} cover={cover} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetails products={products} cover={cover} addProductCart={addProductCart} />}
            />
            <Route
              path="/cart"
              element={<Cart total={total} deleteProductCart={deleteProductCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} cartProducts={cartProducts} />}
            />
            <Route
              path="/checkout"
              element={<Checkout total={total} cartProducts={cartProducts} setCartProducts={setCartProducts} />}
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

Main.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default Main;
