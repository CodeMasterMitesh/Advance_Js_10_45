// https://api.openweathermap.org/data/2.5/weather?q=Surat,IN&units=metric&appid=YOUR_API_KEY

let form = document.getElementById("wetherForm");
let city = document.getElementById("city");
let card = document.querySelector(".card");
let key = 'eb0540629f26a9b0b154c14aba5e7295';
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${key}`;

    (async function (){
        let response = await fetch(url);
        console.log(response);
        if(response.ok){
            let data = await response.json();
            console.log(data);
            console.log(data.main);

            let wetherCard = `<div class="card-body">
                <img src="https://openweathermap.org/img/wn/01d@4x.png" alt="Weather Icon" class="weather-icon mb-3">
                <h3 class="card-title">${data.main.temp}°C</h3>
                <h5 class="text-capitalize text-muted">clear sky</h5>
                <div class="row mt-4">
                <div class="col-md-6">
                    <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Min Temp:</strong> ${data.main.temp_min}°C</p>
                    <p><strong>Max Temp:</strong> ${data.main.temp_max}°C</p>
                </div>
                </div>
                <p class="mt-3"><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            </div>;`
            card.innerHTML = wetherCard;
        }else{
            card.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Failed to fetch weather data. Please try again later.
            </div>
            `;
        }
    })();

});