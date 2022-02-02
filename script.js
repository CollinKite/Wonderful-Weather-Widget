const textbox = document.getElementById('city');
const btn = document.getElementById('btn');
const today = document.getElementById('todaysWeather');
const api = '8a4d428a46de5646fbc81a06a5bed0d1';
const fiveday = document.getElementById('5dayWeather')
let country = 'US';

const loadSavedCityWeather = () => {
    let city = localStorage.getItem('city');
    if(city != null){
        getTodaysWeather(city);
    }
    else{
        console.log("No Cookies Found")
    }
}

const main = (data, city) => {
    console.log(data);
    let now = `
    <h2 class="today">Todays Weather in ${city}</h2>
    <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">
    <p>
    Temp: ${data.current.temp} &deg F <br />
    Weather: ${data.current.weather[0].description}
    </p>
    `;
    today.innerHTML= now;
};

function getTodaysWeather(a){
    let city = a;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api}&units=imperial`;
    fetch(url)
    .then(response => response.json())
    .then(fiveDay_threeHour_data => {
        let lon = fiveDay_threeHour_data.city.coord.lon;
        let lat = fiveDay_threeHour_data.city.coord.lat;
        let new_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api}`
        fetch(new_url)
            .then(response => response.json())
            .then(data => {
                main(data, city);
            });
    });
}

function onClick(){
    let city = textbox.value;
    localStorage.setItem('city', city);
    getTodaysWeather(city);
}


btn.addEventListener('click', onClick);

loadSavedCityWeather();

