function getWeather() {
    const apiKey = '6600aad5346e7fcb8e4b29ab142139fe';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey};
    const forecastUrl = https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey};

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const humidityDiv = document.getElementById('humidity-div');
    const windDiv = document.getElementById('wind-div');
    const humiditySpan = document.getElementById('humidity');
    const windSpeedSpan = document.getElementById('wind-speed');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    humidityDiv.style.display = 'none';
    windDiv.style.display = 'none'; 

    if (data.code === '404') {
        weatherInfoDiv.innerHTML = <p>${data.message}</p>;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); 
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = https://openweathermap.org/img/wn/${iconCode}@4x.png;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        const humidity = data.main.humidity; // Humidity
        const windSpeed = Math.round(data.wind.speed * 3.6); 
        humiditySpan.innerHTML = Humidity: ${humidity}%;
        windSpeedSpan.innerHTML = Wind Speed: ${windSpeed} km/h;
        
        humidityDiv.style.display = 'flex'; 
        windDiv.style.display = 'flex'; 

        setWeatherBackground(description);

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); 

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); 
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); 
        const iconCode = item.weather[0].icon;
        const iconUrl = https://openweathermap.org/img/wn/${iconCode}.png;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}

function setWeatherBackground(description) {
    const body = document.body;

    let backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTZVQs7Uxz4mg5EXBM_zZZEwbRkpVeWrY5cQ&s")';

    if (description.includes('clear')) {
        backgroundImage = 'url("https://wallpaperaccess.com/full/3265131.jpg")'; 
    } else if (description.includes('clouds')) {
        backgroundImage = 'url("https://wallpaperaccess.com/full/1462185.jpg")'; 
    } else if (description.includes('rain') || description.includes('drizzle')) {
        backgroundImage = 'url("https://static.vecteezy.com/system/resources/previews/029/771/758/large_2x/epicgraphy-shot-of-rainy-season-background-enjoying-nature-rainfall-and-happy-life-concept-generative-ai-free-photo.jpeg")'; // Rainy background
    } else if (description.includes('thunderstorm')) {
        backgroundImage = 'url("https://cdn.wallpapersafari.com/1/87/HqR9ca.jpg")'; 
    } else if (description.includes('snow')) {
        backgroundImage = 'url("https://images.wallpapersden.com/image/download/forest-house-covered-in-snow-4k_bGdnaGuUmZqaraWkpJRpZW5qrWdoZWg.jpg")'; 
    } else if (description.includes('mist') || description.includes('fog')) {
        backgroundImage = 'url("https://magazine.vab.be/wp-content/uploads/2017/04/mist.jpg")'; 
    }

    body.style.backgroundImage = backgroundImage;
    body.style.transition = 'background-image 0.5s ease-in-out'; 
}