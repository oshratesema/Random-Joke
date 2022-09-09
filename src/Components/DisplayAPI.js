import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class JokesAPI extends Component {
  constructor() {
    super();
    this.state = {
      dailyJoke: "",
      categories: [],
      categoryJoke: "",
      searchBarData: "",
    };
  }
  fetchJoke = async () => {
    await axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((response) => this.setState({ dailyJoke: response.data.value }));
  };
  fetchViaCategory = async () => {
    await axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then((response) => this.setState({ categories: response.data }));
  };
  fetchRandomCategory = async (query) => {
    await axios
      .get(`https://api.chucknorris.io/jokes/random?category=${query}`)
      .then((response) => this.setState({ categoryJoke: response.data.value }));
  };
  renderCategory = () => {
    console.log(this.state.categories);
    return this.state.categories.map((data, index) => {
      return (
        <div key={index}>
          <button className="btn ms-2 bg-dark text-white" onClick={() => this.fetchRandomCategory(data)}>{data}</button>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center col-12 mt-5">
        <div className="d-flex justify-content-center flex-column align-items-center" style={{width:'100%'}}>
        <button className="btn bg-dark text-white py-3 col-5 my-5" onClick={() => this.fetchJoke()}>Click for random Joke</button>
        <p className="col-5 fw-bold fs-4 mb-3 text-center">{this.state.dailyJoke}</p>
        <button className="btn bg-dark text-white py-3 col-5 my-5" onClick={() => this.fetchViaCategory()}>
          Random Joke via category
        </button>
        <div className="d-flex">{this.renderCategory()}</div>
        <p className="fw-bold fs-4 col-5">{this.state.categoryJoke}</p>
        </div>
      </div>
    );
  }
}