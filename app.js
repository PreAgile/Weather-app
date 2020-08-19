let temperature = document.querySelector("#temperature-degree");
let timeZone = document.querySelector("#location-timezone");
let description = document.querySelector("#temperature-description");
let currentCelsius = 0;

function init() {
  window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(position);

        let apiKey = `99c01984fab92f0987676a4a568b844b`;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            console.log(data.main.temp);
            currentCelsius = Math.floor(data.main.temp - 273.15);
            currentTemp(currentCelsius);
            currentTimeZone(data.sys.country, data.name);
            currentStatus(data.weather[0].description);
            setSkyCon();
          });
      });
    }
  });
}

function currentTemp(temp) {
  temperature.textContent = temp;
}

function currentTimeZone(country, name) {
  timeZone.textContent = `${country}/${name}`;
}

function currentStatus(status) {
  description.textContent = `${status}`;
}

function setSkyCon() {
  // let firstId = weatherId.slice(0,1);
  let skycons = new Skycons({ color: "white" });
  let weatherCondition = "";
  // switch(firstId) {
  //   case 2:
  //     case 3:
  //       case 5:
  //     weatherCondition = Skycons.RAIN;
  //   break;
  //   case 6:
  //     weatherCondition = Skycons.SNOW;
  // }
  skycons.set("icon1", Skycons.WIND);
  skycons.play();
}

init();
