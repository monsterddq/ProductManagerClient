import React, { Component } from 'react';
import Utility from '../Utility';
import ProductItem from './ProductItem';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

export default class Product extends Component{
  constructor(){
    super();
    this.state = {
      listProduct: [],
      loading: true
    };
  }

  renderTableProduct(listProduct){
    let list;
    list = listProduct.map((v,k) => {
      return (
        <ProductItem key={k} value={v} onDeleteProduct={this.handleRemove.bind(this)} />
      )
    })
    return (
      <table className='table'>
            <thead>
                <tr>
                    <th>Mã số</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá sản phẩm</th>
                    <th>Đơn vị</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
        </table>
    )
  }

  getData(){
    $.get(`${Utility.url}/api/product/getall`, data => {
      this.setState({ listProduct: data, loading: false });
      localStorage.setItem('listProduct',JSON.stringify(data));
    });
  }

  handleRemove(id){
    let that = this;
    $.ajax({
      url: `${Utility.url}/api/product/delete`,
      type: 'DELETE',
      dataType: 'json',
      data: {id: id}
      })
      .always(()=>{
          that.getData();
      })
  }

  componentWillMount(){
    this.getData();
  }

  render(){
    let content = this.state.loading
          ? <p>Đang tải dữ liệu</p>
          : this.renderTableProduct(this.state.listProduct);
    return (
      <div>
         <h3>Danh sách sản phẩm</h3>
         <Button bsStyle="primary" >
            <NavLink to={ '/sanpham/addProduct' } exact activeClassName='active' className="link-button" >
              Thêm sản phẩm
            </NavLink>
         </Button>
         {content}
      </div>
    )
  }
}
