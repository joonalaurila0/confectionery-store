import * as React from 'react';
import './purchase-confirmed.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecentOrder,
  selectRecentOrderItems,
} from '../../features/order/selectors';
import { getInvoice, updateOrder } from '../../features/order/api';
import { selectShippingInfo } from '../../features/user/selectors';
import { OrderStatus } from '../../features/order/orderSlice';
import { fetchItems as fetchOrderItems } from '../../features/order/thunks';
import { Loading } from '../loading/loading.component';

export const PurchaseConfirmed = (): JSX.Element => {
  const dispatch = useDispatch();
  const order = useSelector(selectRecentOrder); // Last order
  const orderItems = useSelector(selectRecentOrderItems); // Last order's Items
  const shippingInfo = useSelector(selectShippingInfo); // Order information

  order && order.id && orderItems === null
    ? dispatch(fetchOrderItems(order.id))
    : null;
  if (orderItems === null) {
    return <Loading />;
  }

  // Update the order status to PAID after payment process.
  order && order.id
    ? updateOrder(order.id, { status: OrderStatus.PAID })
    : null;

  return (
    <div className='purchase-confirmed'>
      <div className='purchase-confirmed__thanks'>
        <p>Thank you for your purchase!</p>
      </div>
      <div className='purchase-col-2'>
        <div className='purchase-col-2__right__invoice'>
          <p>
            <b>Invoice #{order && order.id}</b>
          </p>
          <button
            onClick={() =>
              order && order.id ? console.group(getInvoice(order.id)) : null
            }
          >
            View the invoice
          </button>
        </div>
        <div className='purchase-col-2__right'>
          <div className='purchase-col-2__right__details'>
            <h2>Order Summary</h2>
            <p>Products: ${order && order.total_price}</p>
            <p>Shipping: $5</p>
            <p>Tax: $0</p>
          </div>
          <div className='purchase-col-2__right__shipping'>
            <h2>Shipping Summary</h2>
            <p>{shippingInfo && shippingInfo.address}</p>
            <p>{shippingInfo && shippingInfo.country}</p>
            <p>{shippingInfo && shippingInfo.city}</p>
            <p>{shippingInfo && shippingInfo.postalcode}</p>
          </div>
        </div>
      </div>
      <div className='purchase-col-1'>
        <h1>Order Summary</h1>
        <div className='order-table'>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems &&
                orderItems.map(({ productId, image, quantity, price }) => (
                  <tr key={productId}>
                    <td>
                      <img src={require(`../../assets/${image}`)} />
                    </td>
                    <td>{productId}</td>
                    <td>{quantity}</td>
                    <td>${price * quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='purchase-col-right__order-info'>
          <p>Order total: {order && order.total_price}$</p>
        </div>
      </div>
    </div>
  );
};
