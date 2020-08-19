let temperature = document.querySelector("#temperature-degree");
let timeZone = document.querySelector('#location-timezone');
let description = document.querySelector('#temperature-description');
let currentCelsius = 0;
let skycons = new Skycons({"color": "white"});
skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
skycons.play();


window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position);

      let apiKey = `99c01984fab92f0987676a4a568b844b`;
      // let cityName = 'London,uk';
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.main.temp);
          currentCelsius = data.main.temp - 273.15;
          currentTemp(currentCelsius);
          currentTimeZone(data.sys.country,data.name);
          currentStatus(data.weather[0].description);
        });
    });
  }
});


function currentTemp(temp) {
  temperature.textContent = temp;
};

function currentTimeZone(country, name) {
  timeZone.textContent = `${country}/${name}`;
}

function currentStatus(status) {
  description.textContent = `${status}`;
}

