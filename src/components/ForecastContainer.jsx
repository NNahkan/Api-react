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
    zip: 37760,
  };

  componentDidMount() {
    this.setState({ loading: true });
   if ( this.state.zip === 37760) {
		weather.fetchFiveDayForeCast(this.state.zip).then(
			(res) => {
			  if (res && res.response.ok) {
				 this.setState({
					data: res.data,
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
  }

  updateForecastDegree = ({ target: { value } }) => {
    this.setState({ degreeType: value });
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ zip: value });
  };

  handleSubmit = (e) => {
	e.preventDefault();
  }

  render() {
    const { loading, error, data, degreeType } = this.state;
    return (
      <div className="container mt-5">
        <h1 className="display-1 jumbotron bg-light py-5 mb-5">
          Forecast Container
        </h1>
        <h5 className="text-muted">Sevierville TN, US</h5>
        <form onSubmit={this.handleSubmit} action="">
          <label htmlFor="">
            <h1>zip</h1>
            <input
              type="text"
              value={this.state.zip}
              onChange={this.handleInput}
            />
          </label>
          <input type="submit" value="ok" />
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
