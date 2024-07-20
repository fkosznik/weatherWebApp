const input = document.getElementById("input");
const jsonDescription = document.getElementById("description");
const jsonTemp = document.getElementById("temp");
const jsonIcon = document.getElementById("icon");
const wrong = document.getElementById("error");
const jsonMin = document.getElementById("min");
const jsonMax = document.getElementById("max");
const jsonHumiduty = document.getElementById("humidity");
const jsonCloudy = document.getElementById("cloudy");
const jsonWindy = document.getElementById("windy");
const inputLocation = document.getElementById("location");


//get json from api and dsplay results
async function getData(place) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&include=current&key=FQP2G8FQV52GSV7WP8S8EECL9&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const weatherData = new WeatherData(json);
    const today = weatherData.days[1];
    // inputLocation.textContent=data.address

    jsonDescription.textContent = today.description;
     jsonMax.textContent = today.tempmax + "°C";
     jsonMin.textContent = today.tempmin+ "°C";
     jsonHumiduty.textContent = today.humidity+"%";
    jsonCloudy.textContent = today.cloudcover+ "%";
     jsonWindy.textContent = today.windspeed+"km/h";
    jsonTemp.textContent = today.temp + "°C";
    jsonIcon.src = `images/${today.icon}.png`;
    //console.log(jsonTemp)
    inputLocation.textContent=weatherData.resolvedAddress
    const weatherMain = today.icon;
    
    changeBackgroundImg(weatherMain);
  } catch (error) {
    if(error.message=="Response status: 400"){
    window.alert("Can't find this location, try different one.");
    console.error(error.message);
    }
    else{console.error(error.message);}
  }
}
function call() {
  getData(input.value);
  
}

class WeatherData {
  constructor(data) {
    this.queryCost = data.queryCost;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.resolvedAddress = data.resolvedAddress;
    this.address = data.address;
    this.timezone = data.timezone;
    this.tzoffset = data.tzoffset;
    this.days = data.days.map((day) => new Day(day));
  }
}

class Day {
  constructor(dayData) {
    this.datetime = dayData.datetime;
    this.datetimeEpoch = dayData.datetimeEpoch;
    this.tempmax = dayData.tempmax;
    this.tempmin = dayData.tempmin;
    this.temp = dayData.temp;
    this.feelslikemax = dayData.feelslikemax;
    this.feelslikemin = dayData.feelslikemin;
    this.feelslike = dayData.feelslike;
    this.dew = dayData.dew;
    this.humidity = dayData.humidity;
    this.precip = dayData.precip;
    this.precipprob = dayData.precipprob;
    this.precipcover = dayData.precipcover;
    this.preciptype = dayData.preciptype;
    this.snow = dayData.snow;
    this.snowdepth = dayData.snowdepth;
    this.windgust = dayData.windgust;
    this.windspeed = dayData.windspeed;
    this.winddir = dayData.winddir;
    this.pressure = dayData.pressure;
    this.cloudcover = dayData.cloudcover;
    this.visibility = dayData.visibility;
    this.solarradiation = dayData.solarradiation;
    this.solarenergy = dayData.solarenergy;
    this.uvindex = dayData.uvindex;
    this.severerisk = dayData.severerisk;
    this.sunrise = dayData.sunrise;
    this.sunriseEpoch = dayData.sunriseEpoch;
    this.sunset = dayData.sunset;
    this.sunsetEpoch = dayData.sunsetEpoch;
    this.moonphase = dayData.moonphase;
    this.conditions = dayData.conditions;
    this.description = dayData.description;
    this.icon = dayData.icon;
    this.stations = dayData.stations;
    this.source = dayData.source;
  }
}





//change bg depending on weather

function changeBackgroundImg(weatherMain) {
  switch (weatherMain) {

    case "partly-cloudy-day":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/partly-cloudy-day.jpg")`
      );
      break;
    case "clear-day":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/clear-day.jpg")`
      );
      break;
    case "clear-night":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/clear-night.jpg")`
      );
      break;
  
    case "cloudy":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/cloudy.jpg")`
      );
      break;
    case "wind":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/wind.jpg")`
      );
      break;
    case "partly-cloudy-night":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/partly-cloudy-night.jpg")`
      );
      break;
    case "rain":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/rain.jpg")`
      );
      break;
    case "snow":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/snow.jpg")`
      );
      break;
    case "showers-day":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/showers-day.jpg")`
      );
      break;
    case "showers-nigh":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/showers-nigh.jpg")`
      );
      break;
    case "thunder-rain":
      document.body.style.setProperty(
        "--background-image",
        `url("/bgImages/thunder-rain.jpg")`
      );
      break;
  
  }
}




//execute onclick by pressing enter
input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
 
    event.preventDefault();
    
    document.getElementById("myBtn").click();
  }
});

//load london weather when page loads

document.addEventListener("DOMContentLoaded", function() {
  getData("London");
});