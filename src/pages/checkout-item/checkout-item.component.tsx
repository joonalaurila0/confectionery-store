import * as React from 'react';
import './checkout-item.css';
import { ICartItem } from '../../features/cart/cartSlice';

export const CheckoutItem = (cartItem: ICartItem): JSX.Element => {
  return (
    <div className='checkout-item'>
      <div className='checkout-item__right'>
        <img
          className='checkout-item__right__image'
          src={require(`../../assets/${cartItem.image}`)}
        />
      </div>
      <div className='checkout-item__left'>
        <span className='checkout-item__left__title'>{cartItem.title}</span>
        <span className='checkout-item__left__price'>
          Price: ${cartItem.price * cartItem.quantity}
        </span>
        <span className='checkout-item__left__qty'>
          Quantity: {cartItem.quantity}
        </span>
      </div>
    </div>
  );
};
