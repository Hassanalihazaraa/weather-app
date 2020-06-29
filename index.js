//import api key
import {API_KEY} from './config.js';
//search input
import {input, location, temperature, humidity} from './util.js';

//handling input event and fetching data
const handleChange = e => {
    e.preventDefault();
    const inputValue = e.target.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            location.textContent = data.name + ', ' + data.sys.country;
            temperature.textContent = Math.floor(data.main.temp) + ' C';
            humidity.textContent = data.main.humidity + '%';
        })
}

//input change event
input.addEventListener('change', handleChange);
