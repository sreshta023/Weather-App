let currentLocation = "";

async function getWeather() {

    currentLocation = document.getElementById("location").value;

    if (!currentLocation) {
        alert("Please enter a location");
        return;
    }

    const apiKey = "5AWAM5MUQHENHUL8KHHCYBNAC";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentLocation}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        const current = data.currentConditions;

        document.getElementById("temp").textContent = current.temp;
        document.getElementById("wind").textContent = current.windspeed;
        document.getElementById("rain").textContent = current.precipprob || 0;
        document.getElementById("condition").textContent = current.conditions;

        document.getElementById("weatherInfo").classList.remove("d-none");

        displayForecast(data.days[0].hours);

    } catch (error) {
        alert("Unable to fetch weather data");
        console.error(error);
    }
}

function displayForecast(hours) {

    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";

    hours.slice(0, 24).forEach(hour => {

        forecastContainer.innerHTML += `
            <div class="card forecast-card">
                <div class="card-body">
                    <h6>${hour.datetime}</h6>
                    <p>${hour.temp}°C</p>
                    <small>${hour.conditions}</small>
                </div>
            </div>
        `;
    });
}

function refreshWeather() {

    if (currentLocation) {
        getWeather();
    } else {
        alert("Search for a location first");
    }
}