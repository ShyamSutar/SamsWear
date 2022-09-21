import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)
  const [user, setuser] = useState({value:null})
  const [key, setkey] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("cart")){
      try {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      } catch (error) {
        console.error(error);
        localStorage.clear()
      }
    }
    let token = localStorage.getItem('token')
    if(token){
      setuser({value:token})
      setkey(Math.random())
    }
  }, [router.query])

  const buyNow = (itemCode, qty, price, name, size, variant)=>{
    saveCart({})
    let newCart = {itemCode:{qty: 1, price, name, size, variant}};
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout')
  }
  

  const saveCart = (myCart) =>{
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      
    }
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }else{
      newCart[itemCode] = {qty: 1, price, name, size, variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = () =>{
    setCart({});
    saveCart({});
    console.log("cart has been cleared");
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode].qty <= 0){
      delete newCart[itemCode];
    }

    setCart(newCart)
    saveCart(newCart);
  }

  const logout = () => {
    localStorage.removeItem("token")
    setuser({value:null})
    setkey(Math.random)
  }

  return (
    <>
      <Navbar user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart = {clearCart} subTotal={subTotal} logout={logout} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart = {clearCart} subTotal={subTotal} buyNow={buyNow} {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
