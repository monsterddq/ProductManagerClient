import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './component/Home.js';
import Unit from './component/Unit.js';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route exact path='/unit' component={ Unit } />
</Layout>;
