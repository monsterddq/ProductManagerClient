import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class ProductItem extends Component{
  handleClick(e){
    this.props.onDeleteProduct(this.props.value.productId);
    e.preventDefault();
  }

  render()
  {
    let s = JSON.parse(localStorage.getItem('listUnit'));
    let b = s.find(w=> w.unitId===this.props.value.unitId);
    return (
        <tr>
          <td>{this.props.value.productId}</td>
          <td>{this.props.value.name}</td>
          <td>{this.props.value.price}</td>
          <td>{b.name}</td>
          <td>
            <Button bsStyle="primary" >
               <NavLink to={ `/sanpham/editproduct?id=${this.props.value.productId}` } exact activeClassName='active' className="link-button" >
                 Cập nhập
               </NavLink>
            </Button>
            <span>  </span>
            <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Xóa</button>
          </td>
        </tr>
    )
  }

}
