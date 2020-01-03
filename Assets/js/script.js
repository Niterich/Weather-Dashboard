let cityName = "phoenix"
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&mode=json&units=imperial&appid=88ac7af34cb90d87533bbf879a2bb928";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    console.log(res);
    $("#cityName").text(res.name);
    $("#mainTempSpan").text(Math.round(res.main.temp));
    $("#mainHumiditySpan").text(res.main.humidity);
    $("#mainWindSpan").text(res.wind.speed);
  });