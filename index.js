const yek = "1afa61e06aed22d28b82ae69926139f2";

async function getWeatherForCity(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&APPID=${yek}`
  );
  const data = await response.json();
  return data;
}

function processData(data) {
  if (data.message) {
    throw data.message;
  }
  return {
    name: data.name,
    temp: data.main.temp - 273.15,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    winSpeed: data.wind.speed * 3.6,
  };
}

function draw(data) {
  document.querySelector('.name').textContent = data.name;
  document.querySelector('.temp').textContent = data.temp.toFixed(0);
  document.querySelector('.pressure').textContent = data.pressure.toFixed(0);
  document.querySelector('.humidity').textContent = data.humidity.toFixed(0);
  document.querySelector('.wind-speed').textContent = data.winSpeed.toFixed(0);
}

const dataContainer = document.querySelector('.data');
const errorContainer = document.querySelector('.error');
const loadingContainer = document.querySelector('.loading');

async function getAndDraw(city) {
  loadingContainer.style.display = 'block';
  errorContainer.style.display = 'none';
  dataContainer.style.display = 'none';
  try {
    const rawData = await getWeatherForCity(city);
    const data = processData(rawData);
    draw(data);
    dataContainer.style.display = 'block';
  } catch (error) {
    errorContainer.style.display = 'block';
    errorContainer.textContent = error; 
  } finally {
    loadingContainer.style.display = 'none';
  }
}


const button = document.querySelector('button');
const searchInput = document.querySelector('input');

button.addEventListener('click', (e) => {
  getAndDraw(searchInput.value);
});

searchInput.addEventListener('keyup', (e) => {
  if (e.code == 'Enter') {
    getAndDraw(searchInput.value);
  }
});

getAndDraw('buenos aires');


