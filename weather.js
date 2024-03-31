const api_key = "0657fa9768b939fddc0182e766c83d5b"

//Data naming
const Display = {
   city: document.getElementById('name'),
   location:{
            longitude: document.getElementById('long'),
            latitude: document.getElementById('lat')
        },

   temperature: document.getElementById('temperature'),

   minorData:{
            cloudCover: document.getElementById('cloudCover'),
            pressure: document.getElementById('pressure'),
            Visibility: document.getElementById('visibility'),
            humidity: document.getElementById('humidity'),
        },
    windData:{
        speed: document.querySelector('.speed-d'),
        direction: document.querySelector('.degree-d'),
        gust: document.querySelector('.gust-d')
    },
    SunTime:{
        sunrise: document.querySelector('.sunrise-data'),
        sunset: document.querySelector('.sunset-data')
    },
    timezone: document.getElementById('timezone-data'),

    dateTime:{
        date: document.querySelector('.date-data'),
        time: document.querySelector('.time-data')
    },
    Weather:{
        main: document.getElementById('condition'),
        minor: document.getElementById('description'),
    } 
}


let url = `https://api.openweathermap.org/data/2.5/weather?q=Dar es salaam&appid=${api_key}`

const search = document.getElementById('search-button')

const InputValue = document.getElementById('input-value')

search.onclick = ()=>{
  CityName = InputValue.value

  url = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${api_key}`

  getWeather(url)
}

getWeather(url)

function getWeather(url){
    fetch(url).then(response => response.json()).then(data=>{
    Display.city.innerHTML = `${data.name}, ${data.sys.country}`;

    Display.location.longitude.innerHTML = `Longitude:${Math.round(data.coord.lon)}`
    Display.location.latitude.innerHTML = `Latitude:${Math.round(data.coord.lat)}`;

    Display.temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}&#8451`;

    Display.minorData.cloudCover.innerHTML= `${data.clouds.all} %`
    Display.minorData.pressure.innerHTML = `${data.main.pressure} Pa`;
    Display.minorData.humidity.innerHTML = `  ${data.main.humidity} Pa`;
    Display.minorData.Visibility.innerHTML = `${(data.visibility/1000)} Km`;
    
    Display.windData.speed.innerHTML = `${data.wind.speed} m/s`;
    Display.windData.direction.innerHTML =`  ${data.wind.deg}&deg`;
    Display.windData.gust.innerHTML = `${data.wind.gust} m/s`;
    
    Display.SunTime.sunrise.innerHTML = ConvertSunTime(data.sys.sunrise);
    Display.SunTime.sunset.innerHTML = ConvertSunTime(data.sys.sunset);

    Display.timezone.innerHTML = ConvertTimezone(data.timezone);

    Display.dateTime.date.innerHTML = ParseDateTime(data.dt).date;
    Display.dateTime.time.innerHTML = ParseDateTime(data.dt).time;

    Display.Weather.main.innerHTML = `Mainly: ${data.weather[0].main}`;
    Display.Weather.minor.innerHTML = `Description: ${data.weather[0].description}`;

    }).catch(error =>{
      alert(`No results found for ${InputValue.value}`);
      console.error("Error fetching Weather",error)
    })
}

function ConvertSunTime(timeStamp){
    var sunTimeMili = new Date(timeStamp * 1000);
    var sunTime = sunTimeMili.toLocaleTimeString('en-US', {hours: '2-digits', minutes: '2-digits'});
    return sunTime;
}


function ConvertTimezone(timezone){
    var zoneHour = (Math.abs(timezone)/3600)
    var zoneMinute = (Math.abs(timezone) % 3600)/60

    var timezoneSign = timezone > 0 ? '+' : '-';
    
    var formatedTime = timezoneSign + ( '0' + zoneHour).slice(-2) +':'+ ('0' + zoneMinute).slice(-2);

    return formatedTime;
}

function ParseDateTime(dt){
    var dateTime = new Date(dt*1000);
    var DateTime = {
        date: dateTime.toLocaleDateString('en-US'),
        time: dateTime.toLocaleTimeString('en-US')
    }
    return DateTime;
}
