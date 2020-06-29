//api key
const API_KEY = '21582a8ed2d42291639912bd90ae6204';
const input = document.querySelector("#search");

//handling input event and fetching data
const handleChange = e => {
    const inputValue = e.target.value;
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => console.log(data))
}

//input change event
input.addEventListener('change', handleChange);