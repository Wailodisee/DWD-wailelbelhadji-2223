const span = document.querySelector('span');
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=52ad2fcb6cefd1f0660d9b47eb04f85a&units=metric&lang=nl';

async function fetchWeather() {
  const resp = await fetch(url);
  if (!resp.ok) {
    console.log('Een error werd gevonden :' + resp.statusText);
    return;
  }
  const data = await resp.json();

  // data tonen 
  span.innerHTML = `Het is in ${data.name} ${data.main.temp}°C en ${data.weather[0].description}`;
} 
fetchWeather();