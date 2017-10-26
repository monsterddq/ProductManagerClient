import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class UnitItem extends Component{
  handleClick(){
    this.props.onDeleteUnit(this.props.value.unitId);
  }

  render()
  {
    return (
        <tr>
          <td>{this.props.value.unitId}</td>
          <td>{this.props.value.name}</td>
          <td>
            <Button bsStyle="primary" >
               <NavLink to={ `/sanpham/editunit?id=${this.props.value.unitId}` } exact activeClassName='active' className="link-button" >
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
