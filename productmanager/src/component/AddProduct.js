import React, {Component} from 'react';
import $ from 'jquery';
import Utility from '../Utility.js';
import { NavLink } from 'react-router-dom';
import Product from '../models/Product.js';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class AddProduct extends Component{
  constructor(){
    super();
    this.state = {
      notice: '',
      listUnit: '',
      loading: true,
      product: new Product()
    };
  }

  getData(){
    $.get(`${Utility.url}/api/unit/getall`, data => {
      this.setState({ listUnit: data, loading: false,product: new Product(null,null,null, data[0].unitId) });
    });
  }

  handleSubmit(e){
    e.preventDefault();
    let that = this;
    if(this.state.product.Name && this.state.product.Price)
    {
      $.ajax({
        url: `${Utility.url}/api/product/create`,
        type: 'POST',
        dataType: 'json',
        data: this.state.product
      })
      .done(function(e) {
        if(!e) that.setState({notice: Utility.notice('alert-warning','Sản phầm này đã tồn tại. Vui lòng nhập tên sản phẩm khác.')})
        else that.setState({notice: Utility.notice('alert-success','Thêm mới sản phẩm thành công.')})
        setTimeout(()=>{
          that.setState({notice:''});
        },2000);
      })
    }
    else {
      that.setState({notice: Utility.notice('alert-warning','Các trường không được trống.')})
    }
    return false;
  }

  handleSubmitForm(e){
    e.preventDefault();
    return false;
  }

  changeSelect(e){
    this.setState({product: new Product(null,this.state.product.Name, this.state.product.Price, e.target.value)});
  }
  changeName(e){
    this.setState({product: new Product(null,e.target.value, this.state.product.Price, this.state.product.UnitId)});
  }
  changePrice(e){
    this.setState({product: new Product(null,this.state.product.Name, e.target.value,  this.state.product.UnitId)});
  }

  renderForm(listUnit){
    let list;
    list = listUnit.map((v,k) => {
      return (
        <option key={k} data-tokens={v.unitId} value={v.unitId} ref={v.unitId}>{v.name}</option>
      )
    })
    return (
      <form onSubmit={this.handleSubmitForm.bind(this)} >
         <div className="form-group">
           <label>Tên đơn vị</label>
           <input type="text" name="name" className="form-control" ref="name" onChange={this.changeName.bind(this)} placeholder="Nhập tên sản phẩm"/>
         </div>
         <div className="form-group">
           <label>Nhập giá</label>
           <input name="price" className="form-control" ref="price" placeholder="Nhập giá" onChange={this.changePrice.bind(this)}/>
         </div>
         <div className="form-group">
           <label>Chọn đơn vị</label>
           <span>  </span>
           <div>
             <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" onChange={this.changeSelect.bind(this)}>
                  {list}
                </FormControl>
             </FormGroup>
           </div>
         </div>
         <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Thêm sản phẩm</button>
      </form>
    )

  }

  componentWillMount(){
    this.getData();
  }

  render(){
    let content = this.state.loading
                ? <p>Đang tải dữ liệu</p>
                : this.renderForm(this.state.listUnit);
    return(
      <div>
         <h3>Thêm đơn vị</h3>
         <NavLink to={ '/sanpham/product' } exact activeClassName='active' >
           <i className="glyphicon glyphicon-arrow-left"></i>  Quay lại danh sách sản phẩm
         </NavLink>
         <div dangerouslySetInnerHTML={{ __html: this.state.notice}}></div>
         {content}
      </div>
    )
  }
}
