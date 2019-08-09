import React from "react";
import axios from "axios";
import Chart from "./Components/Chart/Chart";
// import Transformation from "../Transformation"
// import ComSelTransformation from "./Components/ComSelTransformation"
import "./App.scss";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sessions: [],
      sessions_production: [],
      realData: [],
      defaultOption: "Gender"
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/sessions/all`).then(res => {
      console.log(res);
      this.setState({
        sessions: res.data[0]
      });
    });

    axios
      // For development: ${process.env.REACT_APP_BACKEND_URL}/sessions/products/1
      .get(`https://sa-stage.herokuapp.com/sessions/lance/all`)
      .then(res => {
        // Log to see the response from server: console.log(res.data);
        this.setState({
          ...this.state,
          realData: res.data
        });
      });
  }

  onSelect = option => {
    if (option.label == "Gender") {
      this.props.history.push("/gender-chart");
      this.setState({
        ...this.state,
        defaultOption: "Gender"
      })
    } else if (option.label == "Crossing Frequency") {
      this.props.history.push("/crossing-frequency-chart");
      this.setState({
        ...this.state,
        defaultOption: "Crossing Frequency"
      })
    } else if (option.label == "Education") {
      this.props.history.push("/education-chart");
      this.setState({
        ...this.state,
        defaultOption: "Education"
      })
    } else if (option.label == "Age") {
      this.props.history.push("/age-chart");
      this.setState({
        ...this.state,
        defaultOption: "Age"
      })
    } else if (option.label == "Country") {
      this.props.history.push("/country-chart");
      this.setState({
        ...this.state,
        defaultOption: "Country"
      })
    } else if (option.label == "Language") {
      this.props.history.push("/language-chart");
      this.setState({
        ...this.state,
        defaultOption: "Language"
      })
    } else if (option.label == "Primary Income") {
      this.props.history.push("/primaryincome-chart");
      this.setState({
        ...this.state,
        defaultOption: "Primary Income"
      })
    } else if (option.label == "Produce") {
      this.props.history.push("/produce-chart");
      this.setState({
        ...this.state,
        defaultOption: "Produce"
      })
    }
  };

  render() {
    console.log(this.props);
    const options = ["Gender", "Education", "Crossing Frequency", "Age", "Country", "Primary Income", "Language", "Produce"];

    return (
      <div className="App">
        <h1>Welcome to the Sauti Databank!</h1>
        <div className="main-container">
          <div className="header">
            <h1>Informal Cross-Border Trade Data</h1>
          </div>
          <div className="content-container">
            <div className="chart-container">
              <Chart />
            </div>
            {/* <ComSelTransformation /> */}
            <div className="dropdown-container">
              <p>Key Trader Demographics</p>
              <Dropdown
                className="dropdown"
                options={options}
                onChange={this.onSelect}
                value={this.state.defaultOption}
                placeholder="Select an option"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
