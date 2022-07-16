import { WEATHER_API, WEATHER_URL } from "../constants";

class WeatherService {
	async fetchFiveDayForeCast(zip) {
		console.log(zip);
		return new Promise( async (success, failure) => {
			try {
				const response = await fetch(`${WEATHER_URL(zip)}${WEATHER_API}`);
				if (response.ok) {
					const json = await response.json();
					const city = json.city.name;
					const data = json.list
						.filter(day => day.dt_txt.includes( "00:00:00"))
						.map(item => ({
							temp: item.main.temp,
							dt: item.dt,
							date: item.dt_txt,
							imgId: item.weather[0].icon,
							desc: item.weather[0].description,
						}));
					success({ response, data, city})
				} else {
					failure({ error: "Invalid http request"})
				}
			} catch(error) {
				failure(error)
			}
		})
	}
}

export default WeatherService;