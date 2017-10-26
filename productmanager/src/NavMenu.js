import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class NavMenu extends Component{
    render(){
      return(
        <div className='main-nav'>
              <div className='navbar navbar-inverse'>
              <div className='navbar-header'>
                  <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                      <span className='sr-only'>Toggle navigation</span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                  </button>
                  <Link className='navbar-brand' to={ '/sanpham' }>Quản lý sản phẩm</Link>
              </div>
              <div className='clearfix'></div>
              <div className='navbar-collapse collapse'>
                  <ul className='nav navbar-nav'>
                      <li>
                          <NavLink to={ '/sanpham' } exact activeClassName='active'>
                              <span className='glyphicon glyphicon-home'></span> Trang chủ
                          </NavLink>
                      </li>
                      <li>
                          <NavLink to={ '/sanpham/product' } activeClassName='active'>
                              <span className='glyphicon glyphicon-education'></span> Sản phẩm
                          </NavLink>
                      </li>
                      <li>
                          <NavLink to={ '/sanpham/unit' } activeClassName='active'>
                              <span className='glyphicon glyphicon-th-list'></span> Đơn vị
                          </NavLink>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      )
    }

}
