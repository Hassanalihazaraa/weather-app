import {API_KEY} from "./config.js";
import {
    day2,
    day3,
    day4,
    day5,
    description2,
    description3,
    description4,
    description5,
    displayWeather,
    humidity,
    icon2,
    icon3,
    icon4,
    icon5,
    iconImage,
    location,
    temperature,
    temperature2,
    temperature3,
    temperature4,
    temperature5,
    timeZone,
    weatherDescription
} from "./var.js";

export const currentWeather = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
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
    displayWeather.style = "visibility: visible";
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
export const currentForecast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
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