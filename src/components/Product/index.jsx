import React from 'react'
import "./Product.css"
import { useStateValue } from "../../StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{basket,user},dispatch] = useStateValue();
  
  const addtocart = () =>{

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className='product'>
      <div className="info">
        <p>{title}</p>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>
      
      <img src={image}/>
      <p className="price">
          <small>₹</small>
          <strong>{price}</strong>
      </p>
      <button onClick={addtocart} >Add to Cart</button>

    </div>
  )
}

export default Product