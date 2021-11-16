import * as React from "react";

import amber from "@mui/material/colors/amber";
import teal from "@mui/material/colors/teal";

import { ThemeProvider } from "@mui/material/styles";

import createTheme from "@mui/material/styles/createTheme";

import Main from "./components/Main";
import Cookies from 'universal-cookie';


function App() {
  const products = [
    {
      id: 1,
      title: "PIZZA CHEESE",
      description: "different types of taste cheese",
      image: "/images/pizza-cheese.jpeg",
      price: "$20",
    },
    {
      id: 2,
      title: "PIZZA CHICKEN",
      description: "Fried chicken slices with collection of cheese types",
      image: "/images/pizza-chicken.jpg",
      price: "$30",
    },
    {
      id: 3,
      title: "Pasta sea",
      description: "Pasta with sea food",
      image: "/images/pasta-sea.jpg",
      price: "$35"
    },
    {
      id: 4,
      title: "Pasta CHICKEN",
      description: "Cocked pasta chicken slices in sous",
      image: "/images/pasta-chicken.jpeg",
      price: "$24"
    },

  ];
  const cover = {
    title: 'Get All in one. 2 Burgers, 1 Pizza, Pasta and potates  ',
    description:
      "We are the best in what we do. our chiefs highly trained, and our clients feedback always the greatist",
    image: '/images/pizza-cover4.jpeg',
    imageText: 'main image description',
    linkText: 'Order now for $100',
  };
  const [alert, setAlert] = React.useState("");
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if( alert == 'remove' ) {
      setTimeout(function () {
        setAlert("")
      }, 5000);
    }
  }, [alert, setAlert])

  const cookies = new Cookies();
  const cookieCart = typeof(cookies.get('cartProducts')) != 'undefined' ? cookies.get('cartProducts') : [];
  const [cartProducts, setCartProducts] = React.useState(cookieCart)

  const resetCookie = () => {
    const cookieCart = typeof(cookies.get('cartProducts')) != 'undefined' ? cookies.get('cartProducts') : [];
    setCartProducts(cookieCart);
    return cookieCart;
  }
  const addProductCart = (product) => {
    const cartProducts = resetCookie()
    const pr = { ... product, quantity: 1, index: cartProducts.length}
    const findSame = cartProducts.find((p) => p.size == product.size && p.id == product.id )
    let tempData = [];
    if(typeof(findSame) == 'object') {
      tempData = [...cartProducts];
      tempData[findSame.index].quantity = tempData[findSame.index].quantity + 1;
    } else {
      tempData = [...cartProducts, pr];
    }
    setCartProducts(tempData);
    setAlert("add")
    
  };


  const deleteProductCart = (index) => {
    const cartProducts = resetCookie();
    const tempData = [...cartProducts.filter((product) => product.index !== index)]
    setCartProducts(tempData);
    setAlert('remove')
  };


  const incrementQuantity = (index) => {
    const cartProducts = resetCookie()
    const tempData = [...cartProducts]
    tempData[index].quantity = cartProducts[index].quantity + 1;
    setCartProducts(tempData);
    setAlert('updatedQty')
  }
  const decrementQuantity = (index) => {
    const cartProducts = resetCookie()
    const tempData = [...cartProducts]
    tempData[index].quantity = cartProducts[index].quantity > 1 ? cartProducts[index].quantity - 1 : 1;
    setCartProducts(tempData);
    setAlert('updatedQty')
  }
  

  React.useEffect(() => {
    cookies.set('cartProducts', cartProducts , { path: '/' });
  }, [cartProducts])

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: amber
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Main alert={alert} products={products} cover={cover} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} addProductCart={addProductCart} deleteProductCart={deleteProductCart} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
    </ThemeProvider>
  );
}

export default App;
