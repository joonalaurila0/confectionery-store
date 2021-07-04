import * as React from 'react';
import './classics.css';
import Alert from '../../features/alert/alert/alert.component';
import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { userLogged, registered, selectMessage } from '../../features/alert/alertSlice';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { fetchAll, fetch as fetchOrders } from '../../features/order/thunks';
import {
  fetchRole,
  fetchAllUsers,
  register,
  updatePassword,
  updateEmail,
  login,
} from '../../features/user/api';
import { assignRole } from '../../features/user/thunks';
import { clearErrors } from '../../features/user/userSlice';
import { removeProduct } from '../../features/product/api';
import { addOrderItems, removeOrder } from '../../features/order/api';
import { checkIfCart, createCart, fetchCart, fetchCartInfo } from '../../features/cart/api';
import { fetchCartState } from '../../features/cart/thunks';

interface IClassics {
  message: string;
}

const Classics = () => {
  const dispatch = useDispatch();
  return (
    <div className='classics'>
      <Alert />
      <button className='cl-btn' onClick={() => dispatch(userLogged())}>
        Log in alert
      </button>
      <button className='cl-btn' onClick={() => dispatch(registered())}>
        Register aler
      </button>
      <button className='cl-btn' onClick={() => console.log(dispatch(assignRole()))}>
        get role
      </button>
      <button className='cl-btn' onClick={() => console.log(fetchCartState())}>
        get cart state
      </button>
      <button className='cl-btn' onClick={() => console.log(dispatch(clearErrors()))}>
        clearErrors
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<RootState, IClassics>({
  message: selectMessage,
});

export default connect(mapStateToProps)(Classics);
