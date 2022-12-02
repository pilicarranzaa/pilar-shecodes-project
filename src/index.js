

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

let day1 = new Date();

function getDay(now) {
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

getDay(day1);


function getNextDay(day, id) {
  day.setDate(day.getDate()+1);
  let date = day.getDate();
  let month = months[day.getMonth()];

  let fullDate = document.querySelector(id);
  fullDate.innerHTML=`${date}/${month}`;
  return day;
};

let day2 = getNextDay(day1, "#day2");
let day3 = getNextDay(day2, "#day3");
let day4 = getNextDay(day3, "#day4");
let day5 = getNextDay(day4, "#day5");
let day6 = getNextDay(day5, "#day6");

//-----------------------------------------

addEventListener("load", searchCurrentCity);

let findCity = document.querySelector("#searchCity");
findCity.addEventListener("submit", searchCity);

function searchCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  fetchCity(cityInput.value);
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

}

//-----------------------------------

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
}


//----------------------------------

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
