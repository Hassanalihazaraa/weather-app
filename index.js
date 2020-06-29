//import api key
import {API_KEY} from './config.js';
//search input
import {input, location, temperature, humidity, icon, displayWeather} from './util.js';

//handling input event and fetching data
const handleChange = e => {

    const inputValue = e.target.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayWeather.style.visibility = "visible";
            location.textContent = data.name + ', ' + data.sys.country;
            temperature.textContent = 'Temperature ' + Math.floor(data.main.temp) + ' C';
            humidity.textContent = 'Humidity ' + data.main.humidity + '%';

        })
    e.preventDefault();
}

//icons
const icons = (icon, iconID) => {
    const skycons = new Skycons();
    const weatherIcon = icon.replace(/-/g, "_")
}

//input change event
input.addEventListener('change', handleChange);
