import React, { Component } from "react";

import "../assets/css/App.css";
import Input from "./Input";
import DatePicker from "./Calendar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceId: null,
      date: `${Date().split(" ")[1]} ${Date().split(" ")[2]}, ${
        Date().split(" ")[3]
      }`,
      from: null,
      to: null,
      balance: 0
    };
  }
  render() {
    return (
      <div id="container">
        <Input name="referenceId" placeholder="Invoice Number" label="#" />
        <Input
          name="from"
          placeholder="Who is this invoice from?"
          label="From"
        />
        <Input name="to" placeholder="Who is this invoice to?" label="To" />
        <DatePicker onDatePick={date => console.log(date.toString())} />
      </div>
    );
  }
}

export default App;
