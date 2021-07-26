import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ValidationErrors } from '../promotion/promotionSlice';
import { fetchCartItems, addItemToCartDB, removeItemFromCartDB, clearCartItems } from './api';

export const fetchState = createAsyncThunk('cart/fetch', async () => {
  return fetchCartItems();
});

export const addItemDB = createAsyncThunk(
  'cart/addItemDB',
  async (id: number, { rejectWithValue }) => {
    try {
      return addItemToCartDB(id);
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeItemDB = createAsyncThunk(
  'cart/removeItemDB',
  async (id: number, { rejectWithValue }) => {
    try {
      return removeItemFromCartDB(id);
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearCartDB = createAsyncThunk('cart/clearCartDB', async () => {
  return clearCartItems();
});
