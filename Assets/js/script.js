const now = moment().format("MM/DD/YYYY")
let cityName;
let queryURL;
let historyArray = [JSON.parse(JSON.stringify(localStorage.getItem("history")))] || [];

$("#searchButton").on("click", function(){
  event.preventDefault();
  clear();
  requestWeather($(this).prev().val());
  createButton($(this).prev().val());
});

$("#cityList").on("click", ".savedCityButton", function(){
  event.preventDefault();
  clear();
  requestWeather($(this).text());
});

// $( document ).ready(function() {
//   console.log( "ready!" );
//   for (let i = 1; i < historyArray.length; i++) {
//     createButton(historyArray[i]);
//     console.log(historyArray[i]);
//   }
// });


function createButton(cityName){
  const newSavedCity  = $("<button>").text(cityName).addClass("savedCityButton btn btn-secondary");
  $("#cityList").append(newSavedCity);
};

function requestWeather(cityName) {
  // cityName = $(this).prev().val();
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&mode=json&units=imperial&appid=88ac7af34cb90d87533bbf879a2bb928";
  if (historyArray.indexOf(cityName) === -1){
    historyArray.push(cityName);
  };
  localStorage.setItem("history", historyArray);
  this.blur();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    $("#cityName").text(res.name + "  ");
    $("#mainTempSpan").text((res.main.temp).toFixed(1));
    $("#mainHumiditySpan").text(res.main.humidity);
    $("#mainWindSpan").text(res.wind.speed);
    const weatherImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
    $("#date").text(" " + now);
    $("#date").append(weatherImage);
    const lat = res.coord.lat;
    const lon = res.coord.lon;
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=88ac7af34cb90d87533bbf879a2bb928&lat="+ lat + "&lon=" + lon,
      method: "GET",
    }).then(function(resTwo){
      $("#mainUvIndexSpan").text(resTwo.value);
    })
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&mode=json&units=imperial&appid=88ac7af34cb90d87533bbf879a2bb928",
      method: "GET"
    }).then(function(resThree){
      for (let i = 0; i < resThree.list.length; i++) {
        let forecastDay = resThree.list[i];
        if (forecastDay.dt_txt.indexOf("18:00") !== -1){
          console.log(true);
          const dayCard = $("<div>").addClass("card col-2");
          const cardDate = $("<p>").text(forecastDay.dt_txt.substr(5, 5)).appendTo(dayCard);
          const forecastImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + forecastDay.weather[0].icon + "@2x.png").appendTo(dayCard);
          const forecastTemp = $("<p>").text("Temperature: " + forecastDay.main.temp.toFixed(1) +" °F").appendTo(dayCard);
          const forecastHum = $("<p>").text("Humidity: " + forecastDay.main.humidity + "%").appendTo(dayCard);
          $("#fiveDayForecastDiv").append(dayCard);
        }
      }
    })
  });
}

function clear(){
  $("#fiveDayForecastDiv").empty();
}

//Create the buttons for anything in local storage on page load
//use Geolocation for initial page load