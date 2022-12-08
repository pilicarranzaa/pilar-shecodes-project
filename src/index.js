// function to make background gif change according to the weather

function changeBg(mainDescription, pod){
  if((mainDescription == "Thunderstorm" || mainDescription == "Drizzle" || mainDescription == "Rain") && pod == "d"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `dRain`);
  };

  if(mainDescription == "Clear" && pod == "d"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `dClear`);
  };
  
  if(mainDescription == "Snow" && pod == "d"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `dSnow`);
  };

  if(mainDescription == "Clouds" && pod == "d"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `dCloud`);
  };

  if((mainDescription == "Fog" || mainDescription == "Mist" || mainDescription == "Smoke" || mainDescription == "Haze" || mainDescription == "Dust" || mainDescription == "Sand" || mainDescription == "Ash" || mainDescription == "Squall" || mainDescription == "Tornado") && (pod == "d" || pod == "n")){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `foggy`);
  };

   if((mainDescription == "Thunderstorm" || mainDescription == "Drizzle" || mainDescription == "Rain") && pod == "n"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `nRain`);
  };

  if(mainDescription == "Clear" && pod == "n"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `nClear`);
  };
  
  if(mainDescription == "Snow" && pod == "n"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `nSnow`);
  };

  if(mainDescription == "Clouds" && pod == "n"){
    let bg = document.querySelector(".body");
    bg.removeAttribute("class");
    bg.classList.add(`container`, `body`, `py-3`, `nCloud`);
  };
}

// getting days

let days = [
  `SUN`,
  `MON`,
  `TUE`,
  `WED`,
  `THU`,
  `FRI`,
  `SAT`
];

let months = [
  `01`,
  `02`,
  `03`,
  `04`,
  `05`,
  `06`,
  `07`,
  `08`,
  `09`,
  `10`,
  `11`,
  `12`
];

let currentDay = new Date();

function getCurrentDay(now) {
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear().toString().slice(-2);

  let hours = (now.getHours());
  let minutes = (now.getMinutes());

  let fullDate = document.querySelector("#fullDate");
  fullDate.innerHTML=`${day} ${date}/${month}/${year}`;

  let hour = document.querySelector("#currentHour");
  hour.innerHTML = `${hours}:${minutes} hs`;
  
};

getCurrentDay(currentDay);


function getNextDay(day, id) {
  day.setDate(day.getDate()+1);
  let date = day.getDate();
  let month = months[day.getMonth()];

  let fullDate = document.querySelector(id);
  fullDate.innerHTML=`${date}/${month}`;
  return day;
};

let day1 = getNextDay(currentDay, "#day1");
let day2 = getNextDay(day1, "#day2");
let day3 = getNextDay(day2, "#day3");
let day4 = getNextDay(day3, "#day4");
let day5 = getNextDay(day4, "#day5");

// function to get the current city and the weather

addEventListener("load", searchCurrentCity);

let findCity = document.querySelector("#searchCity");
findCity.addEventListener("submit", searchCity);

function searchCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  fetchCity(cityInput.value);

  cityInput.value = '';
}

function fetchCity(city){
 return axios.get(getAPI(city)).then(showCity);
}

const getAPI = function (city) { 
  const apiKey ="6354de4535fcb6d2655dc8e4b8d58339";
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}

function showCity(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let count = response.data.sys.country;
  let description = response.data.weather[0].description;
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let mainDescription = response.data.weather[0].main;
  let icon = response.data.weather[0].icon;
  let pod = icon[icon.length - 1];

  changeBg(mainDescription, pod);


  let city = document.querySelector("#city");
  city.innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

  let country = document.querySelector("#country");
  country.innerHTML = count;

  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = temp;

  let tempDescription = document.querySelector("#description");
  tempDescription.innerHTML = description.charAt(0).toUpperCase() + description	.slice(1).toLowerCase();

  let maxT = document.querySelector("#maxT");
  maxT.innerHTML = tempMax;

  let minT = document.querySelector("#minT");
  minT.innerHTML = tempMin;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humid;

  let windy = document.querySelector("#wind");
  windy.innerHTML = wind;

  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute("src", 
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", description); 

  getForecast(response.data.coord);
}

//function to get the searched city and its weather

let findButton = document.querySelector("#find");
findButton.addEventListener("click", searchCurrentCity);

function searchCurrentCity(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6354de4535fcb6d2655dc8e4b8d58339";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let cityName = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let count = response.data.sys.country;
  let description = response.data.weather[0].description;
  let humid = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let mainDescription = response.data.weather[0].main;
  let icon = response.data.weather[0].icon;
  let pod = icon[icon.length - 1];

  changeBg(mainDescription, pod);


  let city = document.querySelector("#city");
  city.innerHTML = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

  let country = document.querySelector("#country");
  country.innerHTML = count;

  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = temp;

  let tempDescription = document.querySelector("#description");
  tempDescription.innerHTML = description.charAt(0).toUpperCase() + description	.slice(1).toLowerCase();

  let maxT = document.querySelector("#maxT");
  maxT.innerHTML = tempMax;

  let minT = document.querySelector("#minT");
  minT.innerHTML = tempMin;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humid;

  let windy = document.querySelector("#wind");
  windy.innerHTML = wind;

   let iconElement = document.querySelector(".icon");
  iconElement.setAttribute("src", 
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", description); 

  getForecast(response.data.coord);
}


//function to convert farenheit and celsius

let isCelsius = true;

function convertToCelsius(event){
  if(!isCelsius){
    let temps = document.querySelectorAll(".temperature");
     temps.forEach(function(temp){
      let tempC = Math.round(toCelsius(temp.textContent));
      temp.innerHTML = tempC;
      isCelsius = true;
    });
    
  };
}

function convertToFarenheit(event){
  if(isCelsius){
    let temps = document.querySelectorAll(".temperature");
     temps.forEach(function(temp){
      let tempF = Math.round(toFarenheit(temp.textContent));
      temp.innerHTML = tempF;
      isCelsius = false;
    });
  };
}

function toCelsius(farenheit){
  return (farenheit - 32)*5/9;
}
function toFarenheit(celsius){
  return celsius * 9/5 + 32;
}

let tempC = document.querySelector(".celsius");
tempC.addEventListener("click", convertToCelsius);

let tempF = document.querySelector(".farenheit");
tempF.addEventListener("click", convertToFarenheit);

// function to get the forecast for the next days

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}


function displayForecast (response) {
  let [currentDay, ...forecast] = response.data.daily;

  forecast.forEach(function({ temp, weather }, index){ 
    const dayIndex = index + 1;
    let min = document.querySelector(`#min${dayIndex}`);
    min.innerHTML=Math.round(temp.min);

    let max = document.querySelector(`#max${dayIndex}`);
    max.innerHTML=Math.round(temp.max);

    let icon = document.querySelector(`#icon${dayIndex}`);
    icon.setAttribute("src", 
    `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
    icon.setAttribute("alt", weather[0].description); 
  })
}




