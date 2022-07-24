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
import { orderSlice, OrderStatus, propagateOrder } from '../../features/order/orderSlice';
import { paymentSuccess } from '../../features/alert/alertSlice';
import { handleForm } from '../../features/forms/utils/utils';
import orderReducer from '../../features/order/orderSlice'

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
    const {
      payment_cardnumber,
      payment_expiration,
      payment_name,
      payment_securitycode,
    } = handleForm(e.currentTarget.elements);

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

    console.log("Security code: ", payment_securitycode.match(/^[0-9]{3}$/gi))
    console.log("Credit Card Number: ", payment_cardnumber.match(/^(\s?\d\s?){16}$/gi))
    console.log("First and Lastname: ", payment_name.match(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/gi))
    console.log("Expiration date: ", payment_expiration.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/gi))

    // Credit Card 16 numbers
    if (payment_cardnumber.match(/^(\s?\d\s?){16}$/gi) == null) {
      setError('Incorrect card number!');
      return;
    }
    // First and lastname by negating
    if (
      payment_name.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/gi
      ) == null
    ) {
      setError('Incorrect name for the card holder!');
      return;
    }
    // Credit Card expiration date MM/YY
    if (payment_expiration.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/gi) == null) {
      setError('Incorrect expiration date!');
      return;
    }
    // Three digit security code
    if (payment_securitycode.match(/^[0-9]{3}$/gi) == null) {
      setError('Incorrect security code!');
      return;
    }

    setError('Processing card information...');

    if (!e.currentTarget.reportValidity()) return;

    if (shippingInfo) {
      const orderResponse = await axios.post(
        ORDER_URL,
        {
          total_price: total,
          status: OrderStatus.UNPAID,
          address: shippingInfo.address,
          country: shippingInfo.country,
          city: shippingInfo.city,
          postalcode: shippingInfo.postalcode,
        },
        { headers: authHeader() }
      );

      if (payment.accepted) setError('Processing payment...');

      if (orderResponse.status == 201) {
        // Call to propagate the state with order for next page.
        dispatch(propagateOrder(orderResponse.data));
        //console.log(orderSlice.actions.propagateOrder(orderResponse.data));
        setPayment({ ...payment, status: 'succeeded' });

        // Side efffects
        dispatch(paymentSuccess()); // Payment success notification
        dispatch(clearCart()); // Clears the User Cart
        dispatch(clearCartDB()); // Clears the User Cart

        // Push the user to a new page to show the invoice after 0.5 seconds
        setTimeout(() => push('/purchase-confirmed'), 500);
      }
    }
  };
  return (
    <div className='order-payment'>
      <h3 id='stripe-notice'>
        Use <i id='stripe-testnums'>4242 4242 4242 4242</i> for card payment to
        test the payment
      </h3>
      <div className='order-payment__wrapper'>
        {!payment.payment_method_submit ? (
          <form
            onSubmit={handleMethod}
            className='order-payment__wrapper__form'
          >
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
                  placeholder='Arthur Thomas'
                />
                <label htmlFor=''>Name</label>
              </div>
              <div className='card-payment-form__inputbox'>
                <input
                  type='text'
                  name='payment_cardnumber'
                  placeholder='4242 4242 4242 4242'
                />
                <label htmlFor=''>Card Number</label>
              </div>
              <div className='card-payment-form__lastinputs'>
                <div className='card-payment-form__inputbox'>
                  <input
                    type='text'
                    name='payment_expiration'
                    placeholder='02/24'
                  />
                  <label htmlFor=''>Expiration</label>
                </div>
                <div className='card-payment-form__inputbox'>
                  <input
                    type='password'
                    name='payment_securitycode'
                    placeholder='389'
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
