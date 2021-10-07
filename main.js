document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const search = event.target.location_search.value;
  if (!search) {
    document.querySelector(".results").textContent = "Error: No text entered";
  }
  document.querySelector("form").reset();
  let url = `https://wttr.in/~${search}?format=j1`;
  fetch(url)
    .then((response) => {
      response.json().then((object) => {
        let results = document.querySelector(".results");
        let area = object.nearest_area[0].areaName[0].value;
        let region = object.nearest_area[0].region[0].value;
        let country = object.nearest_area[0].country[0].value;
        let current = object.current_condition[0].FeelsLikeF;
        // console.log(area, region, country);
        results.innerHTML = `<h2>${area}</h2><p><b>Area:</b> ${area}</p><p><b>Region:</b> ${region}</p><p><b>Country:</b> ${country}</p><p><b>Currently:</b> Feels like ${current}°F</p>`;
        document.querySelector(".history p").textContent = "";
        let newUrl = document.createElement("li");
        newUrl.innerHTML = `<a href='${url}'>${search}- ${current}°F</a>`;
        document.querySelector(".history ol").appendChild(newUrl);

        // console.log(object.weather);
        let days = ["Today", "Tomorrow", "Day After Tomorrow"];
        for (let i = 0; i < days.length; i++) {
          let newDiv = document.createElement("div");
          newDiv.append(dailyTemp(days[i], object.weather[i]));
          document.querySelector(".days").append(newDiv);
        }
        console.log(dailyTemp("today", object.weather[0]));
      });
    })
    .catch(console.log);
});
function dailyTemp(day, object) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<h3>${day}</h3>
    <p><b>Average Temperature:</b> ${object.avgtempF}°F</p>
    <p><b>Max Temperature:</b> ${object.maxtempF}°F</p>
    <p><b>Min Temperature:</b> ${object.mintempF}°F</p>`;
  return newDiv;
}
