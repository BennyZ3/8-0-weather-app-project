document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const search = event.target.location_search.value;
  if (!search) {
    document.querySelector(".results").textContent = "Error: No text entered";
  }
  document.querySelector("form").reset();
  let url = `https://wttr.in/${search}?format=j1`;
  fetch(url)
    .then((response) => {
      response.json().then((object) => {
        results(object);
        //assigning history
        document.querySelector(".history p").textContent = "";
        let newUrl = document.createElement("li");
        newUrl.innerHTML = `<a href="javascript:history('${url}')" value='${url} name='test'>${object.nearest_area[0].areaName[0].value}- ${object.current_condition[0].FeelsLikeF}°F</a>`;
        newUrl.addEventListener("onclick", (event) => {
          history(event.target.test.value);
        });
        document.querySelector(".history ol").appendChild(newUrl);
        // console.log(object.weather);
        // console.log(dailyTemp("today", object.weather[0]));
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

function results(object) {
  let results = document.querySelector(".results");
  //assigning the results box values
  let area = object.nearest_area[0].areaName[0].value;
  let region = object.nearest_area[0].region[0].value;
  let country = object.nearest_area[0].country[0].value;
  let current = object.current_condition[0].FeelsLikeF;
  results.innerHTML = `<h2>${area}</h2><p><b>Area:</b> ${area}</p><p><b>Region:</b> ${region}</p><p><b>Country:</b> ${country}</p><p><b>Currently:</b> Feels like ${current}°F</p>`;
  //days display
  document.querySelector(".days").innerHTML = "";

  let days = ["Today", "Tomorrow", "Day After Tomorrow"];
  for (let i = 0; i < days.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.append(dailyTemp(days[i], object.weather[i]));
    document.querySelector(".days").append(newDiv);
  }
}

function history(url) {
  fetch(url).then((response) => {
    response.json().then((object) => {
      results(object);
    });
  });
}
