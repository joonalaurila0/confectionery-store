import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { productReducer } from './product/product.reducer';
import { cartReducer } from './cart/cart.reducer';
import { alertReducer } from './alert/alert.reducer';
import { orderReducer } from './order/order.reducer';
import { categoryReducer } from './category/category.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  order: orderReducer,
  product: productReducer,
  cart: cartReducer,
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>
