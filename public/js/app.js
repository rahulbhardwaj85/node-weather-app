console.log("clint side js is loaded");

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

const callApi = (locationSearch = "", callback) => {
    if (locationSearch === "") {
        return callback("Please Enter Location Name", undefined);
    }
//when only run on local
 //   fetch('http://localhost:3000/weather?address=' + locationSearch).then((response) => {
   
 // when run on local and heroku
 fetch('http://localhost:3000/weather?address=' + locationSearch).then((response) => { 
 response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                callback(data.error, undefined)
            } else {

                callback(undefined, data)
            }

        })
    })
}

const weatherForm = document.querySelector('form');
const locationSearch = document.querySelector('input');
const searchButton = document.getElementById('searchButton');
const showWeatherDetailEle = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    showWeatherDetailEle.innerText = "";
    searchButton.innerText = "Loading...";


    callApi(locationSearch.value, (error, data) => {
        if (error) { 
            searchButton.innerText = "Search";
            return showWeatherDetailEle.innerText = error;
        }
        else {
            const weatherText = `Location: ${data.location}, Forcast ${data.forcast}`
            searchButton.innerText = "Search"
            return showWeatherDetailEle.innerText = weatherText
        }

    });

})