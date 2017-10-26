import React, {Component} from 'react';
import $ from 'jquery';
import Utility from '../Utility.js';
import { NavLink } from 'react-router-dom';
import Product from '../models/Product.js';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class EditProduct extends Component{
  constructor(props){
    super(props);
    this.state = {
      notice: '',
      item: new Product(Utility.paramsURL(this.props.location.search).get("id"),null,null,null),
      loading: true,
      listUnit: JSON.parse(localStorage.getItem('listUnit')),
      listProduct: JSON.parse(localStorage.getItem('listProduct'))
    };
  }

  getProduct(id){
    let that = this;
    $.ajax({
      url: `${Utility.url}/api/product/get`,
      type: 'GET',
      dataType: 'json',
      data: {id: this.state.item.ProductId}
    })
    .done(function(e) {
      that.setState({item: new Product(e.productId, e.name,e.price,e.unitId), loading: false})
    })
  }

  changeSelect(e){
    this.setState({item: new Product(this.state.item.ProductId,this.state.item.Name, this.state.item.Price, e.target.value)});
  }
  changeName(e){
    this.setState({item: new Product(this.state.item.ProductId,e.target.value, this.state.item.Price, this.state.item.UnitId)});
  }
  changePrice(e){
    this.setState({item: new Product(this.state.item.ProductId,this.state.item.Name, e.target.value,  this.state.item.UnitId)});
  }

  handleSubmit(e){
    e.preventDefault();
    let that = this;
    $.ajax({
      url: `${Utility.url}/api/product/edit`,
      type: 'PUT',
      dataType: 'json',
      data: this.state.item
    })
    .always(function() {
      that.setState({notice: Utility.notice('alert-success','Cập nhập thành công.')})
      setTimeout(()=>{
        that.setState({notice:''});
      },2000);
    });
    return false;
  }

  handleSubmitForm(e){
    e.preventDefault();
    return false;
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
           <input type="text" name="name" className="form-control" ref="name" value={this.state.item.Name} onChange={this.changeName.bind(this)} placeholder="Nhập tên sản phẩm"/>
         </div>
         <div className="form-group">
           <label>Nhập giá</label>
           <input name="price" className="form-control" ref="price"  value={this.state.item.Price}  placeholder="Nhập giá" onChange={this.changePrice.bind(this)}/>
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
    this.getProduct();
  }

  render(){
    let content = this.state.loading
                ? <p>Đang tải dữ liệu</p>
                : this.renderForm(this.state.listUnit);
    return(
      <div>
         <h3>Cập nhập sản phẩm</h3>
         <NavLink to={ '/sanpham/product' } exact activeClassName='active' >
           <i className="glyphicon glyphicon-arrow-left"></i>  Quay lại danh sách sản phẩm
         </NavLink>
         <div dangerouslySetInnerHTML={{ __html: this.state.notice}}></div>
         {content}
      </div>
    )
  }
}
