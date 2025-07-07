const apiKey = "2848f42da81f4c4ab0b133233250707";

const getWeatherBtn = document.getElementById("getWeather");
const cityDisplay = document.getElementById("city");
const tempDisplay = document.getElementById("temp");
const conditionDisplay = document.getElementById("condition");
const iconDisplay = document.getElementById("icon");
const errorDisplay = document.getElementById("error");


getWeatherBtn.addEventListener("click", () => {

    cityDisplay.textContent = "Loading...";
    tempDisplay.textContent = "";
    conditionDisplay.textContent = "";
    iconDisplay.style.display = "none";
    errorDisplay.textContent = "";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
    
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
            fetch(weatherApiUrl)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Weather data fetch failed");
                }
                return response.json();
              })
              .then((data) => {
                const { name } = data;
                const temperature = data.main.temp;
                const weatherMain = data.weather[0].main;
                const weatherIcon = data.weather[0].icon;
    
                cityDisplay.textContent = `📍 ${name}`;
                tempDisplay.textContent = `🌡 ${temperature}°C`;
                conditionDisplay.textContent = `🌥 ${weatherMain}`;
    
                iconDisplay.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                iconDisplay.style.display = "block";
              })
              .catch((err) => {
                console.error("Error fetching weather:", err);
                errorDisplay.textContent = "Failed to retrieve weather information.";
              });
          },
          () => {
            errorDisplay.textContent = "Location access denied by the user.";
          }
        );
      } else {
        errorDisplay.textContent = "Geolocation is not supported by your browser.";
      }
    });