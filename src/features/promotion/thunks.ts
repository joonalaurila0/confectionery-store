import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { createPromotion, fetchPromotions, removePromotion, updatePromotion } from './api';
import { IPromotions, ValidationErrors } from './promotionSlice';

export const fetch = createAsyncThunk('promotions/fetch', async () => {
  return fetchPromotions();
});

export const create = createAsyncThunk(
  'promotions/create',
  async (data: IPromotions, { rejectWithValue }) => {
    try {
      return createPromotion(data);
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove = createAsyncThunk('promotions/remove', async (id: number) => {
  try {
    return removePromotion(id);
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return Promise.reject(err);
  }
});

export const update = createAsyncThunk(
  'promotions/update',
  async ({ id, ...updateProps }: IPromotions) => {
    try {
      return updatePromotion({ id, ...updateProps });
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    }
  }
);