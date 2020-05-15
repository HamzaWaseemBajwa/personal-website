import React from 'react';
import '../owfont-master/css/owfont-regular.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Card } from 'react-bootstrap'
var moment = require('moment');


const DayCard = ({ reading, degreeType }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)

  const fahrenheit = Math.round(reading.main.temp)
  const celsius = Math.round((fahrenheit - 32) * 5/9)

  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`
  console.log(imgURL);
  return (

    <Card className="text-center" bg={'dark'} text={'white'} style={{ width: '12rem', marginRight:'1rem', marginBottom:'1rem'}}>
      <div className="shadow bg-dark rounded">
        <Card.Header>{moment(newDate).format('dddd, MMMM Do')}</Card.Header>
        <Card.Body>
          <i class={imgURL}></i>
          <h2>{degreeType === "celsius" ? celsius + "°C" : fahrenheit + "°F"}</h2>
          <p class="card-text">{reading.weather[0].description}</p>
        </Card.Body>
      </div>
    </Card>

  )
}

export default DayCard;