import React, {Component} from 'react';
import $ from 'jquery';
import Utility from '../Utility.js';
import { NavLink } from 'react-router-dom';

export default class AddUnit extends Component{
  constructor(){
    super();
    this.state = {
      notice: ''
    };
  }
  handleSubmit(e){
    let that = this;
    e.preventDefault();
    $.ajax({
      url: `${Utility.url}/api/unit/create`,
      type: 'POST',
      dataType: 'json',
      data: new Unit(null,this.refs.name.value.trim())
    })
    .done(function(e) {
      if(!e) that.setState({notice: Utility.notice('alert-warning','Đơn vị này đã tồn tại. Vui lòng nhập tên đơn vị khác.')})
      else that.setState({notice: Utility.notice('alert-success','Thêm mới đơn vị thành công.')})
      setTimeout(()=>{
        that.setState({notice:''});
      },2000);
    })
    return false;
  }

  handleSubmitForm(e){
    e.preventDefault();
    return false;
  }

  render(){
    return(
      <div>
         <h3>Thêm đơn vị</h3>
         <NavLink to={ '/sanpham/unit' } exact activeClassName='active' >
           <i className="glyphicon glyphicon-arrow-left"></i>  Quay lại danh sách đơn vị
         </NavLink>
         <div dangerouslySetInnerHTML={{ __html: this.state.notice}}></div>
         <form onSubmit={this.handleSubmitForm.bind(this)} >
            <div className="form-group">
              <label>Tên đơn vị</label>
              <input name="name" className="form-control" ref="name" placeholder="Nhập tên đơn vị"/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Thêm đơn vị</button>
         </form>
      </div>
    )
  }
}

class Unit{
  constructor(UnitId,Name){
    this.UnitId = UnitId
    this.Name = Name
  }
}
