import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
// eslint-disable-next-line
import { WEATHER_API, WEATHER_URL } from "../constants";
import WeatherService from "./service";

const weather = new WeatherService();
class ForecastContainer extends React.Component {
  state = {
    data: [],
    loading: false,
    error: false,
    degreeType: "fahrenheit",
    zip: '',
	 city: ''
  };

  apiFetching() {
    this.setState({
      loading: true,
      error: false,
    });
    weather.fetchFiveDayForeCast(this.state.zip).then(
      (res) => {
        if (res && res.response.ok) {
          this.setState({
            data: res.data,
				city: res.city,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
        });
      }
    );
  }

  componentDidMount() {
    this.apiFetching();
  }

  updateForecastDegree = ({ target: { value } }) => {
    this.setState({ degreeType: value });
  };

  handleInput = ({ target: { value } }) => {
    if (value > 9999) {
		this.setState({ zip: value }
		,() => this.apiFetching())
	} else {
		this.setState({ zip: value })
	}
		
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { loading, error, data, degreeType, city } = this.state;
    return (
      <div className="container mt-5">
        <h1 className="display-1 jumbotron bg-light py-5 mb-5">
          Forecast Container
        </h1>
        <h5 className="text-muted">{city}</h5>
        <form onSubmit={this.handleSubmit} action="">
          <label htmlFor="">
            <h1>Enter the zip code</h1>
            <input
              type="text"
              value={this.state.zip}
              onChange={this.handleInput}
            //   onKeyPress={this.apiFetching()}
            />
          </label>
        </form>
        <DegreeToggle
          updateForecastDegree={this.updateForecastDegree}
          degreeType={degreeType}
        />
        <div className="row justify-content-center">
          {!loading ? (
            data.map((item) => (
              <DayCard data={item} key={item.dt} degreeType={degreeType} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {error && <h3 className="text-danger">Error loading data 😔</h3>}
      </div>
    );
  }
}

export default ForecastContainer;
