const API_KEY = 'cc69120ba92e4f2ea4495935241512';
const API_URL = 'http://api.weatherapi.com/v1/forecast.json';

const inputField = document.querySelector('.inputtt');
const findButton = document.querySelector('.find-btn');
const cardsContainer = document.querySelector('.all-cards');

// Fetch Weather Data
async function fetchWeather(location) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&q=${location}&days=3&aqi=no`);
    if (!response.ok) throw new Error('Location not found');
    const data = await response.json();
    updateWeatherCards(data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
  }
}
function updateWeatherCards(data) {
  const forecast = data.forecast.forecastday;

  cardsContainer.innerHTML = '';
  forecast.forEach(day => {
    const card = document.createElement('div');
    card.className = 'card text-center mx-2';

    card.innerHTML = `
      <div class="card-header d-flex justify-content-between p-0">
        <p>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
        <p>${new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
      </div>
      <div class="card-body">
        <h5 class="card-title">${data.location.name}</h5>
        <p class="card-temp">${day.day.avgtemp_c}°C</p>
        <img src="https:${day.day.condition.icon}" alt="Weather icon">
        <p class="card-desc">${day.day.condition.text}</p>
        <div class="end-sec d-flex gap-3 justify-content-around">
          <div class="one">
            <img src="images/icon-umberella@2x.png" alt="">
            <p>${day.day.daily_chance_of_rain || 0}%</p>
          </div>
          <div class="two">
            <img src="images/icon-wind@2x.png" alt="">
            <p>${day.day.maxwind_kph} km/h</p>
          </div>
          <div class="three">
            <img src="images/icon-compass@2x.png" alt="">
            <p>${day.day.condition.text}</p>
          </div>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

inputField.addEventListener('input', debounce((event) => {
  const location = event.target.value.trim();
  if (location.length > 2) {
    fetchWeather(location);
  }
}, 500));
findButton.addEventListener('click', () => {
  const location = inputField.value.trim();
  if (location) {
    fetchWeather(location);
  }
});
