import React, {Component} from 'react';

export default class UnitItem extends Component{
  handleClick(){
    this.props.onDeleteUnit(this.props.value.unitId);
  }

  render()
  {
      console.log(this.props.value);
    return (
        <tr>
          <td>{this.props.value.unitId}</td>
          <td>{this.props.value.name}</td>
          <td>
            <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Xóa</button>
          </td>
        </tr>
    )
  }

}
