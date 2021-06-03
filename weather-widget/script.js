const cities = [
    {
        "name": "Zaporizhia",
        "country": "UA",
        "lon": 35.183331,
        "lat": 47.816669
    },
    {
        "name": "Barcelona",
        "country": "ES",
        "lon": 2.15899,
        "lat": 41.38879
    },
    {
        "name": "Chiclayo",
        "country": "PE",
        "lon": -79.841667,
        "lat": -6.77361
    },
    {
        "name": "Budapest",
        "country": "HU",
        "lon": 19.039909,
        "lat": 47.498009
    },
    {
        "name": "McMurdo Station",
        "country": "AQ",
        "lon": 168.222656,
        "lat": -77.65535
    },
];

makeDropdown();

getWeather();

document.querySelector('#city').addEventListener('change', getWeather);

document.querySelectorAll('.brief').forEach(elem => {
    elem.addEventListener('click', paneToggle);
});



function makeDropdown() {
    const select = document.createElement('select');
    select.setAttribute('id', 'city');
    for (let i = 0; i < cities.length; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = cities[i]['name'];
        select.append(option);
    }
    document.querySelector('.dropdown').append(select);
}

function getWeather() {
    const url = new URL('http://api.openweathermap.org/data/2.5/onecall');
    const index = +document.querySelector('#city').value;
    const params = {
        'lat': cities[index]['lat'],
        'lon': cities[index]['lon'],
        'exclude': 'minutely,hourly',
        'units': 'metric',
        'lang': 'en',
        'appid': '0be901034264c5797eec942db5f60fe0'
    };

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    fetch(url)
        .then(weather => weather.json())
        .then(showWeather)
        .catch(e => console.log(e.name + ': ' + e.message));
}

function showWeather(data) {
    const index = +document.querySelector('#city').value;
    const offset = data.timezone_offset + (new Date().getTimezoneOffset() * 60); //for correct local time display

    const briefIcon = document.querySelectorAll('.icon img');
    const briefDate = document.querySelectorAll('.brief .date');
    const briefTemp = document.querySelectorAll('.brief .temp');

    const mainDate = document.querySelectorAll('.main .date');
    const mainIcon = document.querySelectorAll('.pane img');
    const mainTemp = document.querySelectorAll('.pane span');
    const description = document.querySelectorAll('.description');

    const secondary = document.querySelectorAll('.secondary ul');

    document.querySelectorAll('.main h2').forEach(item => item.textContent = cities[index].name + ', ' + cities[index].country);

    for (let i = 0; i < 5; i++) {
        briefDate[i].textContent = dateFormat(data.daily[i].dt + data.timezone_offset);
        mainDate[i].textContent = dateFormat(data.daily[i].dt + data.timezone_offset);

        if (i === 0) mainDate[i].textContent += '   ' + new Date((data.current.dt + offset) * 1000).toTimeString().slice(0, 5);

        briefIcon[i].src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`;
        briefTemp[i].innerHTML = `${Math.round(data.daily[i].temp.max)}/${Math.round(data.daily[i].temp.min)}&deg;C`;
        mainIcon[i].src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
        mainTemp[i].innerHTML = `${Math.round(data.daily[i].temp.day)}&deg;C`;
        description[i].textContent = data.daily[i].weather[0].description;

        secondary[i].children[0].innerHTML = `Max temperature ${Math.round(data.daily[i].temp.max)} &deg;C`;
        secondary[i].children[1].innerHTML = `Min temperature ${Math.round(data.daily[i].temp.min)} &deg;C`;
        secondary[i].children[2].innerHTML = `Wind ${data.daily[i].wind_speed} m/s`;
        secondary[i].children[3].innerHTML = `Humidity ${data.daily[i].humidity} %`;
        secondary[i].children[4].innerHTML = `Pressure ${data.daily[i].pressure} hPa`;

        let sunrise = new Date((data.daily[i].sunrise + offset) * 1000).toTimeString().slice(0, 5);
        let sunset = new Date((data.daily[i].sunset + offset) * 1000).toTimeString().slice(0, 5);
        secondary[i].children[5].innerHTML = `Sunrise ${sunrise}`;
        secondary[i].children[6].innerHTML = `Sunset ${sunset}`;
    }
}

function dateFormat(s) {
    s += new Date().getTimezoneOffset() * 60;
    let date = new Date(s * 1000);
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let out = `${week[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`;
    return out;
}

function paneToggle() {
    document.querySelectorAll('.brief').forEach(elem => {
        elem.classList.remove('orange');
    });
    document.querySelectorAll('.details').forEach(elem => {
        elem.classList.remove('active');
    });
    this.nextElementSibling.classList.add('active');
    this.classList.add('orange');
}