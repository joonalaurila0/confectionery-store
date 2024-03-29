import axios, { AxiosError } from 'axios';
import { ValidationErrors } from '../promotion/promotionSlice';
import clientApi from '../shared/api';
import { authHeader } from '../user/api';
import {
  ICart,
  ICartItem,
  AddItemSuccess,
  InsertationResult,
} from './cartSlice';

const CART_URL = clientApi + '/cart/';

async function apifetchCart(): Promise<ICart> {
  return axios
    .get(CART_URL, { headers: authHeader() })
    .then((res) => {
      if (res.data === '' && res.headers['content-length'] === '0') {
        createCart();
      }
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function createCart(): Promise<ICart> {
  return axios
    .post(CART_URL, {}, { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function fetchCartItems(): Promise<ICartItem[]> {
  return axios
    .get(CART_URL + 'items', { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

/* doesnt mutate client state, only affects db */
async function addItemsToCartDB(
  list_of_ids: Array<number>
): Promise<InsertationResult> {
  return axios
    .post(CART_URL + 'batch', list_of_ids, { headers: authHeader() })
    .then((res) => {
      console.log('DATA RETURNED FROM addItemsToCartDB', res.data);
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

/* doesnt mutate client state, only affects db */
async function addItemToCartDB(id: number): Promise<AddItemSuccess> {
  return axios
    .post(CART_URL + id, { quantity: 1 }, { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

/* doesnt mutate client state, only affects db */
async function removeItemFromCartDB(productId: number): Promise<void> {
  return axios
    .delete(CART_URL + productId, { headers: authHeader() })
    .then((res) => res.data)
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function clearCartItems(): Promise<void> {
  return axios
    .delete(CART_URL, { headers: authHeader() })
    .then((res) => res.data)
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

export {
  clearCartItems,
  removeItemFromCartDB,
  addItemToCartDB,
  addItemsToCartDB,
  fetchCartItems,
  createCart,
  apifetchCart,
  CART_URL,
};
