import {rest} from 'msw'; // msw supports graphql too!
import { 
  getAllCategory,
  getCategoryById
} from './mockDataCategory';
import { 
  countProductsByCategory,
  getProductsByCategory,
  getProductById
} from './mockDataProduct';
import {
  getOrdersByProductId,
  getOrderByIdAdmin,
  getOrderById,
  getOrdersByUserId
} from './mockDataOrder';
import {
  getCartByUserId,
  updateCart
} from './mockDataCart';
import {
  login
} from './mockDataUser';

const handlers = [
 
  rest.get('http://localhost:3000/api/product/cat/count/12345', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(countProductsByCategory))
  }),
  rest.get('http://localhost:3000/api/product/cat/count/sadcase', async (req, res, ctx) => {
    return res(ctx.status(400))
  }),
  rest.get('http://localhost:3000/api/category', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAllCategory))
  }),
  rest.get('http://localhost:3000/api/category/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCategoryById))
  }),
  rest.get('http://localhost:3000/api/order/admin/product/12345', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrdersByProductId))
  }),
  rest.get('http://localhost:3000/api/order/admin/product/sadcase', async (req, res, ctx) => {
    return res(ctx.status(400))
  }),
  rest.get('http://localhost:3000/api/order/admin/admin/12345', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrderByIdAdmin))
  }),
  rest.get('http://localhost:3000/api/order/admin/admin/sadcase', async (req, res, ctx) => {
    return res(ctx.status(400))
  }),
  rest.get('http://localhost:3000/api/cart/user/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCartByUserId))
  }),
  rest.patch('http://localhost:3000/api/cart', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(updateCart))
  }),
  rest.get('http://localhost:3000/api/product/cat/12345', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getProductsByCategory))
  }),
  rest.get('http://localhost:3000/api/product/cat/sadcase', async (req, res, ctx) => {
    return res(ctx.status(400))
  }),
  rest.get('http://localhost:3000/api/order/12345', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrderById))
  }),
  rest.get('http://localhost:3000/api/order/sadcase', async (req, res, ctx) => {
    return res(ctx.status(400))
  }),
  rest.get('http://localhost:3000/api/order/user/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrdersByUserId))
  }),
  rest.get('http://localhost:3000/api/product/12345', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getProductById))
  }),
  rest.get('http://localhost:3000/api/product/sadcase', async (req, res, ctx) => {
    return res(ctx.status(400))
  }),
  rest.post('http://localhost:3000/api/user/login', async (req, res, ctx) => {
    return res(ctx.status(200))
  }),
  rest.delete('http://localhost:3000/api/cart/user/12345', async (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]

export {handlers}
