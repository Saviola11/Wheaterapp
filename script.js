const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';

const API_KEY = '&appid=d32a8788519ab91bde01083ff34f6e3b';

const API_UNITS = '&units=metric';
const getWeather = () => {
	const city = input.value || 'London';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);
			const id = status.id;

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			weather.textContent = status.main;

			warning.textContent = '';
			input.value = '';
        
            
			if (id >= 200 && id < 300) {
                photo.setAttribute('src', '/img/thunderstorm.png');
			} else if (id >= 300 && id < 400) {
                photo.setAttribute('src', '/img/drizzle.png');
			} else if (id >= 500 && id < 600) {
                photo.setAttribute('src', '/img/rain.png');
			} else if (id >= 600 && id < 700) {
                photo.setAttribute('src', '/img/ice.png');
			} else if (id >= 700 && id < 800) {
                photo.setAttribute('src', '/img/fog.png');
			} else if (id == 800) {
                photo.setAttribute('src', '/img/sun.png');
			} else if (id > 800 && id < 900) {
                photo.setAttribute('src', '/img/cloud.png');
			} else {
                photo.setAttribute('src', '/img/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
       }
       const enterCheck = (e) => {
        if(e.key === 'Enter')
            getWeather()
       }

    input.addEventListener('keyup', enterCheck)
    
    button.addEventListener('click', getWeather);
