// var parseDate = d3.timeParse("%m%d%Y");
// d3.csv("SlateGunDeaths.csv", function(d){
// 	console.log(d.date);
// });

// mapboxgl.accessToken = 'pk.eyJ1IjoiYW5haWszIiwiYSI6ImNqbWNkNTZ0bDBlM2Izb3M0MWQzNHZtYzEifQ.fLozOxjrg08I3StfKz0AhA';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v10'
// });

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [-74.50, 40],
  zoom: 9
});