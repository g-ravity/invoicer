import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../assets/css/Input.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      minRows: 1,
      maxRows: 10,
      lineHeight: null
    };
  }

  componentDidMount() {
    this.setState({ lineHeight: ReactDOM.findDOMNode(this).clientHeight });
  }

  handleChange = event => {
    const { minRows, maxRows, lineHeight } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = Math.ceil(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  render() {
    const {
      name,
      placeholder,
      type,
      onClick,
      onChange,
      value,
      id,
      classList,
      readOnly
    } = this.props;

    return (
      <textarea
        name={name}
        rows={this.state.rows}
        value={value}
        placeholder={placeholder}
        className={`textarea ${classList}`}
        id={id}
        onClick={onClick}
        type={type}
        onChange={event => {
          this.handleChange(event);
          onChange(name, event.target.value);
        }}
        autoComplete="off"
        readOnly={readOnly}
      />
    );
  }
}

Input.defaultProps = {
  placeholder: null,
  type: "text",
  onClick: null,
  id: "",
  classList: "",
  onChange: null,
  readOnly: false
};

export default Input;
