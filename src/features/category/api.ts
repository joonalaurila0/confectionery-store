import axios, { AxiosError } from 'axios';
import { ValidationErrors } from '../promotion/promotionSlice';
import { Category } from './categorySlice';

export const CATEGORY_URL = 'http://localhost:3000/category/';

export async function fetchCategories(): Promise<Category[]> {
  return axios
    .get(CATEGORY_URL)
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

export async function createCategory(cname: string): Promise<Category> {
  return axios
    .post(CATEGORY_URL, { cname: cname })
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

export async function removeCategory(id: string): Promise<void> {
  return axios
    .delete(CATEGORY_URL + id)
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

export async function updateCategory(data: Category): Promise<Category> {
  const { id, cname } = data;
  return axios
    .patch(CATEGORY_URL + id, cname)
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
