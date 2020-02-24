import React, { Component } from "react";
import "./App.css";
import TextItem from "./TextItem";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  state = {
    value: "",
    textList: []
  };

  componentDidMount() {
    this._renderText();
  }
  render() {
    const { textList } = this.state;
    console.log(textList);
    return (
      <div className="App">
        <h1>OneLine App</h1>
        <div>
          <label>
            Text:
            <input
              type="text"
              value={this.state.value}
              onChange={this._handleChange}
            />
          </label>
          <button onClick={this._handleSubmit}>submit</button>
        </div>
        <h2>Long Text</h2>
        {textList.map((text, index) => {
          return (
            <TextItem
              text={text.text}
              key={index}
              id={text.id}
              handleClick={this._deleteText}
            />
          );
        })}
      </div>
    );
  }
  _handleChange = event => {
    this.setState({ value: event.target.value });
  };
  _handleSubmit = () => {
    const { value } = this.state;
    axios
      .post("/api/moim/", { text: value })
      .then(res => this._renderText());
  };
  _renderText = () => {
    axios
      .get("/api/moim/")
      .then(res => this.setState({ textList: res.data }))
      .catch(err => console.log(err));
  };
  _deleteText = id => {
    axios.delete(`/api/moim/${id}`).then(res => this._renderText());
  };
}

export default App;