import * as React from 'react';
import './classics.css';
import Alert from '../../features/alert/alert/alert.component';
import { useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { userLogged, registered, selectMessage } from '../../features/alert/alertSlice';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { assignRole } from '../../features/user/thunks';
import { clearErrors, clearShippingInfo } from '../../features/user/userSlice';
import { Loading } from '../loading/loading.component';
import { fetchCartItems } from '../../features/cart/api';

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
      <button className='cl-btn' onClick={() => console.log(dispatch(clearShippingInfo()))}>
        clear Shipping info
      </button>
      <button className='cl-btn' onClick={() => console.log(dispatch(clearErrors()))}>
        clearErrors
      </button>
      <button className='cl-btn' onClick={() => console.log(fetchCartItems())}>
        fetch a product
      </button>
      <div className='something'></div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<RootState, IClassics>({
  message: selectMessage,
});

export default connect(mapStateToProps)(Classics);
