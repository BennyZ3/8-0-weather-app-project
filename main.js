document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const search = event.target.location_search.value.toLowerCase();
  if (!search) {
    document.querySelector(".results").textContent =
      "No text entered: going to nearest location";
  }
  document.querySelector("form").reset();
  let url = `https://wttr.in/${search}?format=j1`;
  fetch(url)
    .then((response) => {
      response.json().then((object) => {
        //creating object for the result and days displays
        results(object);
        //assigning history
        document.querySelector(".history p").textContent = "";
        let newUrl = document.createElement("li");
        //allowing the a tag to use a function rather than go to a link
        newUrl.innerHTML = `<a href="javascript:history('${url}')" value='${url} name='test'>${object.nearest_area[0].areaName[0].value}- ${object.current_condition[0].FeelsLikeF}°F</a>`;
        newUrl.addEventListener("onclick", (event) => {
          history(event.target.test.value);
        });

        const list = document.querySelector(".history ol");
        let found = false;
        document.querySelectorAll("ol li").forEach((element) => {
          if (element.innerHTML === newUrl.innerHTML) {
            found = true;
          }
        });
        if (!found) {
          list.prepend(newUrl);
        }
      });
    })
    .catch(console.log);
});
function dailyTemp(day, object) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<h3>${day} (${object.date})</h3>
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

  backgroundConditions(object);
}

//reassigning to adjust to previous search url
function history(url) {
  fetch(url).then((response) => {
    response.json().then((object) => {
      results(object);
    });
  });
}

function backgroundConditions(object) {
  let path = "images/grassland-g81543d7ea_1920.jpg";
  let bodySelector = document.querySelector("body");
  let precipitation = object.current_condition[0].precipInches;
  let currentTemp = object.current_condition[0].temp_F;
  let cloudCover = object.current_condition[0].cloudcover;

  if (precipitation > 0.1 && currentTemp < 32) {
    path = "images/snowfall-ga14cc3d7e_1920.jpg";
  } else if (precipitation > 0.4) {
    path = "images/raindrops-g5b3270e36_1920.jpg";
  } else if (cloudCover > 40) {
    path = "images/lake-ge87252be2_1920.jpg";
  } else if (currentTemp < 32) {
    path = "images/ice-g4e4c0491c_1920.jpg";
  } else if (currentTemp > 80) {
    path = "images/death-valley-gfc668d35a_1920.jpg";
  }

  bodySelector.style.backgroundImage = `url(${path})`;

  document.querySelector(
    ".extra"
  ).innerHTML = `<p><b>Precip:</b> ${precipitation}</p><p><b>Current Temp:</b> ${currentTemp}°F</p><p><b>Cloud Cover:</b> ${cloudCover}</p>`;
  //   document.querySelector(".extra").append(newDiv);
}
/*
Image Credits:
rain: Image by <a href="https://pixabay.com/users/joshua_seajw92-6153261/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3216607">준원 서</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3216607">Pixabay</a>

Normal/Cloudy: Image by <a href="https://pixabay.com/users/12019-12019/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1679708">David Mark</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1679708">Pixabay</a>

Sunny: Image by <a href="https://pixabay.com/users/jplenio-7645255/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3133502">jplenio</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3133502">Pixabay</a>

Just below freezing: Image by <a href="https://pixabay.com/users/matthias_groeneveld-4535957/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3941906">Matthias Groeneveld</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3941906">Pixabay</a>

Snowing: Image by <a href="https://pixabay.com/users/kristamonique-76979/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=201496">kristamonique</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=201496">Pixabay</a>
*/
