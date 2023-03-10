const xAxisLength = 30;

// see https://www.chartjs.org/docs/latest/configuration/
export default () => ({
	options: {
		plugins: {
			legend: { display: false }
		},
		scales: {
			y: {
				min: 0,
				max: 1
			}
		}
	},
	// see https://www.chartjs.org/docs/latest/general/data-structures.html
	data: {
		labels: new Array(xAxisLength).fill(''),
		datasets: [
			{
				label: '',
				data: [],

				lineTension: 0.3,
				backgroundColor: 'rgba(225, 204, 230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(205, 130, 158)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 5,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10
			}
		]
	}
});
