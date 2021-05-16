import * as React from 'react';
import './products-delete.css';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../../../redux/product/productSlice';
import { fetch, remove } from '../../../redux/product/productSlice';

type FormValues = {
  id: string;
};

function ProductsDelete(): JSX.Element {
  const products = useSelector(selectItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(remove(data['id']));
  };
  return (
    <div className='product-deletion'>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Delete a product</label>
          <select {...register('id')} id='products'>
            {products.map(({ id, title }: any) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </select>
          <button type='submit'>Delete</button>
        </form>
      </div>
    </div>
  );
}

export default ProductsDelete;
