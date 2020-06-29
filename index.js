//import api key
import {API_KEY} from './config.js';
//search input
import {input, location, country, temperature, humidity} from './util.js';

//handling input event and fetching data
const handleChange = e => {
    e.preventDefault();
    const inputValue = e.target.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            location.textContent = data.name;
           // country.textContent = data.sys.country;
            //temperature.textContent = data.;
        })
}

//input change event
input.addEventListener('change', handleChange);
