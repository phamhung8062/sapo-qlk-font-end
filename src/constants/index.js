/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-cycle */
import AdminHomePage from '../container/AdminHomePage';
import Product from '../container/Product';
import ListReceipts from '../container/Receipts/ListReceipt';
import ReceiptCreatedMate from '../container/Receipts/Receipt-createdMate';
import ReceiptInfo from '../container/Receipts/Receipt-Info';
import ListProduct from '../container/Product/ListProduct/index';
import ListSupplier from '../container/Supplier/ListSupplier/index';
import SupplierForm from '../components/Supplier/SupplierForm';
import SupplierInfo from '../components/Supplier/SupplierInfo/index';
import ProductCreate from '../container/Product/Product-Create';
import ProductDetail from '../container/Product/Product-Detail/index';
import LoginPageMate from '../container/LoginPageMate/index';
import ReceipitUpdate from '../container/Receipts/Receipit-Update';
export const API_ENDPOINT = 'http://localhost:3000';
export const API_ENDPOINT_RECEIPT = 'http://localhost:8083';
export const API_ENDPOINT_SUPPLIER = 'http://localhost:8083';
export const API_SERVER = 'http://localhost:8083';
export const AUTHORIZATION_KEY = 'TOKEN';
export const STATUSES = [
  {
    value: 0,
    lable: 'READY',
  },
  {
    value: 1,
    lable: 'IN PROGRESS',
  },
  {
    value: 2,
    lable: 'COMPLETE',
  },
];
export const STATUS_CODE = {
  SUCCES: 200,
  CREATED: 201,
  UPDATE: 202,
  AU: 401,
};
export const ADMIN_ROUTERS = [
  {
    path: '/receipts',
    name: 'Quản Lý Nhập Kho',
    exact: true,
    component: ListReceipts,
  },
  {
    path: '/products/create',
    exact: true,
    component: ProductCreate,
  },
  {
    path: '/products/:id',
    // exact: true,
    component: ProductDetail,
  },
  {
    path: '/',
    name: 'Giới Thiệu',
    exact: true,
    component: AdminHomePage,
  },
  {
    path: '/products',
    exact: true,
    name: 'Quản Lý Sản Phẩm',
    component: ListProduct,
  },
  {
    path:
      '/products?name=:name&skuCode=:skuCode&producer=:producer&status=:status',
    exact: true,
    component: ListProduct,
  },

  {
    name: 'Quản Lý Nhà Cung Cấp',
    path: '/suppliers',
    exact: true,
    component: ListSupplier,
  },


  {
    path: '/products/:id',
    exact: true,
    component: ProductDetail,
  },
  {
    path: '/receipts/create',
    name: 'Quản Lý Nhập Kho',
    exact: true,
    component: ReceiptCreatedMate,
  },
  {
    path: '/receipts/:id/edit',
    exact: true,
    component: ReceipitUpdate,
  },

  {
    path: '/receipts/info/:id',
    name: 'Quản Lý Nhập Kho',
    exact: true,
    component: ReceiptInfo,
  },
  {
    path: '/suppliers/create',
    name: 'Quản Lý Nhà Cung Cấp',
    exact: true,
    component: SupplierForm,
  },
  {
    path: '/suppliers/:id',
    name: 'Quản Lý Nhà Cung Cấp',
    exact: true,
    component: SupplierInfo,
  },
  {
    path: '/suppliers/:id/edit',
    name: 'Quản Lý Nhà Cung Cấp',
    exact: true,
    component: SupplierForm,
  },
];
export const ADMIN_ROUTERS_MENU = [
  {
    name: 'Quản Lý Nhập Kho',
    component: ListReceipts,
  },
  {
    path: '/products',
    name: 'Quản Lý Sản Phẩm',
    component: ListProduct,
  },
  {
    path: '/suppliers',
    name: 'Quản Lý Nhà Cung Cấp',
    component: ListSupplier,
  },
];
export const ROUTERS = [
  // {
  //   path: '/login',
  //   name: 'Đăng Nhập',
  //   component: LoginPage,
  // },
  {
    path: '/login',
    name: 'Đăng Nhập',
    component: LoginPageMate,
  },
];
