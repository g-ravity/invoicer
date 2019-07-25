import React, { Component } from "react";

import Input from "./Input";
import "../assets/css/RowEditable.css";

class RowEditable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "Item Name",
      description: "Description",
      rate: 100,
      quantity: 2
    };

    this.addItem = React.createRef();
  }

  onInputChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <div className="flex-parent row-group">
        <p className="flex-parent item-group">
          <Input
            name="item"
            onChange={this.onInputChange}
            value={this.state.item}
            placeholder="Item"
          />
          <Input
            name="description"
            onChange={this.onInputChange}
            value={this.state.description}
            placeholder="Optional Description"
            classList="item-description"
          />
        </p>
        <Input
          name="rate"
          onChange={this.onInputChange}
          value={this.state.rate}
          placeholder="Unit Price"
        />
        <Input
          name="quantity"
          onChange={this.onInputChange}
          value={this.state.quantity}
          placeholder="Quantity"
        />
        <Input
          name="total"
          value={this.state.quantity * this.state.rate}
          readOnly={true}
          placeholder="Total Price"
        />
        <i
          className="material-icons add-invoice-item"
          ref={this.addItem}
          onClick={() => this.props.addItem(this.props.id)}
        >
          add_circle_outline
        </i>
      </div>
    );
  }
}

export default RowEditable;
