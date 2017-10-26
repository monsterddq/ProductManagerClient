import React, { Component } from 'react';
import Utility from '../Utility';
import UnitItem from './UnitItem';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Unit extends Component{
  constructor(){
    super();
    this.state = {
      listUnit: [],
      loading: true
    };
  }

  renderTableUnit(listUnit){
    let list;
    list = listUnit.map((v,k) => {
      return (
        <UnitItem key={k} value={v} onDeleteUnit={this.handleRemove.bind(this)} />
      )
    })
    return (
      <table className='table'>
            <thead>
                <tr>
                    <th>Mã số</th>
                    <th>Tên Đơn Vị</th>
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
    $.get(`${Utility.url}/api/unit/getall`, (data) => {
      this.setState({ listUnit: data, loading: false });
      localStorage.setItem('listUnit',JSON.stringify(data));
    });
  }

  handleRemove(id){
    let Unit = this;
    $.ajax({
      url: `${Utility.url}/api/unit/delete`,
      type: 'DELETE',
      dataType: 'json',
      data: {id: id},
      success: function(){
        Unit.getData();
      }
    })
  }

  componentWillMount(){
    this.getData();
  }

  render(){
    let content = this.state.loading
          ? <p>Đang tải dữ liệu</p>
          : this.renderTableUnit(this.state.listUnit);
    return (
      <div>
         <h3>Danh sách đơn vị</h3>
         <Button bsStyle="primary" >
            <NavLink to={ '/sanpham/addUnit' } exact activeClassName='active' className="link-button" >
              Thêm đơn vị
            </NavLink>
         </Button>
         {content}
      </div>
    )
  }
}
