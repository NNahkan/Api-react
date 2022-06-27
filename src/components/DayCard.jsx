import React from 'react';
import moment from 'moment';

const DayCard =  ({ data, degreeType }) => {
	const { temp, dt, imgId, desc } = data;

	const newDate = new Date();
	newDate.setTime(dt * 1000);

	const icon = `owf-${imgId}`;

	const fahrenheit = Math.round(temp);
	const celsius = Math.round( ( fahrenheit - 32) * (5 / 9) )

	return (
		<div className="col-sm-2">
			<div className="card">
				<h3 className="card-title">{moment(newDate).format('dddd')}</h3>
				<p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
				<i className={icon}></i>
				<h2>{degreeType === "celsius" ? `${celsius} ℃` : `${fahrenheit} ℉`}</h2>
				<div className="card-body">
					<p className="card-text">{desc}</p>
				</div>
			</div>
		</div>
	)
};

export default DayCard;