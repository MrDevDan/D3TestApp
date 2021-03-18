import React, { Component } from "react";
import "./Columns.css";

// output a UL
function ItemList(props) {
  const items = props.items;
  const ItemsList = items.map((item, i) =>
    <li key={i}>{item}</li>
  );
  return (
    <ul>{ItemsList}</ul>
  );
}

// Just a simple two column to two accordions on mobile.
export class Columns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Header1: "Header Text",
      Header2: "This is Long Header Text",
      PackageHeader: "Package Includes:",
      Package1Items: [
        "Item Name",
        "Item Name",
        "Item Name",
        "Item Name",
        "Item Name",
        "Item Name",
        "Item Name",
      ],
      Package2Items: ["Item Name", "Item Name", "Item Name"],
      P1state: false,
      P2state: false,
    };
  }

  render() {
    return (
      <div className="grid-x columns">
        <div className="cell small-12 background">
          <div className="grid-x">
            <div className="cell small-12 medium-6 panel panelLeft">
              <div className="card">
                <div
                  className={
                    this.state.P1state
                      ? "card-section accord opened"
                      : "card-section accord closed"
                  }
                >
                  <div
                    className="header accordHead"
                    onClick={() =>
                      this.setState({
                        P1state: !this.state.P1state,
                        P2state: false,
                      })
                    }
                  >
                    <div className="grid-x">
                      <div className="cell small-11 medium-12">
                        {this.state.Header1}
                      </div>
                      <div className="cell small-1 show-for-small-only arrow">
                        <img
                          src={this.state.P1state ? "/up.png" : "/down.png"}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordBody">
                    <hr className="hide-for-small-only"></hr>
                    <div className="packageHeader">{this.state.PackageHeader}</div>
                    <ItemList items={this.state.Package1Items} />
                    <a href="/" className="button">
                      BUTTON
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="cell small-12 medium-6 panel panelRight">
              <div className="card">
                <div
                  className={
                    this.state.P2state
                      ? "card-section accord opened"
                      : "card-section accord closed"
                  }
                >
                  <div
                    className="header accordHead"
                    onClick={() =>
                      this.setState({
                        P2state: !this.state.P2state,
                        P1state: false,
                      })
                    }
                  >
                    <div className="grid-x">
                      <div className="cell small-11 medium-12">
                        {this.state.Header2}
                      </div>
                      <div className="cell small-1 show-for-small-only arrow">
                        <img
                          src={this.state.P2state ? "/up.png" : "/down.png"}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordBody">
                    <hr className="hide-for-small-only"></hr>
                    <div className="packageHeader">{this.state.PackageHeader}</div>
                    <ItemList items={this.state.Package2Items} />
                    <a href="/" className="button">
                      BUTTON
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Columns;