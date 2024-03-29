import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import StockListScreen from './screens/manager/StockListScreen';
import StockEditScreen from './screens/manager/StockEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import AdminRoute from './components/AdminRoute';
import ManagerRoute from './components/ManagerRoute';
import UploadExcelFileScreen from './screens/manager/UploadExcelFileScreen';
import AdminStockList from './screens/manager/AdminStockList';
import OpenWarehouse from './screens/OpenWarehouse';
import IssueDirectiveScreen from './screens/IssueDirectiveScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<HomeScreen />}
      />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/directive' element={<IssueDirectiveScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/warehouse/:id' element={<OpenWarehouse />} />
        <Route
          path='/warehouse/:id/page/:pageNumber'
          element={<OpenWarehouse />}
        />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<ManagerRoute />}>
        <Route path='/stockAdmin/stocklist' element={<StockListScreen />} />
        <Route
          path='/stockAdmin/stocklist/page/:pageNumber'
          element={<StockListScreen />}
        />
        <Route
          path='/stockAdmin/stocklist/mylist/page/:pageNumber'
          element={<AdminStockList />}
        />
        <Route
          path='/stockAdmin/stocklist/mylist'
          element={<AdminStockList />}
        />
        <Route
          path='/stockAdmin/uploadExcel'
          element={<UploadExcelFileScreen />}
        />
        <Route
          path='/stockAdmin/stock/:id/edit'
          element={<StockEditScreen />}
        />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/stocklist' element={<StockListScreen />} />
        <Route
          path='/admin/stocklist/:pageNumber'
          element={<StockListScreen />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
