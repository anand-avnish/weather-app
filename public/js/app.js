console.log('Client Side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#error')
const messageTwo = document.querySelector('#data')
const address = document.querySelector('#location')
const condition = document.querySelector('#condition')
const celsius = document.querySelector('#celsius')
const fahrenheit = document.querySelector('#fahrenheit')
const rainPercentage = document.querySelector('#rainPercentage')
const rain = document.querySelector('#rain')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
const direction = document.querySelector('#direction')
const snowChance = document.querySelector('#snowChance')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Loading...'

    const location = search.value
    const url = '/weather?address=' + location

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                address.textContent = ''
                condition.textContent = ''
                celsius.textContent = ''
                fahrenheit.textContent = ''
                rainPercentage.textContent = ''
                rain.textContent = ''
                humidity.textContent = ''
                wind.textContent = ''
                direction.textContent = ''
                snowChance.textContent = ''
                console.log(data.error)
            }else{
                const forecast = data.forecast.forecastData
                const current = data.forecast.currentData
                const message = data.forecast.condition + '. It is currently ' + current.temp_c + ' degrees celsius out. The chances of precipitation are ' + forecast.daily_chance_of_rain + '%.'
                messageTwo.innerHTML = data.location + "<br>" + message
                messageOne.textContent = ''
                address.textContent = data.location
                condition.textContent = data.forecast.condition
                celsius.textContent = current.temp_c
                fahrenheit.textContent = current.temp_f
                rainPercentage.textContent = forecast.daily_chance_of_rain + ' %'
                rain.textContent = current.precip_mm + ' mm'
                humidity.textContent = current.humidity
                wind.textContent = current.wind_kph + ' kph'
                direction.textContent = current.wind_dir
                snowChance.textContent = forecast.daily_chance_of_snow + ' %'
            }
        })
    })

    // console.log(location)
})