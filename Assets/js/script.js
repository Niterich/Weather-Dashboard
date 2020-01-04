const now = moment().format("MM/DD/YYYY")
let cityName;
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&mode=json&units=imperial&appid=88ac7af34cb90d87533bbf879a2bb928";

$("#searchButton").on("click", function(){
  cityName = $(this).prev().val();
  console.log(cityName);
  // localStorage.setItem($(this).val(), savedCity);
  // let newSavedCity = $("<button>").text(cityName);
  // console.log(newSavedCity);
  // $("cityList").append(newSavedCity);
  // this.blur();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    console.log(res);
    $("#cityName").text(res.name + "  ");
    $("#mainTempSpan").text((res.main.temp).toFixed(1));
    $("#mainHumiditySpan").text(res.main.humidity);
    $("#mainWindSpan").text(res.wind.speed);
    const weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
    $("#date").text(" " + now);
    $("#date").append(weatherImage);
    const lat = res.coord.lat;
    const lon = res.coord.lon;
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/uvi?appid=88ac7af34cb90d87533bbf879a2bb928&lat="+ lat + "&lon=" + lon,
      method: "GET"
    }).then(function(resTwo){
      console.log(resTwo);
      $("#mainUvIndexSpan").text(resTwo.value);
    })
  });
});