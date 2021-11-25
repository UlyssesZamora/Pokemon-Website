$("#btnSearch").on("click", rawPokeData);
$("#statDsply").on("click", displayStats);

var hasBeenClicked = false;
async function rawPokeData()
{
  let pokeName = $("#keyword").val().toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  let data = await fetchData(url);
  if(pokeName == "")
  {
    alert("Not a valid pokemon")
  }
  else 
  {
    pokeImage(url);
    displayInfo(url);
    displayAbilities(url);
    $('#graph').empty();
  }
}
async function pokeImage(url)
{
  $(".card").empty()
  let data = await fetchData(url);
  $(".card").append(`<img id="pokeImg" src= "${data.sprites.front_default}"class="card-img-top">`);
  $(".card").append(`<h3 class="card-text text-center">${data.name}</h3>`)
}


async function displayInfo(url)
{
  let data = await fetchData(url);
  if(data.types.length == 1)
    $(".card").append(`<hr><h6>Pokemon Type(s): ${data.types[0].type.name}</h6>`);
  else
    $(".card").append(`<hr><h6>Pokemon Type(s): ${data.types[0].type.name}, ${data.types[1].type.name}</h6>`);
  $(".card").append(`<br><h6>Weight: ${data.weight} lbs</h6>`);
}

async function displayAbilities(url)
{
  let abltyList = [];
  let data = await fetchData(url);
  for(let i = 0; i < data.abilities.length; i++)
    abltyList.push(data.abilities[i].ability.name)
  $(".card").append(`<br><h6>Abilities: ${abltyList.join(', ')} </h6>`);
}

async function displayStats()
{
  $("#stats").remove();
  $('#graph').append('<canvas id="stats"><canvas>')
  let canvasElement = $("#stats");
  let pokeName = $("#keyword").val().toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  let datas = await fetchData(url);
  let statArr = [];
  for(let i = 0; i < datas.stats.length; i++)
    statArr.push(datas.stats[i].base_stat)
  console.log(statArr);
  let config = {
    type: 'bar',
    data: 
    {
      labels: ["hp", "attack", "defense", "special-attack", "special-defence", "speed"], 
      datasets: 
      [
        {
          label: "Pokemon Base Stats", 
          data: statArr,
          backgroundColor: 
          [
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ]
        }
      ],
    }
  };

  let statChart = new Chart(canvasElement, config);
  statArr.splice(0, statArr.length);

}

async function fetchData(url) {
   let response = await fetch(url);
   let data = await response.json();
   return data;

}