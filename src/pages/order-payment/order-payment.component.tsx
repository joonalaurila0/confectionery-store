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

// Stripe API
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';

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

  const CARD_OPTIONS = {
    disabled: false,
    iconStyle: 'solid' as const,
    style: {
      base: {
        iconColor: '#6772e5',
        color: '#6772e5',
        fontWeight: 600,
        fontFamily: 'Montserrat, Open Sans, Segoe UI, sans-serif',
        fontSize: '10px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#6772e5',
        },
        '::placeholder': {
          color: '#6772e5',
        },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  const { push } = useHistory();
  const total = useSelector(selectCartTotal);
  const shippingInfo = useSelector(selectShippingInfo);

  const stripe = useStripe();
  const elements = useElements();

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

  const stripeElementChange = (e: StripeCardElementChangeEvent) => {
    if (payment.submitted && e.empty) {
      setError('Do not submit an empty form!');
    }
    if (e.error) {
      setPayment({ ...payment, status: 'error' });
      setError(e.error.message ?? 'An unknown error occured');
    }
    if (!e.empty && e.complete) {
      setPayment({ ...payment, accepted: true });
    }
  };

  // This method works with both payment methods
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

    // Stripe API specific
    // Demands presence of the API
    if (!stripe || !elements) return;

    if (!e.currentTarget.reportValidity()) return;

    if (!payment.accepted) {
      setError('Finish payment information!');
      return;
    }

    // Stripe API specific
    // Demands presence of the API
    const cardElement = elements && elements.getElement(CardElement);

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

    // Stripe API specific
    if (!cardElement) return;

    /* Confirm the payment on the client */
    // Stripe API specific
    const { error, paymentIntent } = await stripe?.confirmCardPayment(
      res.data.client_secret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setPayment({ ...payment, status: 'error' });
      setError(error.message ?? 'An unknown error occured');
    } else if (paymentIntent) {
      setPayment({ ...payment, paymentIntent: paymentIntent });
    }

    // Stripe API specific
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Side efffects
      dispatch(paymentSuccess()); // Payment success notification
      dispatch(clearCart()); // Clears the User Cart
      dispatch(clearCartDB()); // Clears the User Cart

      // Push the user to a new page to show the invoice after 0.5 seconds
      setTimeout(() => push('/purchase-confirmed'), 500);
    }
  };

  return (
    <div className='order-payment'>
      <h3 id='stripe-notice'>
        Use <i id='stripe-testnums'>4242 4242 4242 4242</i> for stripe to test
        the payment
      </h3>
      <div className='order-payment__wrapper'>
        {!payment.payment_method_submit ? (
          <form onSubmit={handleMethod}>
            <legend>Select payment method</legend>
            <fieldset>
              <input type='radio' id='stripe' name='method' value='stripe' />
              <label htmlFor='stripe'>Stripe</label>
            </fieldset>
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
          payment.payment_method === 'stripe' ? (
          <div className='payment-stripe'>
            <form onSubmit={handlePayment}>
              <fieldset className='elements-style'>
                <legend>Card details:</legend>
                <div className='FormRow elements-style'>
                  <CardElement
                    options={CARD_OPTIONS}
                    onChange={stripeElementChange}
                  />
                </div>
                <button
                  className='elements-style'
                  disabled={payment.submitted ? true : false}
                  onClick={() =>
                    setPayment({
                      ...payment,
                      submitted: true,
                      submitCount: payment.submitCount + 1,
                    })
                  }
                >
                  Pay ${total}
                </button>
              </fieldset>
            </form>
          </div>
        ) : payment.payment_method === 'card-payment' ? (
          <div className='card-payment-form'>
            <h1>Card Payment</h1>
            <form>
              <div className='card-payment-form__inputbox'>
                <input
                  type='text'
                  name='username_signin'
                  placeholder='Enter username'
                />
                <label htmlFor=''>Name</label>
              </div>
              <div className='card-payment-form__inputbox'>
                <input
                  type='password'
                  name='password_signin'
                  placeholder='Enter password'
                />
                <label htmlFor=''>Card Number</label>
              </div>
              <div className='card-payment-form__lastinputs'>
                <div className='card-payment-form__inputbox'>
                  <input
                    type='password'
                    name='password_signin'
                    placeholder='Enter password'
                  />
                  <label htmlFor=''>Expiration</label>
                </div>
                <div className='card-payment-form__inputbox'>
                  <input
                    type='password'
                    name='password_signin'
                    placeholder='Enter password'
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
