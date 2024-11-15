var searchInput = document.querySelector('#searchInput')
var searchBtn = document.querySelector('#searchBtn')
searchInput.addEventListener("input", function(){
    weather(this.value)
})

allCitys = []

async function weather(city){
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=65a4cfa2dd334abdab190942241510&q=${city}&days=3`)
    allCitys = await response.json()
    displayCity(allCitys)
}

weather('cairo')

var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function displayCity(allCitys){
    var date = new Date()
    var month = date.getMonth();
    var day = date.getDay()
    var weather = `
    <div class="card today">
        <div class="card-header d-flex justify-content-between pb-0">
        <p>${days[day++]}</p>
        <p>${date.getDate() + monthNames[month++]}</p>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
        <p class="city">${allCitys.location.name}</p>
        <p  class="degree">${allCitys.current.temp_c}<sup>o</sup>C</p>
        <img src="https:${allCitys.current.condition.icon}" class="w-25" alt="cloud">
        <span>${allCitys.current.condition.text}</span>
        <div class="details pt-3">
            <span class="pe-3">
                <img src="images/icon-umberella.png" alt="umberella"> ${allCitys.current.feelslike_c}%
            </span>
            <span class="pe-3">
                <img src="images/icon-wind.png" alt="wind"> ${allCitys.current.wind_kph}km/h
            </span>
            <span class="pe-3">
                <img src="images/icon-compass.png" alt="compass"> ${allCitys.current.wind_dir}
            </span>
        </div>
        </div>
    </div>
    <div class="card tomorrow text-center">
        <div class="card-header pb-0">
        <p>${days[day++]}</p>
        </div>
        <div class="card-body">
        <img src="http:${allCitys.forecast.forecastday[1].day.condition.icon}" class="py-4" alt="sun">
            <p class="mb-0 degree">${allCitys.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
            <p>${allCitys.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
        <span>${allCitys.forecast.forecastday[1].day.condition.text}</span>
        </div>
    </div>
    <div class="card after-tomorrow text-center">
        <div class="card-header pb-0">
            <p>${days[day++]}</p>
        </div>
        <div class="card-body">
            <img src="http:${allCitys.forecast.forecastday[2].day.condition.icon}" class="py-4" alt="sun">
            <p class="mb-0 degree">${allCitys.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
            <p>${allCitys.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
            <span>${allCitys.forecast.forecastday[2].day.condition.text}</span>
        </div>
    </div>
`
    document.getElementById('weatherNews').innerHTML = weather
}


navigator.geolocation.getCurrentPosition(position => {
    liveLocation = `${position.coords.latitude}, ${position.coords.longitude}`
    weather(liveLocation) 
})