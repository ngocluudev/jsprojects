const search = document.querySelector('.search')
const value = document.querySelector('.value')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const date = document.querySelector('.date') 
const visible = document.querySelector('.visible span')
const wind = document.querySelector('.wind span')
const sun = document.querySelector('.sun span')
const weatherCondition = document.querySelector('.weather-des')
const weatherInfo = document.querySelector('.weather-info')
const weather = document.querySelector('#weather')
const body = document.querySelector('body')
weatherInfo.classList.add('hide')
async function changeWeatherUI() {
    let capitalSearch = search.value.trim()
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=f525789c2db2e9e88989516d4a1f090d`
    let data = await fetch(apiURL).then(res=> res.json())
    if(data.cod === 200) {
        console.log(data)
        weatherInfo.classList.remove('hide')
        const deg = Math.round(data.main.temp - 273.15)
        if (deg < 20) {
            body.setAttribute('class','cold')
        } else if (deg < 27) {
            body.setAttribute('class','cool')
        }  else if (deg < 31) {
            body.setAttribute('class','warm')

        } else {
            body.setAttribute('class','hot')
        }
        value.innerText = deg
        city.innerText = data.name
        country.innerText = data.sys.country
        visible.innerText = data.visibility + ' m/s'
        wind.innerText = data.wind.deg + ' deg'
        sun.innerText = data.main.humidity + '%'
        weatherCondition.innerText = data.weather[0].description
        setInterval(function() {
            date.innerText = new Date().toLocaleString('vi')
        },1000)
    }
}
search.addEventListener('keypress',(e) => {
    if(e.code === 'Enter') {
        changeWeatherUI()
        search.value = ''
    }
})