import { useState } from 'react';
import './mini-ecommerce.css';
import Menu from './components/menu/menu';
import Products from './components/products/products';
import Checkout from './components/checkout/checkout';

function MiniEcommerce() {

  const [cart, setCart] = useState({ products : [] });
  const [showProducts, setShowProducts] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [total, setTotal] = useState('0,00');

  function addProduct(product) {
    const objCart = Object.assign({}, cart);
    //update quantity
    let newProduct = true;
    objCart.products.forEach((prod, index) => {
      if (prod.name === product.name) {
        objCart.products[index].quantity++;
        newProduct = false;
      }
    });
    //add new product
    if (newProduct) {
      objCart.products.push({
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: 1
      });
    }

    setCart(objCart);
  }

  function handleShowProducts() {
    setShowCheckout(false);
    setShowProducts(true);
  }

  function handleShowCheckout(total) {
    setShowCheckout(true);
    setShowProducts(false);
    setTotal(total);
  }

  function handleClearCart() {
    setCart({ products: [] });
  }

  return (
    <div>
      <Menu 
        products={cart.products}
        handleShowProducts={handleShowProducts}
        handleShowCheckout={handleShowCheckout} />
      <Products 
        visible={showProducts}
        addProduct={addProduct} />
      <Checkout
        visible={showCheckout}
        handleShowProducts={handleShowProducts}
        total={total}
        products={cart}
        handleClearCart={handleClearCart} />
    </div>
  );
}

export default MiniEcommerce;
