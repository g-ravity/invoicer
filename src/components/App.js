import React, { Component } from "react";
import uuid from "uuid/v4";

import "../assets/css/App.css";
import Input from "./Input";
import DatePicker from "./DatePicker";
import RowEditable from "./RowEditable";

const formatDate = date => {
  const dateArr = date.split(" ");
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: "Sherlock Holmes",
      clientTitle: "Consulting Detective",
      clientAddress: "221B Baker Street, London",
      clientPhone: "",
      clientEmail: "",
      dueBalanceLabel: "Balance Due",
      dueBalance: 0,
      currentDateLabel: "Invoice Date",
      currentDate: formatDate(Date()),
      referenceLabel: "Invoice No.",
      referenceId: "#001",
      itemLabel: "Item",
      rateLabel: "Rate",
      quantityLabel: "Quantity",
      totalLabel: "Total",
      invoiceItems: [
        <RowEditable key={uuid()} id={uuid()} addItem={this.addInvoiceRow} />
      ],
      subtotalAmountLabel: "SUB TOTAL",
      subtotalAmount: 250,
      totalAmountLabel: "TOTAL",
      totalAmount: 500,
      issuerName: "",
      issuerPhone: "",
      issuerEmail: "theravikganguly@gmail.com",
      issuerWebsite: ""
    };
  }

  onInputChange = (key, value) => {
    if (key.includes("Date")) this.setState({ [key]: formatDate(value) });
    else this.setState({ [key]: value });
  };

  addInvoiceRow = id => {
    const newInvoiceItems = this.state.invoiceItems;
    const index = newInvoiceItems.findIndex(cur => cur.props.id === id) + 1;
    newInvoiceItems.splice(
      index,
      0,
      <RowEditable key={uuid()} id={uuid()} addItem={this.addInvoiceRow} />
    );
    this.setState({
      invoiceItems: newInvoiceItems
    });
  };

  render() {
    return (
      <div id="container">
        <div id="invoice-header" className="flex-parent">
          <h1>INVOICE</h1>
          <img
            src="https://i.pinimg.com/originals/a2/44/a3/a244a37a9fca1b393ff9b949a94c3f05.jpg"
            width="200"
            id="logo"
          />
        </div>

        <div id="invoice-showcase" className="flex-parent">
          <div id="client-info">
            <p>To,</p>
            <p>
              <Input
                name="clientName"
                placeholder="Client Name"
                onChange={this.onInputChange}
                value={this.state.clientName}
                id="client-name"
              />
            </p>
            <p>
              <Input
                name="clientTitle"
                placeholder="Position of Client"
                onChange={this.onInputChange}
                value={this.state.clientTitle}
                id="client-title"
              />
            </p>
            <p>
              <Input
                name="clientAddress"
                placeholder="Address of Client"
                onChange={this.onInputChange}
                value={this.state.clientAddress}
                id="client-address"
              />
            </p>

            <p className="flex-parent">
              <i className="material-icons">phone</i>
              <Input
                name="clientPhone"
                placeholder="Phone Number"
                onChange={this.onInputChange}
                value={this.state.clientPhone}
                classList="client-contact"
              />
            </p>
            <p className="flex-parent">
              <i className="material-icons">email</i>
              <Input
                name="clientEmail"
                placeholder="Email Address"
                onChange={this.onInputChange}
                value={this.state.clientEmail}
                classList="client-contact"
              />
            </p>
          </div>

          <div id="invoice-detail" className="flex-parent">
            <div>
              <Input
                name="dueBalanceLabel"
                placeholder="Balance Due"
                onChange={this.onInputChange}
                value={this.state.dueBalanceLabel}
                classList="cell header"
              />

              <Input
                name="dueBalance"
                placeholder="Amount"
                onChange={this.onInputChange}
                value={this.state.dueBalance}
                classList="cell row"
              />
            </div>
            <div>
              <Input
                name="dateLabel"
                placeholder="Invoice Date"
                onChange={this.onInputChange}
                value={this.state.currentDateLabel}
                classList="cell header"
              />

              <DatePicker
                name="currentDate"
                onDatePick={this.onInputChange}
                value={this.state.currentDate}
                classList="cell row"
              />
            </div>
            <div>
              <Input
                name="referenceLabel"
                placeholder="Invoice No."
                onChange={this.onInputChange}
                value={this.state.referenceLabel}
                classList="cell header"
              />

              <Input
                name="referenceId"
                placeholder="#001"
                onChange={this.onInputChange}
                value={this.state.referenceId}
                classList="cell row"
              />
            </div>
          </div>
        </div>

        <div id="invoice-breakdown" className="flex-parent">
          <div className="flex-parent header-row">
            <Input
              name="itemLabel"
              onChange={this.onInputChange}
              value={this.state.itemLabel}
              id="header"
            />

            <Input
              name="rateLabel"
              placeholder="Unit Price"
              onChange={this.onInputChange}
              value={this.state.rateLabel}
            />

            <Input
              name="quantityLabel"
              placeholder="Quantity"
              onChange={this.onInputChange}
              value={this.state.quantityLabel}
            />

            <Input
              name="totalLabel"
              placeholder="Total"
              onChange={this.onInputChange}
              value={this.state.totalLabel}
            />
          </div>

          {this.state.invoiceItems.map(cur => {
            return cur;
          })}
        </div>

        <div className="invoice-amount">
          <Input
            name="subtotalAmountLabel"
            placeholder="Subtotal Amount"
            onChange={this.onInputChange}
            value={this.state.subtotalAmountLabel}
          />
          <span>
            <Input
              name="subtotalAmount"
              onChange={this.onInputChange}
              value={this.state.subtotalAmount}
              readOnly={true}
            />
          </span>
        </div>
        <div className="invoice-amount" id="invoice-total">
          <Input
            name="totalAmountLabel"
            placeholder="Total Amount"
            onChange={this.onInputChange}
            value={this.state.totalAmountLabel}
          />
          <span>
            <Input
              name="totalAmount"
              onChange={this.onInputChange}
              value={this.state.totalAmount}
              readOnly={true}
            />
          </span>
        </div>

        <Input
          name="issuerName"
          placeholder="Your Name"
          onChange={this.onInputChange}
          value={this.state.issuerName}
          id="name"
        />

        <img
          src="https://www.sccpre.cat/mypng/detail/270-2706523_scott-michael-president-ceo-michael-scott-the-office.png"
          width="200"
          id="signature"
        />

        <div id="contact-details" className="flex-parent">
          <div className="flex-parent">
            <i className="material-icons">phone</i>
            <Input
              name="issuerPhone"
              placeholder="Your Phone"
              onChange={this.onInputChange}
              value={this.state.issuerPhone}
            />
          </div>
          <div className="flex-parent">
            <i className="material-icons">email</i>
            <Input
              name="issuerEmail"
              placeholder="Your Email"
              onChange={this.onInputChange}
              value={this.state.issuerEmail}
            />
          </div>
          <div className="flex-parent">
            <i className="material-icons">http</i>
            <Input
              name="issuerWebsite"
              placeholder="Your Website"
              onChange={this.onInputChange}
              value={this.state.issuerWebsite}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
