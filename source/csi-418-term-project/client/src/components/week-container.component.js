import React from 'react';
import DayCard from './day-card'
import { CardGroup } from 'react-bootstrap'

require('dotenv').config();

class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }

    updateForecastDegree = event => {
        this.setState({
            degreeType: event.target.value
        }, () => console.log(this.state))
    }

    componentDidMount = () => {
        var getIP = 'http://ip-api.com/json/';
        fetch(getIP)
            .then(location => location.json())
            .then(data => {
                document.getElementById('loc_head').innerHTML = data.city + ", " + data.region + ", " + data.country;
                var lat = data.lat;
                var lon = data.lon;
                const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
                fetch(weatherURL)
                    .then(res => res.json())
                    .then(weatherData => {
                        const dailyData = weatherData.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                        this.setState({
                            fullData: data.list,
                            dailyData: dailyData
                        }, () => console.log(this.state))
                    })

            })
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <CardGroup><DayCard reading={reading} key={index} /></CardGroup>)
    }

    render() {
        return (
            <div class="container">
                <h4 class="display-1 jumbotron">5-Day Forecast.</h4>
                <h5 id="loc_head" class="display-5 text-muted">Location</h5>

                <div class="row justify-content-center">

                    {this.formatDayCards()}

                </div>
            </div>
        )
    }
}

export default WeekContainer;