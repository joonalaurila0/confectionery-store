import * as React from 'react';
import './cart-item.css';
import { CartItem, removeItemDB } from '../../../features/cart/cartSlice';
import { connect, useDispatch } from 'react-redux';
import { removeItem } from '../../cart/cartSlice';

/* two underscores because CartItem is reserved for the type */
const __CartItem = (cartItem: CartItem) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const dispatch = useDispatch();

  function removeHandler() {
    dispatch(removeItem(cartItem));
    if (user && user.accessToken) {
      if (cartItem.id != undefined) {
        dispatch(removeItemDB(cartItem.id));
      }
    }
  }

  return (
    <div className='cart-item'>
      <div className='cart__right-div'>
        <div className='cart-image' style={{ backgroundImage: `url(${cartItem.image})` }}></div>
      </div>
      <div className='cart__left-div'>
        <span className='cart-title'>{cartItem.title}</span>
        <span className='cart-price'>Price: ${cartItem.price * cartItem.quantity}</span>
        <span className='cart-qty'>Quantity: {cartItem.quantity}</span>
      </div>
      <button
        className='remove-btn'
        title='Removes the product from cart'
        onClick={() => removeHandler()}
      >
        X
      </button>
    </div>
  );
};

export default connect()(__CartItem);
