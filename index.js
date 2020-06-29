//import api key
import {API_KEY} from './config.js';
//search input
import {input, location, temperature, humidity, icon, displayWeather} from './util.js';

//handling input event and fetching data
const handleChange = async e => {
    e.preventDefault();
    const inputValue = e.target.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    console.log(data);
    displayWeather.style.visibility = "visible";
    location.textContent = data.name + ', ' + data.sys.country;
    temperature.textContent = 'Temperature ' + Math.floor(data.main.temp) + ' C';
    humidity.textContent = 'Humidity ' + data.main.humidity + '%';
}

//icons
const icons = (icon, iconID) => {
    const skycons = new Skycons();
    const weatherIcon = icon.replace(/-/g, "_")
}

//input change event
input.addEventListener('change', handleChange);
