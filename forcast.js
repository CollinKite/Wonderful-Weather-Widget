const textbox = document.getElementById('city');
const btn = document.getElementById('btn');
const api = '8a4d428a46de5646fbc81a06a5bed0d1';
const sevenday = document.getElementById('7dayWeather')
let country = 'US';
const today = document.getElementById('today');

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
    <h2 class="today">This Weeks Forcast in ${city}</h2>
    <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">
    <h2>Today</h2>
    <p>
    Temp: ${data.current.temp} &deg F <br />
    Weather: ${data.current.weather[0].description}
    </p>
    `;
    today.innerHTML= now;

    let date = new Date();

    let otherDays = '';
    for(let i=1; i<=6; i++) {
        the_day = new Date(date.setDate(date.getDate() + 1));
        otherDays += `
        <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">
        <h2>${the_day.getMonth()+1}/${the_day.getDate()}</h2>
        <p>
        Temp: ${data.daily[i].temp.day} &deg F
        </p>
        `;
    }
    sevenday.innerHTML = otherDays;

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

