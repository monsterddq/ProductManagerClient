import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './component/Home.js';
import Unit from './component/Unit.js';
import AddUnit from './component/AddUnit.js';
import EditUnit from './component/EditUnit.js';
import Product from './component/Product.js';
import AddProduct from './component/AddProduct.js';
import EditProduct from './component/EditProduct.js';

export const routes = <Layout>
    <Route exact path='/sanpham' component={ Home } />
    <Route exact path='/sanpham/unit' component={ Unit } />
    <Route exact path='/sanpham/addunit'component ={ AddUnit }/>
    <Route exact path='/sanpham/editunit'component ={ EditUnit }/>
    <Route exact path='/sanpham/product'component ={ Product }/>
    <Route exact path='/sanpham/addproduct'component ={ AddProduct }/>
    <Route exact path='/sanpham/editproduct'component ={ EditProduct }/>
</Layout>;
