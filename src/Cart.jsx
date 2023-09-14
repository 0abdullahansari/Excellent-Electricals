import React from 'react'
import "./Cart.css"
import { useStateValue } from "./StateProvider";
import CartProduct from "./CartProduct"
import Subtotal from './Subtotal';

function Cart() {
  const [{basket,user},dispatch] = useStateValue();

  return (
    <div className='cartf'>
      <div className="cartleft">
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="carttitle">Your shopping Basket</h2>

          {basket.map(item => (
            <CartProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

        </div>
      </div>

      <div className="cartright">
        <Subtotal />
      </div>
    </div>
  );
}

export default Cart