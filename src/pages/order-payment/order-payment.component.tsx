import * as React from 'react';
import './order-payment.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotal } from '../../features/cart/selectors';
import { authHeader } from '../../features/user/api';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { selectShippingInfo } from '../../features/user/selectors';
import { clearCart } from '../../features/cart/cartSlice';
import { ORDER_URL } from '../../features/order/api';
import { clearCartDB } from '../../features/cart/thunks';
import { OrderStatus } from '../../features/order/orderSlice';
import { create as createOrder } from '../../features/order/thunks';
import { paymentSuccess } from '../../features/alert/alertSlice';

const OrderPayment = (): JSX.Element => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState({
    success: false,
    submitted: false,
    payment_method_submit: false,
    payment_method: '',
    value: '',
    status: '',
    paymentIntent: {},
    submitCount: 0,
    accepted: false,
  });
  const [error, setError] = useState('');

  const { push } = useHistory();
  const total = useSelector(selectCartTotal);
  const shippingInfo = useSelector(selectShippingInfo);

  const handleMethod = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      (event.currentTarget.elements.namedItem('method') as HTMLInputElement)
        .value === 'stripe'
    ) {
      setPayment({
        ...payment,
        payment_method: 'stripe',
        payment_method_submit: true,
      });
    } else if (
      (event.currentTarget.elements.namedItem('method') as HTMLInputElement)
        .value === 'card-payment'
    ) {
      setPayment({
        ...payment,
        payment_method: 'card-payment',
        payment_method_submit: true,
      });
    }
  };

  // This method is Stripe API specific
  const handlePayment: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();

    if (payment.submitCount >= 4) {
      setError('Too many submits, please wait for response');
      setTimeout(
        () => setPayment({ ...payment, submitCount: 0, submitted: false }),
        2000
      );
    }

    if (payment.submitCount >= 10) {
      setError('Do not spam the prompt!');
    }

    setPayment({
      ...payment,
      submitted: true,
      submitCount: payment.submitCount + 1,
    });

    if (!e.currentTarget.reportValidity()) return;

    if (!payment.accepted) {
      setError('Finish payment information!');
      return;
    }

    if (shippingInfo && payment.accepted === true)
      // Create's the actual order by calling POST /orders
      dispatch(
        createOrder({
          total_price: total,
          status: OrderStatus.UNPAID,
          address: shippingInfo.address,
          country: shippingInfo.country,
          city: shippingInfo.city,
          postalcode: shippingInfo.postalcode,
        })
      );

    // Stripe API specific
    /* Create payment intent on the server */
    const res = await axios.post(
      ORDER_URL + 'create-payment-intent',
      { amount: total, currency: 'usd', payment_method_types: 'card' },
      {
        headers: authHeader(),
      }
    );

    if (payment.accepted) {
      setError('Processing payment...');
    }

    if (res.status === 500) {
      setError(res.data.message);
      setPayment({ ...payment, status: 'error' });
      return;
    }

    // Check the response of the POST /orders request and decide whether to accept the payment based on that

    //if (res.status === 500) {
    //  setError(res.data.message);
    //  setPayment({ ...payment, status: 'error' });
    //  return;
    //}

    // If request was succesful, then update status
    //if (res.status === 201 && paymentIntent.status === 'succeeded') {
    //  setPayment({ ...payment, status: 'succeeded' });
    //  // Side efffects
    //  dispatch(paymentSuccess()); // Payment success notification
    //  dispatch(clearCart()); // Clears the User Cart
    //  dispatch(clearCartDB()); // Clears the User Cart

    //  // Push the user to a new page to show the invoice after 0.5 seconds
    //  setTimeout(() => push('/purchase-confirmed'), 500);
    //}
  };
  return (
    <div className='order-payment'>
      <h3 id='stripe-notice'>
        Use <i id='stripe-testnums'>4242 4242 4242 4242</i> for card payment to
        test the payment
      </h3>
      <div className='order-payment__wrapper'>
        {!payment.payment_method_submit ? (
          <form onSubmit={handleMethod}>
            <legend>Select payment method</legend>
            <fieldset>
              <input
                type='radio'
                id='card-payment'
                name='method'
                value='card-payment'
              />
              <label htmlFor='card-payment'>Card Payment</label>
            </fieldset>
            <input type='submit' value='Submit' />
          </form>
        ) : payment.payment_method_submit &&
          payment.payment_method === 'card-payment' ? (
          <div className='card-payment-form'>
            <h1>Card Payment</h1>
            <form onSubmit={handlePayment}>
              <div className='card-payment-form__inputbox'>
                <input
                  type='text'
                  name='payment_name'
                  placeholder='Enter name of the card holder'
                />
                <label htmlFor=''>Name</label>
              </div>
              <div className='card-payment-form__inputbox'>
                <input
                  type='text'
                  name='payment_cardnumber'
                  placeholder='Enter Card Numbers'
                />
                <label htmlFor=''>Card Number</label>
              </div>
              <div className='card-payment-form__lastinputs'>
                <div className='card-payment-form__inputbox'>
                  <input
                    type='text'
                    name='payment_expiration'
                    placeholder='Enter expiration date of the card'
                  />
                  <label htmlFor=''>Expiration</label>
                </div>
                <div className='card-payment-form__inputbox'>
                  <input
                    type='password'
                    name='payment_securitycode'
                    placeholder='Enter security code of the card'
                  />
                  <label htmlFor=''>Security Code</label>
                </div>
              </div>
              <div className='card-payment-form__btn'>
                <input
                  type='submit'
                  name='submit_signin'
                  value='Submit Payment'
                />
              </div>
            </form>
          </div>
        ) : null}
        <div className='order-payment__error-prompt'>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
