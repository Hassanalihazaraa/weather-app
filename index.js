//import api key
import {API_KEY, API_KEY_UNSPLASH} from './config.js';
//import variables
import {
    input,
    location,
    temperature,
    humidity,
    weatherDescription,
    displayWeather,
    timeZone,
    iconImage,
    temperature2,
    temperature3,
    temperature4,
    temperature5,
    description2,
    description3,
    description4,
    description5,
    icon2,
    icon3,
    icon4,
    icon5,
    day2,
    day3,
    day4,
    day5
} from './var.js';

//handling input event and fetching data
const handleChange = async e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const inputValue = e.target.value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        displayWeather.style = "visibility: visible";
        location.textContent = data.name + ', ' + data.sys.country;
        temperature.textContent = Math.floor(data.main.temp) + ' °C';
        humidity.textContent = 'Humidity ' + data.main.humidity + '%';
        const dateTime = new Date(data.sys.sunrise * 1000).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long'
        });
        timeZone.textContent = dateTime;
        weatherDescription.textContent = data.weather[0].description;
        iconImage.textContent = icons(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        //forecast 4 days
        forecast(e);
        //change background image
        backgroundImage(inputValue);
    }
}
//icons
const icons = iconSrc => {
    iconImage.setAttribute("src", iconSrc);
}

//calculate average temp
const averageTemp = arr => {
    return Math.floor(arr.reduce((a, b) => a + b, 0) / arr.length);
}


//forecast for next 4 days
const forecast = async e => {
    e.preventDefault();
    const targetValue = e.target.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${targetValue}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const lists = data.list;
    //get temperature, description and icons
    let temperature = [];
    let description = [];
    let icons = [];
    lists.forEach(list => {
        temperature.push(list.main.temp);
        description.push(list.weather[0].description);
        icons.push(list.weather[0].icon);
    });
    //compare description
    let counts = {};
    let compare = 0;
    let mostFrequent;
    const frequency = array => {
        for (let i = 0, len = array.length; i < len; i++) {
            let word = array[i];

            if (counts[word] === undefined) {
                counts[word] = 1;
            } else {
                counts[word] = counts[word] + 1;
            }
            if (counts[word] > compare) {
                compare = counts[word];
                mostFrequent = array[i];
            }
        }
        return mostFrequent;
    }
    //display day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    //The code is repetitive i know but it works for now, will change in the future if i found better and shorter solution
    if (date.getDay() === 0) {
        day2.textContent = dayNames[date.getDay() + 1];
        day3.textContent = dayNames[date.getDay() + 2];
        day4.textContent = dayNames[date.getDay() + 3];
        day5.textContent = dayNames[date.getDay() + 4];
    } else if (date.getDay() === 1) {
        day2.textContent = dayNames[date.getDay() + 1];
        day3.textContent = dayNames[date.getDay() + 2];
        day4.textContent = dayNames[date.getDay() + 3];
        day5.textContent = dayNames[date.getDay() + 4];
    } else if (date.getDay() === 2) {
        day2.textContent = dayNames[date.getDay() + 1];
        day3.textContent = dayNames[date.getDay() + 2];
        day4.textContent = dayNames[date.getDay() + 3];
        day5.textContent = dayNames[date.getDay() + 4];
    } else if (date.getDay() === 3) {
        day2.textContent = dayNames[date.getDay() + 1];
        day3.textContent = dayNames[date.getDay() + 2];
        day4.textContent = dayNames[date.getDay() + 3];
        day5.textContent = dayNames[date.getDay() - 3];
    } else if (date.getDay() === 4) {
        day2.textContent = dayNames[date.getDay() + 1];
        day3.textContent = dayNames[date.getDay() + 2];
        day4.textContent = dayNames[date.getDay() - 4];
        day5.textContent = dayNames[date.getDay() - 3];
    } else if (date.getDay() === 5) {
        day2.textContent = dayNames[date.getDay() + 1];
        day3.textContent = dayNames[date.getDay() - 4];
        day4.textContent = dayNames[date.getDay() - 3];
        day5.textContent = dayNames[date.getDay() - 2];
    } else if (date.getDay() === 6) {
        day2.textContent = dayNames[date.getDay() - 6];
        day3.textContent = dayNames[date.getDay() - 5];
        day4.textContent = dayNames[date.getDay() - 4];
        day5.textContent = dayNames[date.getDay() - 2];
    }

    //display temperature
    temperature2.textContent = averageTemp(temperature.slice(8, 16)) + ' °C';
    temperature3.textContent = averageTemp(temperature.slice(16, 24)) + ' °C';
    temperature4.textContent = averageTemp(temperature.slice(24, 32)) + ' °C';
    temperature5.textContent = averageTemp(temperature.slice(32, 40)) + ' °C';
    //display description
    description2.textContent = frequency(description.slice(8, 16));
    description3.textContent = frequency(description.slice(16, 24));
    description4.textContent = frequency(description.slice(24, 32));
    description5.textContent = frequency(description.slice(32, 40));
    //display icons
    icon2.src = `http://openweathermap.org/img/wn/${icons.slice(8, 16)[0]}@2x.png`;
    icon3.src = `http://openweathermap.org/img/wn/${icons.slice(16, 24)[0]}@2x.png`;
    icon4.src = `http://openweathermap.org/img/wn/${icons.slice(24, 32)[0]}@2x.png`;
    icon5.src = `http://openweathermap.org/img/wn/${icons.slice(32, 40)[0]}@2x.png`;
}
//change background image correspond to the city
const backgroundImage = async (inputValue) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${inputValue}&client_id=pYY8ppRJJQW-HHxtIZ0xW5Fhlm7W8ARR9G_6i_zWmLE`);
    const data = await response.json();
    const picture = data.results[1].urls.raw + "&w=1920&dpr";
    const weatherPic = data.results[4].urls.small + "&w=650&dpr";
    document.querySelector(".body").style.backgroundImage = `url(${picture})`;
    document.querySelector(".display-weather").style.backgroundImage = `url(${weatherPic})`;
}

//input change event
input.addEventListener('keydown', handleChange);

