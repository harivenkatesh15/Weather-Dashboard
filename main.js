let change = document.getElementById("changeLayout");
const arr = ["url(pexels-eberhardgross-1287142.jpg)","url(pexels-enginakyurt-1571730.jpg)","linear-gradient(to right, rgba(0,71,171,1) 0%, rgba(28,169,201,1) 100%)"
]
let bodyy = document.getElementById("ch")
let locationn = document.getElementById("locbtn")
let i = 1;
change.addEventListener('click',()=>{
  
  bodyy.style.background = arr[i];
  i++;
  if(i==arr.length)
    i = 0;


})

let cityInput = document.getElementById('city_input'),
searchbtn = document.getElementById('searchbtn'),
api_key = "33ab3eeda5ee12baa2e76e4eae024235";
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];
fiveDaysForecastCard = document.querySelector('.day-forecast');
aqCard = document.querySelectorAll('.highlights .card')[0];
sunriseCard = document.querySelectorAll('.highlights .card')[1];
aqList = ['Good','Fair','Moderate','Poor','Very Poor'];
humidityVal = document.getElementById('humidityVal')
pressureVal = document.getElementById('pressureVal')
visibilityVal = document.getElementById('visibilityVal')
windspeedVal = document.getElementById('windspeedVal')
feelsVal = document.getElementById('feelsVal')
function getWeatherDetails(name, lat, lon, country, state){
    let FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLLUTION_API = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months = [
        'Jan',
        'Feb',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Nov',
        'Dec'
    ];
    fetch(AIR_POLLUTION_API).then(res => res.json()).then(data =>{
        console.log(data)
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        console.log(co);
        console.log(aqCard);
        aqCard.innerHTML = `
        <div class="card-head">
              <p>Air Quality Index</p>
              <p class="air aq-${data.list[0].main.aqi}">${aqList[data.list[0].main.aqi - 1]}</p>
            </div>
            <div class="air-indices">
              <i class="fa-solid fa-wind fa-2x"></i>
              <div class="item">
                <p>PM2.5</p>
                <h2>${pm2_5}</h2>
              </div>
              <div class="item">
                <p>PM10</p>
                <h2>${pm10}</h2>
              </div>
              <div class="item">
                <p>SO2</p>
                <h2>${so2}</h2>
              </div>
              <div class="item">
                <p>CO</p>
                <h2>${co}</h2>
              </div>
              <div class="item">
                <p>NO</p>
                <h2>${no}</h2>
              </div>
              <div class="item">
                <p>NO2</p>
                <h2>${no2}</h2>
              </div>
              <div class="item">
                <p>NH3</p>
                <h2>${nh3}</h2>
              </div>
              <div class="item">
                <p>O3</p>
                <h2>${o3}</h2>
              </div>
            </div>
        `
    }).catch(()=>{
        alert('Failed to fetch current weather')
    });

    const arrimg = ["clear","clouds","drizzle","humidity","mist","rain","snow","wind"];
    let imgg = arrimg[1];
    fetch(WEATHER_API).then(res => res.json()).then(data => {
        let date = new Date();
        

        if(arrimg.includes((data.weather[0].main).toLowerCase()))
          imgg = (data.weather[0].main).toLowerCase();
        currentWeatherCard.innerHTML = `
        <div class="current-weather">
            <div class="details">
              <p>Now</p>
              <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
              <p>${data.weather[0].description}</p>
            </div>
            <div class="weather-icon">
              <img src="images/${imgg}.png" alt="" />
            </div>
          </div>
          <hr />
          <div class="card-footer">
            <p><i class="fa-regular fa-calendar-days"></i>${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
            <p><i class="fa-solid fa-location-dot"></i>${name}, ${country}</p>
          </div>
        `;
        console.log(data.sys)
        let {sunrise, sunset} = data.sys,
        {timezone} = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind;
        console.log(speed);
        sunrise= sunrise * 1000;
        sunset= sunset * 1000;
        sRiseTime= moment.utc(sunrise,'x').add(timezone,'seconds').format('hh:mm A'),
        sSetTime = moment.utc(sunset,'x').add(timezone,'seconds').format('hh:mm A');
        console.log(sunrise);
        console.log(sunset);

        sunriseCard.innerHTML = `
       <div class="card-head" style="display: flex; justify-content: center;">
              <h3 style="color: white;">Sunrise & Sunset</h3>
            </div>
            <div class="sunrise-sunset" style="margin-top: 50px; display: flex;
            flex-direction: row;
            justify-content: space-around;">
              <div class="item">
                <div class="icon">
                  <img src="images/clear.png" alt="">
                </div>
                <div>
                  <p>Sunrise</p>
                  <h2>${sRiseTime}</h2>
                </div>
              </div>
              <div class="item">
                <div class="icon">
                  <img src="images/clear.png" alt="">
                </div>
                <div>
                  <p>Sunset</p>
                  <h2>${sSetTime}</h2>
                </div>
              </div>
            </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        windspeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`
    }).catch(()=>{
        visibilityVal.innerHTML = `${visibility / 1000}km`;
      
        
        alert('Failed to fetch current weather')
    });
    fetch(FORECAST_API).then(res => res.json()).then(data => {
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for(i = 1;i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML+=`
            <div class="forecast-item">
              <div class="icon-wrapper">
                <img src="images/clouds.png" alt="" />
                <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
              </div>
              <p>${date.getDate()} ${months[date.getMonth()]}</p>
              <p>${days[date.getDay()]}</p>
            </div>
            `
        }
    }).catch(()=>{
        alert('Failed to fetch current weather')
    });

}




function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName) return;
    let GEOCODING_API = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    
    fetch(GEOCODING_API).then(res => res.json()).then(data => {
        let {name, lat, lon, country,state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(()=>{
        alert(`Failed to fetch coordinates of ${cityName}`)
    })
    // console.log(cityName);
}
function getUserCoordinates(){
  navigator.geolocation.getCurrentPosition(position =>{
    let {latitude,longitude} = position.coords;
    let REVERSE_GEOCODING = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`

    fetch(REVERSE_GEOCODING).then(res =>res.json()).then(data => {
        console.log(data);
        let {name,country,state} = data[0];
        getWeatherDetails(name,latitude,longitude,country,state);
    }).catch(()=>
    {
      alert('failed to fetch')
    })
  })
}
searchbtn.addEventListener('click',getCityCoordinates);
locationn.addEventListener('click',getUserCoordinates)