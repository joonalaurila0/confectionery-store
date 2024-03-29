import { rest } from 'msw';
import { server } from '../mocks/server';
import {
  addItemToCartDB,
  CART_URL,
  clearCartItems,
  createCart,
  apifetchCart,
  fetchCartItems,
  removeItemFromCartDB,
} from './api';

describe('Cart API Unit tests', () => {
  const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  describe('apifetchCart', () => {
    it('fetches user cart and returns it', async () => {
      const result = await apifetchCart();
      expect(result).toEqual({
        id: expect.any(String),
        userId: expect.any(String),
        CreatedAt: expect.any(String),
      });
      expect(uuidRegex.test(result.id)).toEqual(true);
      expect(uuidRegex.test(result.userId)).toEqual(true);
    });

    it('throws an error for nonexistant cart', async () => {
      server.use(
        rest.get(CART_URL + 'items', (_req, res, ctx) => {
          return res(
            ctx.status(401),
            ctx.json({
              statusCode: 401,
              message: 'User has no cart',
              error: 'Not Found',
            })
          );
        })
      );
      expect(() => fetchCartItems()).rejects.toThrow('401');
    });
  });

  describe('createCart', () => {
    it('creates a cart for user and returns it', async () => {
      const result = await createCart();
      expect(result).toEqual({
        id: expect.any(String),
        userId: expect.any(String),
        CreatedAt: expect.any(String),
      });
      expect(uuidRegex.test(result.id)).toEqual(true);
      expect(uuidRegex.test(result.userId)).toEqual(true);
    });
  });

  describe('fetchCartItems', () => {
    it('returns cart items', async () => {
      const result = await fetchCartItems();
      expect(result).toEqual([
        {
          productId: expect.any(Number),
          title: expect.any(String),
          image: expect.any(String),
          price: expect.any(Number),
          quantity: expect.any(Number),
        },
        {
          productId: expect.any(Number),
          title: expect.any(String),
          image: expect.any(String),
          price: expect.any(Number),
          quantity: expect.any(Number),
        },
      ]);
    });
  });

  describe('addItemToCartDB', () => {
    it('returns added cart item to cart', async () => {
      const result = await addItemToCartDB(28);
      expect(result).toEqual({
        cartId: expect.any(String),
        id: expect.any(String),
        quantity: '1',
        price: expect.any(Number),
        productId: 28,
        CreatedAt: expect.any(String),
      });
    });

    /* providing nonexistant id leads to function not finding price */
    it('throws an error for not providing nonexistant id', async () => {
      server.use(
        rest.post(CART_URL + 282, (_req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              statusCode: 404,
              message: 'Price could not be found',
              error: 'Not Found',
            })
          );
        })
      );
      expect(() => addItemToCartDB(282)).rejects.toThrow('404');
    });
  });

  describe('removeItemFromCartDB', () => {
    it('removes item from cart and returns void', async () => {
      expect.assertions(2);
      await expect(removeItemFromCartDB(28)).resolves.not.toThrow();
    });

    it('throws error for providing nonexistant id in the cart', async () => {
      server.use(
        rest.delete(CART_URL + 28, (_req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              statusCode: 404,
              message: 'Cart Item with ID "28" not found',
              error: 'Not Found',
            })
          );
        })
      );
      expect(removeItemFromCartDB(28)).rejects.toThrow('404');
    });
  });

  describe('clearCartItems', () => {
    it('removes all items from the cart and returns void', async () => {
      expect.assertions(2);
      await expect(clearCartItems()).resolves.not.toThrow();
    });

    it('throws an error for nonexistant cart', async () => {
      server.use(
        rest.delete(CART_URL, (_req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              statusCode: 404,
              message: 'No cart found',
              error: 'Not Found',
            })
          );
        })
      );
      expect(clearCartItems()).rejects.toThrow('404');
    });
  });
});
