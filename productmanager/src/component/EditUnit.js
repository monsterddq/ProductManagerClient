import React, {Component} from 'react';
import $ from 'jquery';
import Utility from '../Utility.js';
import { NavLink } from 'react-router-dom';
import Unit from '../models/Unit.js';


export default class EditUnit extends Component{
  constructor(props){
    super(props);
    this.state = {
      notice: '',
      item: new Unit(Utility.paramsURL(this.props.location.search).get("id"),""),
      loading: true,
      listUnit: JSON.parse(localStorage.getItem('listUnit')),
    };
  }

  getUnit(id){
    let that = this;
    $.ajax({
      url: `${Utility.url}/api/unit/get`,
      type: 'GET',
      dataType: 'json',
      data: {id: this.state.item.UnitId}
    })
    .done(function(e) {
      that.setState({item: new Unit(e.unitId, e.name), loading: false})
    })
  }

  changeInputForm(e){
    this.setState({item: new Unit(this.state.item.UnitId, e.target.value)});
  }

  handleSubmit(e){
    e.preventDefault();
    let that = this;
    let a = this.state.listUnit.find(w=> w.UnitId === this.state.item.unitId);
    if(a.name === this.state.item.Name) return;
    $.ajax({
      url: `${Utility.url}/api/unit/edit`,
      type: 'PUT',
      dataType: 'json',
      data: this.state.item
    })
    .always(function() {
      that.setState({notice: Utility.notice('alert-success','Thêm mới đơn vị thành công.')})
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

  renderForm(){
    return (
      <form onSubmit={this.handleSubmitForm.bind(this)} >
         <div className="form-group">
           <label>Tên đơn vị</label>
           <input name="name" className="form-control" ref="name" placeholder="Nhập tên đơn vị" value={this.state.item.Name} onChange={this.changeInputForm.bind(this)} />
         </div>
         <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Cập nhập đơn vị</button>
      </form>
    )
  }

  componentWillMount(){
    this.getUnit();
  }

  render(){
    let content = this.state.loading
                ? <p>Đang tải dữ liệu</p>
                : this.renderForm();
    return(
      <div>
         <h3>Cập nhập đơn vị</h3>
         <NavLink to={ '/sanpham/unit' } exact activeClassName='active' >
           <i className="glyphicon glyphicon-arrow-left"></i>  Quay lại danh sách đơn vị
         </NavLink>
         <div dangerouslySetInnerHTML={{ __html: this.state.notice}}></div>
         {content}
      </div>
    )
  }
}
